import React from 'react';
import Link from 'next/link';
import { BrainCircuit, Settings } from 'lucide-react';

const AuthBranding = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-gradient-to-br from-surface-container-low via-surface-container to-primary-container/30 relative overflow-hidden">
      
      {/* Ambient shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-12 left-elem">
        <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity w-fit">
          <BrainCircuit className="text-primary" size={28} />
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">FrontPulse</span>
        </Link>

        <div className="max-w-xl left-elem">
          <h1 className="font-display-lg text-display-lg text-on-background mb-6 leading-tight">
            Frontend Intelligence,<br />Simplified.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant w-full">
            Accelerate your daily standups, streamline team activity, and unlock AI-driven insights that propel your frontend team forward.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-12">
        {/* Card Mockup */}
        <div className="left-elem max-w-sm w-full p-6 bg-surface/60 backdrop-blur-md border border-outline-variant/30 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <Settings size={16} />
            </div>
            <span className="font-label-md text-label-md text-on-surface">AI Insights Active</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-2 bg-primary/30 rounded-full w-full"></div>
            <div className="h-2 bg-primary/20 rounded-full w-3/4"></div>
          </div>
        </div>

        <div className="left-elem flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
          <span>© 2024 FrontPulse Inc.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBranding;
