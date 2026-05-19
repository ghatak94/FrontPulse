'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BrainCircuit } from 'lucide-react';

export default function ProtectedRoute({ children, requireWorkspace = true }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (!loading && user && requireWorkspace && !user.workspaceId) {
      router.push('/onboarding');
    }
  }, [user, loading, requireWorkspace, router]);

  // Loading spinner or skeleton
  if (loading || !user || (requireWorkspace && !user.workspaceId)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-on-background gap-4">
        <div className="relative flex items-center justify-center">
          {/* Pulsing Glow Ring */}
          <div className="absolute w-16 h-16 rounded-full border-2 border-primary/20 animate-ping"></div>
          {/* Spinning Outer Ring */}
          <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-primary animate-spin"></div>
          {/* Floating Logo Icon inside */}
          <div className="absolute flex items-center justify-center">
            <BrainCircuit className="text-primary animate-pulse" size={20} />
          </div>
        </div>
        <span className="font-label-md text-label-md text-on-surface-variant animate-pulse tracking-wide">
          Verifying active session...
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
