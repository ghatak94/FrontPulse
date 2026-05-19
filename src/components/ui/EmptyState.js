import React from 'react';
import { Sparkles } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = Sparkles, 
  title = "No Data Available", 
  description = "There is nothing to display here right now.",
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-outline-variant/30 rounded-xl bg-surface/50">
      <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant mb-4">
        <Icon size={24} />
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant w-full mb-6">
        {description}
      </p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
