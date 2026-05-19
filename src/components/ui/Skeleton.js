import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular' }) => {
  const baseStyles = 'bg-surface-variant/50 animate-pulse rounded';
  
  const variants = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4 w-3/4'
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} />
  );
};

export default Skeleton;
