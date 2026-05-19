import React from 'react';

const Input = ({ label, id, className = '', rightElement, ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label htmlFor={id} className="font-label-md text-label-md text-on-surface">
            {label}
          </label>
          {rightElement && rightElement}
        </div>
      )}
      <input
        id={id}
        className="px-4 py-3 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
        {...props}
      />
    </div>
  );
};

export default Input;
