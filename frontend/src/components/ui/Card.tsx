import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}
export function Card({
  children,
  className = '',
  title,
  description,
  action
}: CardProps) {
  return <div className={`bg-white rounded-xl shadow-sm border border-warm-gray/5 p-6 transition-all duration-300 hover:shadow-md ${className}`}>
      {(title || action) && <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-warm-gray">{title}</h3>}
            {description && <p className="text-sm text-warm-gray-light mt-1">{description}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>}
      {children}
    </div>;
}