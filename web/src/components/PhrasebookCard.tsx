'use client';

import React, { useState, useEffect } from 'react';

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
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadCategories();
        loadAllPhrases();

        const handlePhraseAdded = () => {
            loadCategories();
            if (selectedCategory) {
                loadPhrases(selectedCategory);
            } else {
                loadAllPhrases();
            }
        };

        window.addEventListener('phraseAdded', handlePhraseAdded);

        return () => {
            window.removeEventListener('phraseAdded', handlePhraseAdded);
        };
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedCategory) {
            loadPhrases(selectedCategory);
        } else {
            loadAllPhrases();
        }
    }, [selectedCategory]);

    const loadCategories = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/phrasebook/categories`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    setCategories([]);
                }
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error('Failed to load categories:', error);
            setCategories([]);
        }
    };

    const loadPhrases = async (category: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/phrasebook/phrases?category=${category}`);
            if (response.ok) {
                const data = await response.json();
                setPhrases(Array.isArray(data) ? data : []);
            } else {
                setPhrases([]);
            }
        } catch (error) {
            console.error('Failed to load phrases:', error);
            setPhrases([]);
        }
    };

    const loadAllPhrases = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/phrasebook/phrases`);
            if (response.ok) {
                const data = await response.json();
                setPhrases(Array.isArray(data) ? data : []);
            } else {
                setPhrases([]);
            }
        } catch (error) {
            console.error('Failed to load phrases:', error);
            setPhrases([]);
        }
    };

    const deletePhrase = async (phraseId: string) => {
        try {
            await fetch(`${API_BASE_URL}/phrasebook/phrases/${phraseId}`, {
                method: 'DELETE'
            });
            setPhrases(phrases.filter(p => p.id !== phraseId));
            loadCategories();
        } catch (error) {
            console.error('Failed to delete phrase:', error);
        }
    };

    const playPhrase = async (text: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat/tts?text=${encodeURIComponent(text)}`);
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
            audio.onended = () => URL.revokeObjectURL(audioUrl);
        } catch (error) {
            console.error('Failed to play phrase:', error);
        }
    };

    const filteredPhrases = Array.isArray(phrases) ? phrases.filter(phrase =>
        phrase.german.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
            <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setSelectedCategory('')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!selectedCategory
                                ? 'bg-primary/10 text-primary dark:bg-accent dark:text-primary'
                                : 'hover:bg-gray-100 dark:hover:bg-white/10'
                                }`}
                        >
                            Alle ({phrases.length})
                        </button>
                        {Array.isArray(categories) && categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedCategory === cat.id
                                    ? 'bg-primary/10 text-primary dark:bg-accent dark:text-primary'
                                    : 'hover:bg-gray-100 dark:hover:bg-white/10'
                                    }`}
                            >
                                {cat.name} ({cat.phraseCount})
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <input
                            className="w-full sm:w-auto pl-10 pr-4 py-2 rounded-full bg-accent/10 dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                            placeholder="Redemittel suchen..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            search
                        </span>
                    </div>
                </div>
                <ul className="mt-6 space-y-4">
                    {filteredPhrases.length === 0 ? (
                        <li className="text-center py-8 text-gray-500">
                            Noch keine Redemittel gespeichert. Füge hier Redemittel aus deinen Gesprächen ein.
                        </li>
                    ) : (
                        filteredPhrases.map(phrase => (
                            <li
                                key={phrase.id}
                                className="flex justify-between items-center p-4 rounded-lg bg-background-light dark:bg-background-dark"
                            >
                                <div className="flex-1">
                                    <p className="font-medium">{phrase.german}</p>
                                    {phrase.english && (
                                        <p className="text-sm text-gray-500 mt-1">{phrase.english}</p>
                                    )}
                                    {phrase.context && (
                                        <p className="text-xs text-gray-400 mt-1">{phrase.context}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => playPhrase(phrase.german)}
                                        aria-label="Anhören"
                                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                                    >
                                        <span className="material-symbols-outlined">volume_up</span>
                                    </button>
                                    <button
                                        onClick={() => deletePhrase(phrase.id)}
                                        aria-label="Löschen"
                                        className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                                    >
                                        <span className="material-symbols-outlined">delete</span>
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