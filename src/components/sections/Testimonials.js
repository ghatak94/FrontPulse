'use client';

import React from 'react';
import Card from '@/components/ui/Card';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "FrontPulse completely eliminated our daily 30-minute status meetings. We now have more heads-down time than ever.",
      author: "Sarah J.",
      role: "Engineering Manager"
    },
    {
      quote: "The AI blocker detection is magic. It flags dependencies before they become delays.",
      author: "David L.",
      role: "Lead Frontend Engineer"
    },
    {
      quote: "I love waking up to a clean, concise summary of what the team accomplished yesterday.",
      author: "Elena R.",
      role: "CTO"
    }
  ];

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-background">
      <div className="max-w-max-width mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Loved by Engineering Teams</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <Card key={i} className="flex flex-col justify-between">
              <p className="font-body-md text-body-md text-on-surface-variant italic mb-8">&ldquo;{test.quote}&rdquo;</p>
              <div>
                <p className="font-label-md text-label-md font-bold text-on-surface">{test.author}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{test.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
