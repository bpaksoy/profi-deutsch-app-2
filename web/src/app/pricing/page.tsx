'use client';

import React, { useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const PLANS = [
    {
        id: 'CLASSIC',
        name: 'Classic',
        price: 'XX €', // Placeholder
        period: 'pro Monat',
        features: [
            '5 Stunden Konversation mit Flo',
            'Personalisierbares Redemittel-Buch (audio)',
            'Fortschritts- und Sprachanlyse'
        ],
        ctaText: 'Zwei Wochen kostenlos testen',
        color: 'bg-[#125A77]', // Darker blue from screenshot
        available: true,
        tag: 'MVP'
    },
    {
        id: 'PRO',
        name: 'Pro',
        price: 'XX €',
        period: 'pro Monat',
        features: [
            'Alle Classic-Features',
            'Spezifische Redemittel für deinen Beruf',
            'Basierend auf öffentlichen Ressourcen von Firmenwissen'
        ],
        ctaText: 'Später verfügbar',
        color: 'bg-gray-300 transform scale-95 opacity-80',
        available: false,
        tag: 'Später'
    },
    {
        id: 'ENTERPRISE',
        name: 'Enterprise',
        price: 'Kontaktieren Sie uns',
        period: 'min. XX € pro Nutzer & Lizenz',
        features: [
            'Bis zu 10 Stunden Konversation',
            'Firmenwissen-Datenbank (Knowledge Base)',
            'Sprachkompetenz-Analyse für Teams',
            'Inkl. Consulting & Support'
        ],
        ctaText: 'Angebot einholen',
        color: 'bg-[#50B232]', // Green from screenshot
        available: true,
        isEnterprise: true
    }
];

export default function PricingPage() {
    const { getToken } = useAuth();
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handleSubscribe = async (plan: string) => {
        if (!isLoaded || !user) {
            router.push('/sign-in');
            return;
        }

        if (plan === 'PRO') return;
        if (plan === 'ENTERPRISE') {
            window.location.href = 'mailto:support@sigsag.de?subject=Enterprise Inquiry';
            return;
        }

        setLoadingPlan(plan);
        try {
            const token = await getToken();
            const response = await fetch(`${API_BASE_URL}/payments/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ plan })
            });

            if (response.ok) {
                const { url } = await response.json();
                window.location.href = url;
            } else {
                console.error('Failed to create payment session');
            }
        } catch (error) {
            console.error('Error starting checkout:', error);
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark py-12 px-4 md:py-20">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-primary">Features and Pricing</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-light">
                        Wähle dein Paket und starte deine Profi-Deutsch Reise.
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {PLANS.map((plan) => (
                        <div 
                            key={plan.id}
                            className={`flex flex-col bg-white dark:bg-card-dark rounded-3xl shadow-xl overflow-hidden border-2 border-transparent transition-all hover:translate-y-[-4px] hover:shadow-2xl ${plan.color === 'bg-gray-300 transform scale-95 opacity-80' ? 'grayscale' : ''}`}
                        >
                            {/* Header Section */}
                            <div className={`${plan.color} p-6 text-center text-white`}>
                                <h2 className="text-2xl font-bold tracking-tight">{plan.name}</h2>
                            </div>

                            {/* Features Section */}
                            <div className="flex-1 p-8">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300 font-light">
                                            <span className="text-[#125A77] font-bold">•</span>
                                            <span className="text-sm md:text-base leading-snug">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Pricing & CTA Section */}
                            <div className="p-8 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800 text-center">
                                <div className="mb-2">
                                    <span className="text-3xl font-black">{plan.price}</span>
                                    {plan.period && <span className="text-sm text-gray-500 block">{plan.period}</span>}
                                </div>
                                
                                <button
                                    onClick={() => handleSubscribe(plan.id)}
                                    disabled={loadingPlan !== null || (plan.id === 'PRO')}
                                    className={`mt-6 w-full py-4 px-6 rounded-2xl font-bold transition-all shadow-lg active:scale-95
                                        ${plan.available 
                                            ? 'bg-primary text-white hover:bg-primary/90 shadow-primary/20' 
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'}
                                        ${loadingPlan === plan.id ? 'animate-pulse' : ''}
                                    `}
                                >
                                    {loadingPlan === plan.id ? 'Lädt...' : plan.ctaText}
                                </button>

                                {plan.id === 'CLASSIC' && (
                                     <button className="mt-4 text-primary font-bold hover:underline text-sm underline decoration-primary/30">
                                         Try two weeks for free
                                     </button>
                                )}
                                
                                {plan.isEnterprise && (
                                    <p className="mt-4 text-xs text-gray-500 font-light">
                                        + consulting + support
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center max-w-2xl mx-auto font-light text-gray-500">
                    <p>Sigsag ist dein Partner für berufliche Weiterentwicklung. Alle Preise inkl. Support.</p>
                </div>
            </div>
        </div>
    );
}
