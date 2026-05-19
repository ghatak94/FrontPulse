'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.pricing-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });
  }, { scope: sectionRef });

  const featuresStarter = [
    'Up to 5 users',
    'Basic standups',
    'Slack integration'
  ];

  const featuresPro = [
    'Unlimited users',
    'AI Auto-summaries',
    'GitHub & Figma sync',
    'Priority support'
  ];

  const featuresEnterprise = [
    'SSO / SAML',
    'Custom data retention',
    'Dedicated success manager'
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-24 px-margin-mobile md:px-margin-desktop bg-background">
      <div className="max-w-max-width mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Transparent Pricing</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
            Scale your async workflows securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <Card className="pricing-card flex flex-col h-full">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Starter</h3>
            <div className="mb-6">
              <span className="font-display-lg text-display-lg text-on-background">$0</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">/user/mo</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              {featuresStarter.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                  <CheckCircle2 size={18} className="text-primary" /> {feature}
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full">Get Started</Button>
          </Card>

          {/* Pro (Highlighted) */}
          <Card highlight className="pricing-card flex flex-col h-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary px-4 py-1 rounded-full font-label-sm text-label-sm shadow-sm whitespace-nowrap z-10">
              Most Popular
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2 mt-2">Pro</h3>
            <div className="mb-6">
              <span className="font-display-lg text-display-lg text-on-background">$12</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">/user/mo</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              {featuresPro.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                  <CheckCircle2 size={18} className="text-primary" /> {feature}
                </li>
              ))}
            </ul>
            <Button variant="primary" className="w-full">Start Free Trial</Button>
          </Card>

          {/* Enterprise */}
          <Card className="pricing-card flex flex-col h-full">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Enterprise</h3>
            <div className="mb-6">
              <span className="font-display-lg text-display-lg text-on-background">Custom</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              {featuresEnterprise.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                  <CheckCircle2 size={18} className="text-primary" /> {feature}
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full">Contact Sales</Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
