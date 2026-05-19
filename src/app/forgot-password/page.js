'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { BrainCircuit, ArrowRight, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AuthBranding from '@/components/ui/AuthBranding';
import { useAuth } from '@/context/AuthContext';
import GuestRoute from '@/components/auth/GuestRoute';

const ForgotPasswordPage = () => {
  const containerRef = useRef(null);
  const { resetPassword, loading, user } = useAuth();

  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setLocalError('Please enter your email address.');
      return;
    }
    setLocalError(null);
    setIsSubmitting(true);

    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      const message = err.message || '';
      if (message.includes('auth/user-not-found')) {
        setLocalError('No account found with this email address.');
      } else {
        setLocalError(message.replace('Firebase: ', ''));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GuestRoute>
      <div ref={containerRef} className="min-h-screen flex w-full bg-background">
        
        {/* Left Branding Column (Hidden on Mobile) */}
        <AuthBranding />

        {/* Right Forgot Password Column */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md flex flex-col">
            
            {!isSuccess ? (
              <>
                <div className="mb-10 text-center lg:text-left right-elem">
                  <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                    <BrainCircuit className="text-primary" size={28} />
                    <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">FrontPulse</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Forgot password?</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant w-full">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>
                </div>

                {localError && (
                  <div className="mb-6 p-4 rounded-xl bg-error-container/40 border border-error/20 flex items-start gap-3 right-elem text-on-error-container text-body-sm">
                    <AlertCircle className="text-error shrink-0 mt-0.5" size={18} />
                    <span>{localError}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordReset} className="flex flex-col gap-6 w-full">
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

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full !py-3 flex items-center justify-center gap-2 mt-4 right-elem"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center lg:text-left flex flex-col items-center lg:items-start right-elem">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                  <CheckCircle size={24} />
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-background mb-3">Reset link sent!</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 w-full max-w-sm">
                  We have sent a password reset link to <strong className="text-on-background">{email}</strong>. 
                  Please check your spam folder if you do not receive it shortly.
                </p>
                <Button 
                  onClick={() => setIsSuccess(false)}
                  variant="secondary"
                  className="w-full lg:w-auto px-6 py-2.5 flex items-center justify-center gap-2"
                >
                  <span>Resend Email</span>
                </Button>
              </div>
            )}

            <div className="mt-8 text-center font-body-sm text-body-sm text-on-surface-variant right-elem">
              <Link href="/login" className="inline-flex items-center gap-2 text-primary hover:text-primary-fixed-variant transition-colors font-medium">
                <ArrowLeft size={16} />
                <span>Back to Login</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </GuestRoute>
  );
};

export default ForgotPasswordPage;
