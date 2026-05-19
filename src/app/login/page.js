'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { BrainCircuit, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AuthBranding from '@/components/ui/AuthBranding';
import { useAuth } from '@/context/AuthContext';
import GuestRoute from '@/components/auth/GuestRoute';

const GoogleIcon = ({ size = 20, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className}
  >
    <path 
      fill="#EA4335" 
      d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.9-2.7 3.4-4.51 6.76-4.51z"
    />
    <path 
      fill="#4285F4" 
      d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.7 2.87c2.16-1.99 3.43-4.91 3.43-8.6z"
    />
    <path 
      fill="#FBBC05" 
      d="M5.24 14.59c-.23-.69-.36-1.42-.36-2.19 0-.77.13-1.5.36-2.19L1.39 7.56C.5 9.36 0 11.37 0 13.5s.5 4.14 1.39 5.94l3.85-2.99c-.23-.69-.36-1.42-.36-2.19z"
    />
    <path 
      fill="#34A853" 
      d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.03.69-2.35 1.11-3.96 1.11-3.36 0-5.86-1.81-6.76-4.51l-3.85 2.99C3.37 20.33 7.35 23 12 23z"
    />
  </svg>
);

const LoginPage = () => {
  const containerRef = useRef(null);
  const router = useRouter();
  const { login, loginWithGoogle, loading, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (loading || user || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.left-elem', {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });

      gsap.fromTo('.right-elem', {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2,
        clearProps: 'transform,opacity'
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [loading, user]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('Please fill in all fields.');
      return;
    }
    setLocalError(null);
    setIsSubmitting(true);

    try {
      const authUser = await login(email, password);
      router.replace(authUser?.workspaceId ? '/dashboard' : '/onboarding');
    } catch (err) {
      // Clean up firebase messages like "Firebase: Error (auth/invalid-credential)."
      const message = err.message || '';
      if (message.includes('auth/invalid-credential') || message.includes('auth/user-not-found') || message.includes('auth/wrong-password')) {
        setLocalError('Invalid email or password.');
      } else {
        setLocalError(message.replace('Firebase: ', ''));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError(null);
    setIsSubmitting(true);
    try {
      const authUser = await loginWithGoogle();
      router.replace(authUser?.workspaceId ? '/dashboard' : '/onboarding');
    } catch (err) {
      setLocalError(err.message?.replace('Firebase: ', '') || 'Failed to authenticate with Google.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GuestRoute>
      <div ref={containerRef} className="min-h-screen flex w-full bg-background">
        
        {/* Left Branding Column (Hidden on Mobile) */}
        <AuthBranding />

        {/* Right Login Column */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md flex flex-col">
            
            <div className="mb-10 text-center lg:text-left right-elem">
              <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                <BrainCircuit className="text-primary" size={28} />
                <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">FrontPulse</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Welcome back</h2>
              <p className="font-body-md text-body-md text-on-surface-variant w-full">Please enter your details to sign in.</p>
            </div>

            {localError && (
              <div className="mb-6 p-4 rounded-xl bg-error-container/40 border border-error/20 flex items-start gap-3 right-elem text-on-error-container text-body-sm">
                <AlertCircle className="text-error shrink-0 mt-0.5" size={18} />
                <span>{localError}</span>
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="flex flex-col gap-6 w-full">
              <Button 
                type="button" 
                variant="secondary" 
                className="w-full !py-3 flex items-center justify-center gap-3 right-elem"
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
              >
                <GoogleIcon size={20} />
                <span>Sign in with Google</span>
              </Button>

              <div className="flex items-center gap-4 right-elem my-2">
                <div className="h-px bg-outline-variant/30 flex-1"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Or continue with email</span>
                <div className="h-px bg-outline-variant/30 flex-1"></div>
              </div>

              <Input 
                label="Email address" 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                className="right-elem"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />

              <Input 
                label="Password" 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="right-elem"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
                rightElement={
                  <Link href="/forgot-password" className="font-label-sm text-label-sm text-primary hover:text-primary-fixed-variant transition-colors">
                    Forgot password?
                  </Link>
                }
              />

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full !py-3 flex items-center justify-center gap-2 mt-4 right-elem"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center font-body-sm text-body-sm text-on-surface-variant right-elem">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:text-primary-fixed-variant transition-colors font-medium">
                Sign up
              </Link>
            </div>

          </div>
        </div>

      </div>
    </GuestRoute>
  );
};

export default LoginPage;
