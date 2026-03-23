'use client';

import React from 'react';

const TIP_CATEGORIES = [
    {
        title: "Allgemeines & Motivation",
        icon: "lightbulb",
        tips: [
            {
                q: "Was ist Sigsag?",
                a: "Sigsag ist dein KI-Sprechpartner, der speziell für Fortgeschrittene (B2/C1) entwickelt wurde. Hier geht es nicht um Vokabeln büffeln, sondern um flüssiges Sprechen in beruflichen Kontexten."
            },
            {
                q: "Warum ist B2 so schwer?",
                a: "Auf dem B2-Niveau wechselst du von 'Basis-Kommunikation' zu 'nuanciertem Ausdruck'. Sigsag hilft dir, die Lücke zwischen 'verstehen' und 'selbstsicher anwenden' zu schließen."
            }
        ]
    },
    {
        title: "Gespräche mit Flo",
        icon: "chat",
        tips: [
            {
                q: "Wie starte ich ein Gespräch?",
                a: "Klicke einfach auf 'Sprechen & Hören' im Chat. Flo hört dir zu und antwortet dir direkt. Du kannst auch jederzeit tippen, wenn du in einer ruhigen Umgebung bist."
            },
            {
                q: "Gibt mir Flo Feedback?",
                a: "Ja! Flo korrigiert dich subtil in seinen Antworten oder gibt dir Tipps, wie du Dinge professioneller ausdrücken kannst. Achte auf seine Formulierungen."
            }
        ]
    },
    {
        title: "Redemittel & Phrases",
        icon: "bookmark",
        tips: [
            {
                q: "Wie speichere ich Sätze?",
                a: "Markiere einfach einen Text in einer Nachricht von Flo. Es erscheint ein kleiner 'Speichern'-Button. So baust du dir dein eigenes Fachvokabular auf."
            },
            {
                q: "Was mache ich mit den Kategorien?",
                a: "Sortiere deine Sätze nach Themen wie 'Meetings', 'Verhandlungen' oder 'Smalltalk'. Das hilft dir, sie gezielt vor wichtigen Terminen zu wiederholen."
            }
        ]
    }
];

export default function TippsPage() {
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-background-light dark:bg-background-dark">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black mb-4 text-primary">Tipps & FAQ</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Hol das Beste aus deinem Profi-Deutsch Training heraus.
                    </p>
                </header>

                <div className="grid gap-8">
                    {TIP_CATEGORIES.map((cat, idx) => (
                        <div key={idx} className="space-y-4">
                            <div className="flex items-center gap-3 text-primary font-bold text-lg uppercase tracking-wider">
                                <span className="material-symbols-outlined">{cat.icon}</span>
                                <h2>{cat.title}</h2>
                            </div>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                                {cat.tips.map((tip, tIdx) => (
                                    <div 
                                        key={tIdx} 
                                        className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
                                            {tip.q}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                                            {tip.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="mt-16 p-10 bg-primary/5 rounded-[2.5rem] border border-primary/10 text-center shadow-inner">
                    <h2 className="text-2xl font-black mb-2 text-primary">Noch Fragen?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 font-light max-w-lg mx-auto">
                        Schreib Flo einfach direkt im Chat oder sende uns eine E-Mail, wenn du technische Probleme hast oder Feedback geben möchtest.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button 
                            onClick={() => window.location.href = '/chat'}
                            className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">chat_bubble</span>
                            Jetzt loslegen
                        </button>
                        <a 
                            href="mailto:support@sigsag.de?subject=Anfrage von Sigsag Tipps"
                            className="w-full sm:w-auto bg-white dark:bg-card-dark text-text-light dark:text-text-dark border-2 border-border-light dark:border-border-dark px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">mail</span>
                            Support kontaktieren
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
