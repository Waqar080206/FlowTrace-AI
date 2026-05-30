import React from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, subtitle, children, className = '' }: CardProps) {
  return (
    <div className={`bg-bg-primary rounded-lg border border-palette-light-gray p-4 shadow-md flex flex-col min-w-0 ${className}`}>
      <div className="mb-4">
        <h3 className="text-size8 font-bold text-text-primary font-poppins">{title}</h3>
        {subtitle && <p className="text-size6 text-text-text4 font-poppins">{subtitle}</p>}
      </div>
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  )
}
