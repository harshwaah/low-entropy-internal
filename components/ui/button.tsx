import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-brand-dark text-white hover:bg-brand-dark/90 shadow-sm focus-visible:ring-brand-dark',
        destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-sm focus-visible:ring-red-500',
        outline: 'border-2 border-brand-dark bg-transparent hover:bg-brand-dark hover:text-white text-brand-dark',
        secondary: 'bg-brand-light text-brand-dark hover:bg-brand-primary hover:text-white',
        ghost: 'hover:bg-brand-light hover:text-brand-dark text-brand-text',
        link: 'text-brand-dark underline-offset-4 hover:underline font-semibold',
        white: 'bg-white text-brand-dark hover:bg-gray-50 shadow-sm',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

