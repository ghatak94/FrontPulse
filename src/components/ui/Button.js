import React from 'react';
import Link from 'next/link';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-label-md text-label-md rounded-lg transition-all active:scale-95';
  
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-surface-tint shadow-sm px-8 py-4',
    secondary: 'bg-surface text-on-surface border border-outline-variant hover:bg-surface-variant/30 px-8 py-4',
    ghost: 'text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 px-3 py-1.5',
    icon: 'p-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50'
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
