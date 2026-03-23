'use client';

import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const ClerkProviderAny = ClerkProvider as any;
  return (
    <ClerkProviderAny>
      {children}
    </ClerkProviderAny>
  );
}
