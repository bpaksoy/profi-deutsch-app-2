import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './../styles/globals.css'; // Correct path to globals.css

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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
      </head>
      <body className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        {children}
      </body>
    </html>
  );
}