'use client';

import React, { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';

function useThemeInit() {
  useEffect(() => {
    const saved = localStorage.getItem('sigsag-theme') as 'light' | 'dark' | 'system' | null;
    const html = document.documentElement;
    if (saved === 'dark') {
      html.classList.remove('light');
      html.classList.add('dark');
    } else if (saved === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.remove('light', 'dark');
      html.classList.add(prefersDark ? 'dark' : 'light');
    }
    // 'light' is the default from layout.tsx, no action needed
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useThemeInit();
  return (
    <AuthProvider>
      <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark text-primary animate-pulse font-bold text-xl">Flo wird geladen...</div>}>
        {children}
      </React.Suspense>
    </AuthProvider>
  );
}
