'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from '@/components/ui/Card';

gsap.registerPlugin(ScrollTrigger);

const Analytics = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.metric-card', {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: sectionRef });

  const metrics = [
    { label: 'Time Saved per Week', value: '4.5 hrs', trend: '+12%' },
    { label: 'Blockers Resolved', value: '86%', trend: '+5%' },
    { label: 'Team Sentiment', value: 'Positive', trend: 'Stable' },
    { label: 'Sprint Velocity', value: '32 pts', trend: '+8%' },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low border-y border-outline-variant/20">
      <div className="max-w-max-width mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Actionable Analytics</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
            Get unparalleled visibility into your engineering organization&apos;s health and productivity.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          {metrics.map((metric, i) => (
            <Card key={i} className="metric-card !p-6 text-center flex flex-col justify-center">
              <span className="font-label-md text-label-md text-on-surface-variant mb-2">{metric.label}</span>
              <span className="font-display-lg text-display-lg text-primary mb-1">{metric.value}</span>
              <span className="font-body-sm text-body-sm text-secondary">{metric.trend}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
