import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Background Circle/Emblem */}
        <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1" />
        
        {/* Abstract Leaf / Herbal Motif (Representing Peace & Pyeonggang) */}
        <path
          d="M50 20C50 20 20 40 20 65C20 80 35 85 50 85C65 85 80 80 80 65C80 40 50 20 50 20Z"
          fill="#166534"
          className="fill-primary"
        />
        
        {/* Golden Branch / Harmony Line */}
        <path
          d="M50 25V80M30 65C30 65 40 55 50 55C60 55 70 65 70 65"
          stroke="#EAB308"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-secondary"
        />
        
        {/* Stylized '평' (Pyeong) integration or geometric harmony */}
        <circle cx="50" cy="50" r="15" fill="white" fillOpacity="0.2" />
      </svg>
    </div>
  );
};
