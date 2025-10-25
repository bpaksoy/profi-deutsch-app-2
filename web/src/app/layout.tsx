import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '../styles/global.css';
import { CustomLayout } from '../components/ui/Layout'; // Adjust the path as needed
import React from 'react';


const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'ProfiDeutsch',
  description: 'AI-powered professional German tutor for internship candidates.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} light`}>
      <body className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <CustomLayout>
          {children}
        </CustomLayout>
        
      </body>
    </html>
  );
}