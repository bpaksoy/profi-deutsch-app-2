
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfiDeutsch AI Dashboard',
};

// This layout component simply wraps the page.tsx content
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}