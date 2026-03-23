'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentCancelPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <div className="size-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 text-red-600">
                <span className="material-symbols-outlined text-5xl">close</span>
            </div>
            <h1 className="text-3xl font-black mb-4">Zahlung abgebrochen</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                Der Zahlungsvorgang wurde nicht abgeschlossen. Es wurde kein Betrag abgebucht.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                    onClick={() => router.push('/pricing')}
                    className="w-full sm:w-auto bg-primary text-white px-10 py-3 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                >
                    Anderes Paket wählen
                </button>
                <button 
                    onClick={() => router.push('/dashboard')}
                    className="w-full sm:w-auto bg-white dark:bg-card-dark text-text-light dark:text-text-dark border-2 border-border-light dark:border-border-dark px-10 py-3 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95"
                >
                    Zurück zum Dashboard
                </button>
            </div>
        </div>
    );
}
