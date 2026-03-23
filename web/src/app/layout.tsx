import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '../styles/global.css';
import { CustomLayout } from '../components/ui/Layout'; // Adjust the path as needed
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';


const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Sigsag',
  description: 'Sprachassistent zum Deutschlernen für Erwachsene mit B2-Kenntnissen',
  icons: {
    icon: '/icon.svg',
  },
  other: {
    google: 'notranslate',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="de" className="light Zain">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
        </head>
        <body className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
          <CustomLayout>
            {children}
          </CustomLayout>

        </body>
      </html>
    </ClerkProvider>
  );
}