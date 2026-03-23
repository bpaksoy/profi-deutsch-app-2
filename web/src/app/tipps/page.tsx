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

                <footer className="mt-16 p-8 bg-primary/5 rounded-3xl border border-primary/10 text-center">
                    <h2 className="text-2xl font-bold mb-2">Noch Fragen?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 font-light">
                        Schreib Flo einfach direkt im Chat oder schau in die Einstellungen für Support.
                    </p>
                    <button 
                        className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        Jetzt loslegen
                    </button>
                </footer>
            </div>
        </div>
    );
}
