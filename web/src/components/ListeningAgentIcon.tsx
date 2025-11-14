
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ListeningAgentIconProps {
  isListening: boolean; 
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'size-6 text-xl',
  md: 'size-10 text-2xl',
  lg: 'size-16 text-4xl',
};

const ThrobKeyframes = `
  @keyframes throb {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.15); opacity: 0.7; }
  }
`;

export const ListeningAgentIcon: React.FC<ListeningAgentIconProps> = ({ 
  isListening, 
  size = 'md',
}) => {
  const currentSizeClass = sizeClasses[size];

  return (
    <div className="relative">
      {/* 1. Inject the CSS Keyframes into the DOM for Tailwind */}
      <style>{ThrobKeyframes}</style>

      {/* 2. The Throbber (The pulsating ring) */}
      {isListening && (
        <div
          className={twMerge(
            "absolute inset-0 bg-primary rounded-full opacity-75",
            currentSizeClass,
            "animate-throb" // Apply the custom animation
          )}
          style={{ animation: 'throb 1.5s infinite ease-in-out' }}
        ></div>
      )}

      {/* 3. The Agent Icon (The center) */}
      <div
        className={twMerge(
          "relative flex items-center justify-center rounded-full bg-primary text-white",
          currentSizeClass,
          isListening ? "shadow-lg shadow-primary/50" : "opacity-80"
        )}
      >

        <span className="material-symbols-outlined">
          mic
        </span>
      </div>
    </div>
  );
};