'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';

const AuthContext = createContext({
  user: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  refreshUserProfile: async () => {},
  error: null,
});

const buildAuthUser = (firebaseUser, profile = {}) => {
  if (!firebaseUser) return null;

  const name = profile.name || profile.displayName || firebaseUser.displayName || '';

  return {
    uid: firebaseUser.uid,
    name,
    email: firebaseUser.email,
    role: profile.role || null,
    workspaceId: profile.workspaceId || null,
    createdAt: profile.createdAt || null,
    displayName: name,
    photoURL: firebaseUser.photoURL || null,
    providerId: firebaseUser.providerData[0]?.providerId || 'password',
  };
};

const buildFallbackProfile = (firebaseUser, extraData = {}) => ({
  uid: firebaseUser.uid,
  name: extraData.displayName || firebaseUser.displayName || '',
  email: firebaseUser.email,
  role: null,
  workspaceId: null,
  createdAt: null,
});

const saveUserToFirestore = async (firebaseUser, extraData = {}) => {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const userData = {
      uid: firebaseUser.uid,
      name: extraData.displayName || firebaseUser.displayName || '',
      email: firebaseUser.email,
      role: null,
      workspaceId: null,
      createdAt: serverTimestamp(),
    };

    await setDoc(userRef, userData);
    return userData;
  }

  const existingData = userSnap.data();
  const normalizedData = {
    uid: firebaseUser.uid,
    name: existingData.name || existingData.displayName || firebaseUser.displayName || '',
    email: existingData.email || firebaseUser.email,
    role: existingData.role || null,
    workspaceId: existingData.workspaceId || null,
    createdAt: existingData.createdAt || null,
  };

  await setDoc(userRef, normalizedData, { merge: true });
  return { ...existingData, ...normalizedData };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const profile = await saveUserToFirestore(firebaseUser);
            setUser(buildAuthUser(firebaseUser, profile));
          } catch (err) {
            console.error('Failed to load user profile:', err);
            setUser(buildAuthUser(firebaseUser));
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Firebase Auth state error:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, displayName) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      let profile = buildFallbackProfile(userCredential.user, { displayName });

      try {
        profile = await saveUserToFirestore(userCredential.user, { displayName });
      } catch (profileError) {
        console.warn('Account created, but user profile sync failed:', profileError);
      }

      const authUser = buildAuthUser(userCredential.user, profile);
      setUser(authUser);
      return authUser;
    } catch (err) {
      setError(err.message || 'Failed to create account.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      let profile = buildFallbackProfile(userCredential.user);

      try {
        profile = await saveUserToFirestore(userCredential.user);
      } catch (profileError) {
        console.warn('Signed in, but user profile sync failed:', profileError);
      }

      const authUser = buildAuthUser(userCredential.user, profile);
      setUser(authUser);
      return authUser;
    } catch (err) {
      setError(err.message || 'Failed to sign in.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      let profile = buildFallbackProfile(userCredential.user);

      try {
        profile = await saveUserToFirestore(userCredential.user);
      } catch (profileError) {
        console.warn('Signed in with Google, but user profile sync failed:', profileError);
      }

      const authUser = buildAuthUser(userCredential.user, profile);
      setUser(authUser);
      return authUser;
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message || 'Failed to sign out.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setError(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshUserProfile = async () => {
    if (!auth.currentUser) return null;

    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    const profile = userSnap.exists() ? userSnap.data() : await saveUserToFirestore(auth.currentUser);
    const authUser = buildAuthUser(auth.currentUser, profile);
    setUser(authUser);
    return authUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
        refreshUserProfile,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
