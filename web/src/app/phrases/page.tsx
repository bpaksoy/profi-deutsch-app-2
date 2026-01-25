'use client';

// This component will contain the content that goes into the <main> tag
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

interface Phrase {
  id: string;
  german: string;
  english?: string;
  context?: string;
  category: string;
}

export default function PhrasesPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPhrases();
  }, [categoryParam]);

  const loadPhrases = async () => {
    setIsLoading(true);
    try {
      let url = `${API_BASE_URL}/phrasebook/phrases`;
      if (categoryParam && categoryParam !== 'all') {
        url += `?category=${categoryParam}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPhrases(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to load phrases:', error);
    } finally {
      setIsLoading(false);
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

  const deletePhrase = async (phraseId: string) => {
    if (!confirm('Möchtest du dieses Redemittel wirklich löschen?')) return;

    try {
      await fetch(`${API_BASE_URL}/phrasebook/phrases/${phraseId}`, {
        method: 'DELETE'
      });
      setPhrases(phrases.filter(p => p.id !== phraseId));
      // Trigger generic event so sidebar updates counts
      window.dispatchEvent(new Event('phraseAdded'));
    } catch (error) {
      console.error('Failed to delete phrase:', error);
    }
  };

  const filteredPhrases = phrases.filter(phrase =>
    phrase.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (phrase.context && phrase.context.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    // Note: The sidebar will be rendered next to this main content via CustomLayout
    <>
      <div className="mx-auto max-w-4xl">
        {/* Header section */}
        <div className="flex flex-col gap-4">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2">
            <a className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary" href="/dashboard">Home</a>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-sm font-medium text-text-light dark:text-text-dark">Redemittel</span>
            {categoryParam && categoryParam !== 'all' && (
              <>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                <span className="text-sm font-medium text-primary capitalize">{categoryParam}</span>
              </>
            )}
          </div>

          {/* PageHeading */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-text-light dark:text-text-dark">
                {categoryParam && categoryParam !== 'all' ? categoryParam : 'Alle Redemittel'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Deine gespeicherten Ausdrücke und Vokabeln</p>
            </div>
          </div>

          {/* SearchBar */}
          <div className="relative w-full">
            <input
              className="w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-2.5 pl-10 pr-4 text-base text-text-light dark:text-text-dark placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Suche..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
          </div>
        </div>

        {/* Filter and Content Area */}
        <div className="mt-8 flex flex-col gap-6">
          {/* Filter Controls */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isLoading ? 'Lade...' : `${filteredPhrases.length} Ausdrücke`}
            </p>
          </div>

          {/* Phrase List */}
          <div className="grid grid-cols-1 gap-4">
            {isLoading ? (
              <div className="text-center py-12 text-gray-400">Lade Daten...</div>
            ) : filteredPhrases.length === 0 ? (
              <div className="text-center py-12 text-gray-400 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
                Keine Redemittel gefunden.
              </div>
            ) : (
              filteredPhrases.map(phrase => (
                <div key={phrase.id} className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="text-lg font-semibold">{phrase.german}</h3>
                    {phrase.context && <p className="text-sm text-gray-500 mt-1">{phrase.context}</p>}
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-accent/20 text-accent-foreground">
                      {phrase.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => playPhrase(phrase.german)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-primary"
                      title="Anhören"
                    >
                      <span className="material-symbols-outlined">volume_up</span>
                    </button>
                    <button
                      onClick={() => deletePhrase(phrase.id)}
                      className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500"
                      title="Löschen"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}