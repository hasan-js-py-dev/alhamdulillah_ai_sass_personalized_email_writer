import React from 'react';
import { Loader2 } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  const variants = {
    primary: 'bg-soft-blue text-white hover:bg-soft-blue-dark hover:-translate-y-0.5 shadow-sm hover:shadow-md focus:ring-soft-blue',
    secondary: 'bg-gentle-orange text-white hover:bg-[#E08E50] hover:-translate-y-0.5 shadow-sm hover:shadow-md focus:ring-gentle-orange',
    ghost: 'text-warm-gray hover:bg-warm-gray/5 hover:text-warm-gray-dark',
    outline: 'border-2 border-soft-blue text-soft-blue hover:bg-soft-blue/5'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || isLoading} {...props}>
      {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : leftIcon ? <span className="mr-2">{leftIcon}</span> : null}
      {children}
    </button>;
}