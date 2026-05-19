'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Cpu, Users } from 'lucide-react';
import Card from '@/components/ui/Card';

gsap.registerPlugin(ScrollTrigger);

const Workflow = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.workflow-step', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    });
  }, { scope: sectionRef });

  const steps = [
    {
      icon: Send,
      title: 'Submit Standup',
      description: 'Team members quickly submit their updates async via Slack, Discord, or the Web App.',
      color: 'bg-primary-container text-on-primary-container'
    },
    {
      icon: Cpu,
      title: 'AI Analyzes Context',
      description: 'FrontPulse connects to GitHub and Figma to enrich updates, detecting blockers automatically.',
      color: 'bg-secondary-container text-on-secondary-container'
    },
    {
      icon: Users,
      title: 'Team Receives Insights',
      description: 'A concise executive summary is generated and shared, keeping everyone aligned.',
      color: 'bg-tertiary-container text-on-tertiary-container'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-max-width mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-6">How It Works</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-lg">
            A seamless workflow designed to fit right into your team&apos;s existing habits.
          </p>
          
          <div className="flex flex-col gap-8 relative">
            <div className="absolute left-6 top-8 bottom-8 w-px bg-outline-variant/30 -z-10 hidden md:block"></div>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="workflow-step flex gap-6 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${step.color} shadow-sm z-10`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{step.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant w-full">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="workflow-step hidden md:block">
           <Card glass className="p-8 h-[500px] flex items-center justify-center relative bg-gradient-to-br from-primary/5 to-secondary/5">
             <div className="absolute inset-0 flex items-center justify-center opacity-50">
               <Cpu size={200} className="text-primary/20" />
             </div>
             <div className="relative z-10 w-full flex flex-col gap-4">
               <div className="bg-surface p-4 rounded-lg shadow-sm border border-outline-variant/30">
                 <div className="h-4 bg-surface-variant rounded w-1/4 mb-2"></div>
                 <div className="h-2 bg-surface-variant/50 rounded w-full mb-1"></div>
                 <div className="h-2 bg-surface-variant/50 rounded w-5/6"></div>
               </div>
               <div className="bg-surface p-4 rounded-lg shadow-sm border border-outline-variant/30 ml-8">
                 <div className="h-4 bg-surface-variant rounded w-1/3 mb-2"></div>
                 <div className="h-2 bg-surface-variant/50 rounded w-full mb-1"></div>
                 <div className="h-2 bg-surface-variant/50 rounded w-4/5"></div>
               </div>
             </div>
           </Card>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
