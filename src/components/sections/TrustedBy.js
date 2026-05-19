import React from 'react';
import { Building2 } from 'lucide-react';

const TrustedBy = () => {
  return (
    <section className="py-12 px-margin-mobile md:px-margin-desktop bg-background border-t border-outline-variant/20">
      <div className="max-w-max-width mx-auto flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity duration-300">
        <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-6 text-center">
          Trusted by innovative frontend teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {/* Placeholder Logos */}
          <div className="flex items-center gap-2 text-on-surface-variant font-headline-md">
            <Building2 size={24} /> <span>Acme Corp</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-headline-md font-bold">
            <Building2 size={24} /> <span>Globex</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-headline-md italic">
            <Building2 size={24} /> <span>Soylent</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-headline-md">
            <Building2 size={24} /> <span>Initech</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
