// web/src/components/SettingsSidebar.tsx
import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface SettingsSidebarProps {
  username: string;
  email: string;
  userAvatar: string;
  activeSection: 'profile' | 'preferences' | 'privacy' | 'logout';
}

const navItems = [
  { name: 'Profile', icon: 'person', section: 'profile' },
  { name: 'Preferences', icon: 'tune', section: 'preferences' },
  { name: 'Privacy', icon: 'shield_person', section: 'privacy' },
];

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ username, email, userAvatar, activeSection }) => {
  const isProfileActive = activeSection === 'profile'; // Example of how to use activeSection

  return (
    <aside className="md:col-span-1 lg:col-span-1">
      <div className="flex h-full min-h-[700px] flex-col justify-between bg-card-light dark:bg-card-dark/50 rounded-xl p-4 border border-border-light dark:border-border-dark">
        <div className="flex flex-col gap-4">
          
          {/* User Info */}
          <div className="flex gap-3 items-center">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shrink-0" 
              data-alt="User's profile picture" 
              style={{ backgroundImage: `url("${userAvatar}")` }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-text-light dark:text-text-dark text-base font-bold leading-normal">{username}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">{email}</p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 mt-6">
            {navItems.map((item) => (
              <a
                key={item.section}
                href={`#${item.section}`} // Anchor links for single-page nav
                className={twMerge(
                  "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                  activeSection === item.section
                    ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent" // Active style
                    : "hover:bg-border-light dark:hover:bg-card-dark text-text-light dark:text-text-dark" // Default/Hover style
                )}
              >
                <span className={twMerge("material-symbols-outlined text-2xl", activeSection === item.section ? 'text-primary dark:text-accent' : 'text-gray-700 dark:text-gray-300')}>
                  {item.icon}
                </span>
                <p className="text-sm font-medium leading-normal">{item.name}</p>
              </a>
            ))}
          </nav>
        </div>
        
        {/* Log Out Button */}
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-border-light dark:hover:bg-card-dark cursor-pointer text-text-light dark:text-text-dark">
            <span className="material-symbols-outlined text-gray-700 dark:text-gray-300 text-2xl">logout</span>
            <p className="text-sm font-medium leading-normal">Log Out</p>
          </button>
        </div>
      </div>
    </aside>
  );
};