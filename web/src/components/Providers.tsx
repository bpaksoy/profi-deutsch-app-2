'use client';

import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

function applyTheme(mode: string) {
  const html = document.documentElement;
  if (mode === 'dark') {
    html.classList.remove('light');
    html.classList.add('dark');
  } else if (mode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.remove('light', 'dark');
    html.classList.add(prefersDark ? 'dark' : 'light');
  } else {
    html.classList.remove('dark');
    html.classList.add('light');
  }
}

function ThemeSync() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    // Apply localStorage theme immediately to avoid flash
    const saved = localStorage.getItem('sigsag-theme');
    if (saved) applyTheme(saved);
  }, []);

  useEffect(() => {
    if (!isSignedIn) return;
    // Fetch server theme and sync
    const syncTheme = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API_BASE_URL}/progress/theme`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const { theme } = await res.json();
          if (theme) {
            localStorage.setItem('sigsag-theme', theme);
            applyTheme(theme);
          }
        }
      } catch (e) {
        // Fall back to localStorage theme silently
      }
    };
    syncTheme();
  }, [isSignedIn]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeSync />
      <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark text-primary animate-pulse font-bold text-xl">Flo wird geladen...</div>}>
        {children}
      </React.Suspense>
    </AuthProvider>
  );
}
