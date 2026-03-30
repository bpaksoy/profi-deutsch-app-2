'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark text-primary animate-pulse font-bold text-xl">Flo wird geladen...</div>}>
        {children}
      </React.Suspense>
    </AuthProvider>
  );
}
