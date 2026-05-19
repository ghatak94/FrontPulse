'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Loader2, LogOut, Plus, Users } from 'lucide-react';
import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';

const roleOptions = [
  'Team Lead',
  'Frontend Developer',
  'React Developer',
  'UI/UX Designer',
  'QA Engineer',
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, logout, refreshUserProfile } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (user?.workspaceId) {
      router.push('/dashboard');
    }
  }, [router, user?.workspaceId]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const handleCreateWorkspace = async (event) => {
    event.preventDefault();

    if (!workspaceName.trim() || !role) {
      setError('Enter a workspace name and select your role.');
      return;
    }

    setError('');
    setIsCreating(true);

    try {
      const batch = writeBatch(db);
      const workspaceRef = doc(db, 'workspaces', crypto.randomUUID());
      const workspaceId = workspaceRef.id;

      batch.set(workspaceRef, {
        workspaceId,
        workspaceName: workspaceName.trim(),
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });

      batch.set(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          name: user.name || user.displayName || '',
          email: user.email,
          role,
          workspaceId,
          createdAt: user.createdAt || serverTimestamp(),
        },
        { merge: true }
      );

      await batch.commit();
      await refreshUserProfile();
      router.push('/dashboard');
    } catch (err) {
      console.error('Create workspace error:', err);
      const message = err.message?.replace('Firebase: ', '') || 'Failed to create workspace.';
      setError(
        message.includes('Missing or insufficient permissions')
          ? 'Firestore permissions are blocking workspace creation. Update your Firestore rules, then try again.'
          : message
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <ProtectedRoute requireWorkspace={false}>
      <main className="min-h-screen bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_55%,#fbf7ff_100%)] px-5 py-8 text-on-background">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col items-center justify-center">
          <header className="mb-10 text-center">
            <h1 className="text-[40px] font-extrabold leading-tight text-[#1c1b1b] sm:text-[48px]">
              Welcome to FrontPulse
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[16px] leading-6 text-[#414754]">
              Let&apos;s get your workspace set up. Choose an option below to begin collaborating with your team.
            </p>
          </header>

          <section className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="group flex min-h-[250px] flex-col rounded-2xl border border-[#eef1f7] bg-white p-8 text-left shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_22px_65px_rgba(0,112,243,0.16)]"
            >
              <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-[#dbe8ff] text-primary">
                <Plus size={28} strokeWidth={2.4} />
              </span>
              <span className="text-[21px] font-extrabold leading-6 text-[#222222]">Create a New Workspace</span>
              <span className="mt-3 text-[14px] leading-5 text-[#526071]">
                Start from scratch. You&apos;ll be the administrator and can invite others to join your team environment.
              </span>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[13px] font-bold text-primary">
                Get started <ArrowRight size={15} />
              </span>
            </button>

            <button
              type="button"
              className="group flex min-h-[250px] flex-col rounded-2xl border border-[#eef1f7] bg-white p-8 text-left shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:border-[#8c4be8]/35 hover:shadow-[0_22px_65px_rgba(121,40,202,0.14)]"
            >
              <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-[#f0edf2] text-[#31363f]">
                <Users size={26} strokeWidth={2.4} />
              </span>
              <span className="text-[21px] font-extrabold leading-6 text-[#222222]">Join an Existing Workspace</span>
              <span className="mt-3 text-[14px] leading-5 text-[#526071]">
                Enter an invite code or search for your team&apos;s existing workspace to join your colleagues.
              </span>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[13px] font-bold text-[#31363f]">
                Find your team <ArrowRight size={15} />
              </span>
            </button>
          </section>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 inline-flex items-center gap-2 font-mono text-[13px] text-[#414754] transition-colors hover:text-primary"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/35 px-4 py-8 backdrop-blur-sm">
            <section className="w-full max-w-lg rounded-2xl border border-[#e3e8f3] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.24)] sm:p-8">
              <div className="mb-8 flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                  <BriefcaseBusiness size={19} />
                </span>
                <div>
                  <h2 className="text-[28px] font-extrabold leading-tight text-[#252525]">Set up your workspace</h2>
                  <p className="mt-2 text-[14px] leading-5 text-[#526071]">
                    Enter your workspace details and your role within the team.
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-5 rounded-lg border border-error/20 bg-error-container/40 px-4 py-3 text-[14px] text-on-error-container">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateWorkspace} className="flex flex-col gap-5">
                <Input
                  label="Workspace Name"
                  id="workspace-name"
                  type="text"
                  placeholder="e.g. Acme Frontend"
                  value={workspaceName}
                  onChange={(event) => setWorkspaceName(event.target.value)}
                  disabled={isCreating}
                  required
                />

                <label className="flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-on-surface">Your Role</span>
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    disabled={isCreating}
                    required
                    className="rounded-lg border border-outline-variant bg-surface px-4 py-3 font-body-md text-body-md text-on-surface transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <option value="">Select a role...</option>
                    {roleOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="gap-2"
                    onClick={() => setShowCreateModal(false)}
                    disabled={isCreating}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </Button>
                  <Button type="submit" variant="primary" className="gap-2 !py-3" disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <Loader2 className="animate-spin" size={17} />
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Workspace
                        <ArrowRight size={17} />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </section>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
