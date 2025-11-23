// web/src/components/AssistantOrb.tsx

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface AssistantOrbProps {
  onClick: () => void; // Function to activate the assistant
  isModalOpen: boolean; // Controls the pulse animation
}

// CRITICAL: We'll redefine the throb animation for a better, more pronounced pulse
const OrbKeyframes = `
  @keyframes orb-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255, 204, 0, 0.7); } /* Accent color */
    50% { box-shadow: 0 0 0 15px rgba(255, 204, 0, 0); } /* Larger, faded pulse */
  }
`;

export const AssistantOrb: React.FC<AssistantOrbProps> = ({ onClick, isModalOpen }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "fixed bottom-8 right-8 z-50 p-3 rounded-full bg-accent text-primary shadow-2xl transition-all duration-300",
        "flex items-center justify-center cursor-pointer",
        isModalOpen ? "w-14 h-14" : "w-16 h-16 hover:scale-105" // Slightly larger when closed
      )}
      style={{
        // Apply the pulse animation when the modal is closed
        animation: isModalOpen ? 'none' : 'orb-pulse 2s infinite ease-out',
      }}
    >
        {/* 1. Inject the CSS Keyframes */}
        <style>{OrbKeyframes}</style>

        {/* 2. Emoji Face - Using the winking face for a friendly look */}
        <span className="text-4xl" role="img" aria-label="Virtual Assistant">
            😉
        </span>
    </button>
  );
};