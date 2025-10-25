// web/src/components/ui/PhraseSidebar.tsx
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface PhraseSidebarProps {
  // Can be used to highlight the active category
  activeCategory?: 'all' | 'meetings' | 'written' | 'networking' | 'phone' | 'problems'; 
}

// Sidebar Data (Could come from an API later)
const categories = [
  { name: 'All Phrases', href: '#', icon: 'list_alt', key: 'all' },
  { name: 'Meetings & Presentations', href: '#', icon: 'slideshow', key: 'meetings' },
  { name: 'Written Communication', href: '#', icon: 'mail', key: 'written' },
  { name: 'Networking & Small Talk', href: '#', icon: 'groups', key: 'networking' },
  { name: 'On the Phone', href: '#', icon: 'call', key: 'phone' },
  { name: 'Problem Solving', href: '#', icon: 'report', key: 'problems' },
];

export const PhraseSidebar: React.FC<PhraseSidebarProps> = ({ activeCategory = 'all' }) => {
  const aiAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDEGa6tENvPktljzXtvEqHQBAbyB_Da8qoQRkavV3xSD-B9jHdfLZ2wDN4rW2fmHB8CFZ4TazMfRjjSfiOIiw3A0LpQ1xThwyjvJxktSEVNd5fGOFZMKdcA8QXWydiqLmMRWu1feLZcNQXppzgMQR8Nno0sdHrhAZmB3CloxcWskwlAKO4J7kBiVTURrHp-notJYJV9saCQr8-vJTyrbZVJZBl7un6SMekYzdcJyRqX5yEqcNyrKJJtRgRYJTI2py";

  return (
    // Note: The outer flex container that contains this sidebar AND the main content 
    // must be defined in CustomLayout.tsx
    <aside className="hidden w-64 flex-shrink-0 border-r border-border-light dark:border-border-dark p-4 lg:flex lg:flex-col">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 px-2 pt-2">
            <h1 className="text-text-light dark:text-text-dark text-base font-semibold">Categories</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Browse by topic</p>
          </div>
          <nav className="flex flex-col gap-1">
            {categories.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={twMerge(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-text-light dark:text-text-dark hover:bg-border-light dark:hover:bg-card-dark",
                  activeCategory === item.key && "bg-primary/20 dark:bg-primary/30 text-primary dark:text-text-dark" // Use dark:text-text-dark for contrast against dark background
                )}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <p className="text-sm font-medium">{item.name}</p>
              </Link>
            ))}
          </nav>
        </div>

        {/* AI Assistant Block */}
        <div className="flex flex-col gap-4 bg-background-light dark:bg-card-dark/50 p-4 rounded-xl border border-border-light dark:border-border-dark">
          <div className="flex items-center gap-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              data-alt="ProfiDeutsch AI assistant avatar"
              style={{ backgroundImage: `url("${aiAvatar}")` }}
            ></div>
            <div className="flex flex-col">
              <h2 className="text-text-light dark:text-text-dark text-base font-medium leading-normal">ProfiDeutsch AI</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-normal">Your learning assistant</p>
            </div>
          </div>
          <button className="flex h-10 min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-card-light transition-colors hover:bg-primary/90">
            <span className="truncate">Get Help</span>
          </button>
        </div>
      </div>
    </aside>
  );
};