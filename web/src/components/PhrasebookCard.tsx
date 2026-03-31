'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

interface Phrase {
    id: string;
    german: string;
    english?: string;
    context?: string;
    category: string;
}

interface Category {
    id: string;
    name: string;
    phraseCount: number;
}

export const PhrasebookCard: React.FC = () => {
    const { getToken } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadCategories();
        loadAllPhrases();

        const handlePhraseAdded = () => {
            loadCategories();
            loadAllPhrases();
        };

        window.addEventListener('phraseAdded', handlePhraseAdded);
        return () => window.removeEventListener('phraseAdded', handlePhraseAdded);
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            loadPhrases(selectedCategory);
        } else {
            loadAllPhrases();
        }
    }, [selectedCategory]);

    const loadCategories = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`${API_BASE_URL}/phrasebook/categories`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                const mappedCategories = data.map((cat: any) => ({
                    id: cat.name,
                    name: cat.name,
                    phraseCount: cat.phraseCount || 0
                }));
                setCategories(mappedCategories);
            }
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    };

    const loadPhrases = async (category: string) => {
        try {
            const token = await getToken();
            const response = await fetch(`${API_BASE_URL}/phrasebook/phrases?category=${category}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                const phraseList = data.phrases ?? (Array.isArray(data) ? data : []);
                setPhrases(Array.isArray(phraseList) ? phraseList : []);
            }
        } catch (error) {
            console.error('Failed to load phrases:', error);
            setPhrases([]);
        }
    };

    const loadAllPhrases = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`${API_BASE_URL}/phrasebook/phrases`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                const phraseList = data.phrases ?? (Array.isArray(data) ? data : []);
                setPhrases(Array.isArray(phraseList) ? phraseList : []);
            }
        } catch (error) {
            console.error('Failed to load phrases:', error);
            setPhrases([]);
        }
    };

    const deletePhrase = async (phraseId: string) => {
        try {
            const token = await getToken();
            await fetch(`${API_BASE_URL}/phrasebook/phrases/${phraseId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPhrases(prev => prev.filter(p => p.id !== phraseId));
            loadCategories();
        } catch (error) {
            console.error('Failed to delete phrase:', error);
        }
    };

    const playPhrase = async (text: string) => {
        try {
            const token = await getToken();
            const response = await fetch(`${API_BASE_URL}/chat/tts?text=${encodeURIComponent(text)}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
                audio.onended = () => URL.revokeObjectURL(audioUrl);
            }
        } catch (error) {
            console.error('Failed to play phrase:', error);
        }
    };

    const filteredPhrases = Array.isArray(phrases) ? phrases.filter(phrase => {
        const q = searchQuery.toLowerCase();
        return phrase.german.toLowerCase().includes(q) ||
            (phrase.english && phrase.english.toLowerCase().includes(q)) ||
            (phrase.context && phrase.context.toLowerCase().includes(q));
    }) : [];

    const totalPhrases = categories.reduce((sum, cat) => sum + cat.phraseCount, 0);

    // Empty state: show a clean, minimal card
    if (totalPhrases === 0 && phrases.length === 0) {
        return (
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="p-6 flex flex-col items-center text-center gap-3 py-10">
                    <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600">menu_book</span>
                    <p className="text-gray-500 dark:text-gray-400">
                        Noch keine Redemittel gespeichert.
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        Speichere nützliche Ausdrücke aus deinen Gesprächen — sie erscheinen hier.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
            <div className="p-6">
                {/* Search bar first, then categories below */}
                <div className="flex flex-col gap-3 mb-4">
                    <div className="relative w-full sm:w-72">
                        <input
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-accent/10 dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                            placeholder="Redemittel suchen..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
                            search
                        </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setSelectedCategory('')}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${!selectedCategory
                                ? 'bg-primary/10 text-primary dark:bg-accent dark:text-primary'
                                : 'hover:bg-gray-100 dark:hover:bg-white/10'
                                }`}
                        >
                            Alle ({totalPhrases})
                        </button>
                        {categories.filter(cat => cat.phraseCount > 0).map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selectedCategory === cat.id
                                    ? 'bg-primary/10 text-primary dark:bg-accent dark:text-primary'
                                    : 'hover:bg-gray-100 dark:hover:bg-white/10'
                                    }`}
                            >
                                {cat.name} ({cat.phraseCount})
                            </button>
                        ))}
                    </div>
                </div>
                <ul className="space-y-3">
                    {filteredPhrases.length === 0 ? (
                        <li className="text-center py-6 text-gray-500 text-sm">
                            Keine Redemittel gefunden.
                        </li>
                    ) : (
                        filteredPhrases.map(phrase => (
                            <li
                                key={phrase.id}
                                className="flex justify-between items-center p-3 rounded-lg bg-background-light dark:bg-background-dark"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">{phrase.german}</p>
                                    {phrase.english && (
                                        <p className="text-xs text-gray-500 mt-0.5">{phrase.english}</p>
                                    )}
                                    {phrase.context && (
                                        <p className="text-xs text-gray-400 mt-0.5 truncate">{phrase.context}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                                    <button
                                        onClick={() => playPhrase(phrase.german)}
                                        aria-label="Anhören"
                                        className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">volume_up</span>
                                    </button>
                                    <button
                                        onClick={() => deletePhrase(phrase.id)}
                                        aria-label="Löschen"
                                        className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};