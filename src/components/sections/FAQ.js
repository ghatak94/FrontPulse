'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Card from '@/components/ui/Card';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does FrontPulse integrate with GitHub?",
      a: "FrontPulse uses OAuth to securely connect to your GitHub repositories. It automatically pulls PR status, commit velocity, and review comments to enrich the daily standup summaries."
    },
    {
      q: "Is my team's data secure?",
      a: "Yes. We use industry-standard encryption at rest and in transit. Enterprise customers can opt for custom data retention policies or self-hosted deployment options."
    },
    {
      q: "Can we use this alongside synchronous standups?",
      a: "Absolutely. Many teams use FrontPulse to handle the 'status update' portion asynchronously, allowing their synchronous time to be spent solely on complex blockers and architectural discussions."
    }
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low border-t border-outline-variant/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <Card key={i} className={`cursor-pointer transition-all ${openIndex === i ? 'ring-2 ring-primary/50' : ''}`} noPadding>
              <div 
                className="p-6 flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <h3 className="font-body-lg text-body-lg font-semibold text-on-surface">{faq.q}</h3>
                {openIndex === i ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-on-surface-variant" />}
              </div>
              {openIndex === i && (
                <div className="p-6 pt-0 font-body-md text-body-md text-on-surface-variant border-t border-outline-variant/20 mt-2">
                  {faq.a}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
