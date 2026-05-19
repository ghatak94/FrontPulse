'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, toggleMobileMenu } from '@/store/slices/uiSlice';
import { Moon, Sun, Menu, X, Bell, HelpCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

const Navbar = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const isMobileMenuOpen = useSelector((state) => state.ui.isMobileMenuOpen);

  const navLinks = ['Features', 'Solutions', 'Pricing', 'Documentation'];

  return (
    <nav className="w-full sticky top-0 z-40 bg-surface/80 dark:bg-surface-container/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">
            FrontPulse
          </span>
        </div>
        
        <div className="hidden lg:flex items-center justify-center gap-8 flex-1">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="font-medium text-on-surface-variant hover:text-primary transition-colors duration-200">
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant font-medium font-body-md text-body-md hover:bg-surface-variant/50 transition-colors duration-200 px-3 py-1.5 rounded-lg hidden md:block">
            Support
          </button>
          
          <div className="hidden md:flex items-center gap-1">
            <Button variant="primary" className="!py-2 !px-4" href="/login">Login</Button>
            
            <button 
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle Theme" 
              className="p-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 transition-colors duration-200 active:scale-95"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button 
            className="lg:hidden p-2 text-on-surface-variant"
            onClick={() => dispatch(toggleMobileMenu())}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-surface border-b border-outline-variant/30 shadow-lg px-margin-mobile py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="font-medium text-on-surface p-2 hover:bg-surface-variant/50 rounded-lg">
              {link}
            </a>
          ))}
          <div className="flex items-center justify-between p-2 border-t border-outline-variant/30 mt-2 pt-4">
            <Button variant="primary" className="w-full mr-4" href="/login">Login</Button>
            <button 
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle Theme" 
              className="p-2 rounded-full text-on-surface-variant bg-surface-variant/50"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
