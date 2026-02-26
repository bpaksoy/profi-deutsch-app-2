// web/src/components/ui/PhraseSidebar.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '@clerk/nextjs';

interface PhraseSidebarProps {
  activeCategory?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const DEFAULT_B2_CATEGORIES = [
  { name: 'Arbeit', icon: 'work' },
  { name: 'Bildung', icon: 'school' },
  { name: 'Alltag', icon: 'home' },
  { name: 'Kultur', icon: 'theater_comedy' },
  { name: 'Freizeit', icon: 'sports_tennis' },
];

export const PhraseSidebar: React.FC<PhraseSidebarProps> = ({ activeCategory = 'all' }) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const [categories, setCategories] = React.useState<{ name: string; href: string; icon: string; key: string; count: number }[]>([]);

  const fetchCategories = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/phrasebook/categories`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();

        // Start with the "All" tab
        const items: { name: string; href: string; icon: string; key: string; count: number }[] = [
          { name: 'Alle', href: '/phrases?category=all', icon: 'list_alt', key: 'all', count: 0 },
        ];

        // Merge B2 defaults with backend data
        const backendMap = new Map(data.map((cat: any) => [cat.name, cat]));

        for (const def of DEFAULT_B2_CATEGORIES) {
          const backendCat = backendMap.get(def.name) as any;
          items.push({
            name: def.name,
            href: `/phrases?category=${encodeURIComponent(def.name)}`,
            icon: def.icon,
            key: def.name,
            count: backendCat?.phraseCount ?? 0,
          });
          backendMap.delete(def.name);
        }

        // Add any extra categories created by the user
        for (const [name, cat] of backendMap) {
          items.push({
            name: name as string,
            href: `/phrases?category=${encodeURIComponent(name as string)}`,
            icon: 'label',
            key: name as string,
            count: (cat as any)?.phraseCount ?? 0,
          });
        }

        setCategories(items);
      }
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  };

  React.useEffect(() => {
    fetchCategories();

    const handleUpdate = () => fetchCategories();
    window.addEventListener('phraseAdded', handleUpdate);
    return () => window.removeEventListener('phraseAdded', handleUpdate);
  }, []);

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-border-light dark:border-border-dark p-4 lg:flex lg:flex-col">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 px-2 pt-2">
            <h1 className="text-text-light dark:text-text-dark text-base font-semibold">Kategorien</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Thema suchen</p>
          </div>
          <nav className="flex flex-col gap-1">
            {categories.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={twMerge(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-text-light dark:text-text-dark hover:bg-border-light dark:hover:bg-card-dark transition-colors",
                  activeCategory === item.key && "bg-primary/20 dark:bg-primary/30 text-primary dark:text-text-dark"
                )}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <p className="text-sm font-medium flex-1">{item.name}</p>
                {item.count > 0 && (
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{item.count}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Start Chat Button */}
        <div className="flex flex-col gap-4 bg-background-light dark:bg-card-dark/50 p-4 rounded-xl border border-border-light dark:border-border-dark">
          <div className="flex flex-col gap-1">
            <h2 className="text-text-light dark:text-text-dark text-base font-medium leading-normal">Redemittel üben?</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-normal">Wende deine Redemittel direkt im Chat an.</p>
          </div>
          <button
            onClick={() => router.push('/chat')}
            className="flex h-10 min-w-[84px] w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white transition-colors hover:bg-primary/90"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            <span className="truncate">Chat starten</span>
          </button>
        </div>
      </div>
    </aside>
  );
};