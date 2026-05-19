import React from 'react';
import { Share2, Code, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 pt-20 pb-10 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-max-width mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-sm">
            <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">FrontPulse</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant w-full">
            The AI-powered intelligence platform for frontend teams.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full bg-surface-variant/30 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 transition-all">
              <Share2 size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-surface-variant/30 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 transition-all">
              <Code size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-surface-variant/30 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 transition-all">
              <User size={20} />
            </a>
          </div>
        </div>

        {/* Product Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider">Product</h4>
          <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">Features</a>
            <a href="#" className="hover:text-primary transition-colors">Integrations</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">Changelog</a>
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
          </div>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider">Resources</h4>
          <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">Blog</a>
            <a href="#" className="hover:text-primary transition-colors">Community</a>
            <a href="#" className="hover:text-primary transition-colors">Help Center</a>
            <a href="#" className="hover:text-primary transition-colors">API Reference</a>
            <a href="#" className="hover:text-primary transition-colors">Status</a>
          </div>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider">Company</h4>
          <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">About Us</a>
            <a href="#" className="hover:text-primary transition-colors">Careers</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Legal</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-max-width mx-auto pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-sm text-body-sm text-on-surface-variant">© 2026 FrontPulse Inc. All rights reserved.</p>
        <div className="flex items-center gap-6 font-body-sm text-body-sm text-on-surface-variant">
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
