'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, AlertTriangle, Workflow, HeartPulse, BarChart3 } from 'lucide-react';
import Card from '@/components/ui/Card';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.feature-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: sectionRef });

  return (
    <section id="features" ref={sectionRef} className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low border-y border-outline-variant/20">
      <div className="max-w-max-width mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Streamline Your Morning</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
            Everything you need to run high-performance asynchronous engineering teams, unified in one elegant platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter auto-rows-[280px]">
          {/* Feature 1: Large Span */}
          <Card glass className="feature-card md:col-span-2 group flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
                <Sparkles size={24} />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">AI Auto-Summaries</h3>
              <p className="font-body-md text-body-md text-on-surface-variant w-full">
                FrontPulse analyzes daily inputs across timezones and generates a concise executive summary of what shipped, what&apos;s pending, and who needs help.
              </p>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="feature-card flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-error-container text-on-error-container flex items-center justify-center mb-6">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-2">Blocker Detection</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant w-full">
                Instantly highlights team members stuck on dependencies, routing help requests to the right senior engineers automatically.
              </p>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="feature-card flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6">
                <Workflow size={20} />
              </div>
              <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-2">Tool Integrations</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant w-full">
                Seamlessly pulls context from GitHub PRs and Figma comments to enrich standup reports without manual data entry.
              </p>
            </div>
          </Card>

          {/* Feature 4: Span 2 */}
          <Card glass className="feature-card md:col-span-2 group flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tl from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-6 relative z-10 h-full">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-6">
                  <HeartPulse size={24} />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Team Health Analytics</h3>
                <p className="font-body-md text-body-md text-on-surface-variant w-full">
                  Monitor burnout risk and workflow bottlenecks over time with sentiment analysis applied to daily updates.
                </p>
              </div>
              <div className="hidden md:flex w-1/3 h-full bg-surface-variant/30 rounded-lg border border-outline-variant/20 items-center justify-center">
                <BarChart3 size={64} className="text-outline-variant/50" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
