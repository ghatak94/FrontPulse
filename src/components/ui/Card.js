import React from 'react';

const Card = ({ children, className = '', glass = false, noPadding = false, highlight = false }) => {
  const baseStyles = 'rounded-xl overflow-hidden';
  const paddingStyle = noPadding ? '' : 'p-8';
  const glassStyles = glass 
    ? 'glass-panel' 
    : 'bg-surface border border-outline-variant/30 shadow-sm';
  const highlightStyles = highlight 
    ? 'border-2 border-primary shadow-lg relative transform md:-translate-y-4' 
    : 'hover:-translate-y-1 transition-transform duration-300';

  return (
    <div className={`${baseStyles} ${glassStyles} ${paddingStyle} ${highlightStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
