'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark mt-auto">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left side - Brand/Copyright */}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Sigsag. Alle Rechte vorbehalten.
                    </div>

                    {/* Right side - Links */}
                    <div className="flex gap-6">
                        <Link
                            href="/impressum"
                            className="text-sm text-text-light dark:text-text-dark hover:text-primary dark:hover:text-accent transition-colors font-medium"
                        >
                            Impressum
                        </Link>
                        <Link
                            href="/datenschutz"
                            className="text-sm text-text-light dark:text-text-dark hover:text-primary dark:hover:text-accent transition-colors font-medium"
                        >
                            Datenschutz
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
