'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '@/components/ui/Button';
import { BrainCircuit } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    gsap.from('.hero-element', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
    gsap.from('.hero-bg', {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out'
    });
  }, { scope: heroRef });

  return (
    <header ref={heroRef} className="relative pt-24 pb-32 overflow-hidden px-margin-mobile md:px-margin-desktop flex flex-col items-center justify-center text-center min-h-[80vh]">
      {/* Ambient Background Gradients */}
      <div className="hero-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="hero-bg absolute top-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center z-10 w-full">
        <div className="hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant/30 text-primary font-label-md text-label-md mb-8 shadow-sm">
          <BrainCircuit size={16} />
          <span>Intelligence for Frontend Teams</span>
        </div>

        <h1 className="hero-element font-display-lg text-display-lg text-on-background mb-6 tracking-tight max-w-4xl leading-tight">
          Async Standups for Frontend Teams. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Powered by AI.</span>
        </h1>

        <p className="hero-element font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10">
          Eliminate meeting fatigue and keep your engineering momentum. FrontPulse automatically extracts blockers, tracks PR progress, and synthesizes team health into actionable insights.
        </p>

        <div className="hero-element flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Button variant="primary" className="w-full sm:w-auto text-lg">
            Start Free Trial
          </Button>
          <Button variant="secondary" className="w-full sm:w-auto text-lg">
            View Demo
          </Button>
        </div>

        {/* Mockup Preview */}
        <div className="hero-element mt-20 w-full max-w-5xl rounded-xl border border-outline-variant/30 bg-surface shadow-2xl overflow-hidden glass-panel">
          <div className="h-12 border-b border-outline-variant/30 flex items-center px-4 gap-2 bg-surface-container-low">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
            <div className="w-3 h-3 rounded-full bg-primary/50"></div>
          </div>
          <div className="p-8 h-[400px] flex items-center justify-center bg-surface/50">
            <div className="flex flex-col gap-4 w-full max-w-2xl">
              <div className="h-8 bg-surface-variant/50 rounded w-1/3 animate-pulse"></div>
              <div className="h-24 bg-surface-variant/30 rounded w-full animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-32 bg-surface-variant/30 rounded w-1/2 animate-pulse"></div>
                <div className="h-32 bg-surface-variant/30 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
