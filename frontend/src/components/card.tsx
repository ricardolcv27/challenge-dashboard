import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        padding: '1.5rem',
        border: '1px solid #374151',
      }}
    >
      {children}
    </div>
  );
};
