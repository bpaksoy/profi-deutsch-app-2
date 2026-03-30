'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        // You could verify the session here if needed
        const timer = setTimeout(() => {
            router.push('/dashboard');
        }, 5000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <div className="size-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600">
                <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <h1 className="text-3xl font-black mb-4">Vielen Dank!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Deine Zahlung war erfolgreich. Dein Account wird gerade auf den neuen Plan umgestellt.
            </p>
            <p className="text-sm text-gray-400 mb-8 font-light">
                Du wirst in wenigen Augenblicken automatisch zum Dashboard weitergeleitet.
            </p>
            <button 
                onClick={() => router.push('/dashboard')}
                className="bg-primary text-white px-10 py-3 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
            >
                Direkt zum Dashboard
            </button>
        </div>
    );
}
