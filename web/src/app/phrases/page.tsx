'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

interface Phrase {
  id: string;
  german: string;
  english?: string;
  context?: string;
  category: string;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  phraseCount: number;
}

const DEFAULT_CATEGORIES = ['Arbeit', 'Bildung', 'Alltag', 'Kultur', 'Freizeit'];
const MAX_PHRASES = 100;

export default function PhrasesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getToken } = useAuth();
  const categoryParam = searchParams.get('category');

  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Modal states
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [actionPhrase, setActionPhrase] = useState<Phrase | null>(null);
  const [editText, setEditText] = useState('');
  const [editContext, setEditContext] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  // Dropdown menu
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const loadPhrases = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      let url = `${API_BASE_URL}/phrasebook/phrases`;
      if (categoryParam && categoryParam !== 'all') {
        url += `?category=${encodeURIComponent(categoryParam)}`;
      }

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPhrases(Array.isArray(data.phrases) ? data.phrases : Array.isArray(data) ? data : []);
        setTotalCount(data.totalCount ?? 0);
        if (data.totalCount >= MAX_PHRASES) {
          setShowLimitWarning(true);
        }
      }
    } catch (error) {
      console.error('Failed to load phrases:', error);
    } finally {
      setIsLoading(false);
    }
  }, [categoryParam, getToken]);

  const loadCategories = useCallback(async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/phrasebook/categories`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  }, [getToken]);

  useEffect(() => {
    loadPhrases();
    loadCategories();
  }, [loadPhrases, loadCategories]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = () => setOpenMenuId(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const playPhrase = async (text: string) => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/chat/tts?text=${encodeURIComponent(text)}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
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
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/phrasebook/phrases/${phraseId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setPhrases(prev => prev.filter(p => p.id !== phraseId));
        setTotalCount(prev => prev - 1);
        setShowLimitWarning(false);
        loadCategories();
        window.dispatchEvent(new Event('phraseAdded'));
      }
    } catch (error) {
      console.error('Failed to delete phrase:', error);
    }
  };

  const movePhrase = async (phraseId: string, targetCategory: string) => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/phrasebook/phrases/${phraseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ category: targetCategory }),
      });
      if (response.ok) {
        loadPhrases();
        loadCategories();
        window.dispatchEvent(new Event('phraseAdded'));
      }
    } catch (error) {
      console.error('Failed to move phrase:', error);
    }
    setShowMoveModal(false);
    setActionPhrase(null);
    setNewCategoryName('');
  };

  const copyPhrase = async (phraseId: string, targetCategory: string) => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/phrasebook/phrases/${phraseId}/copy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ targetCategory }),
      });
      if (response.ok) {
        loadPhrases();
        loadCategories();
        setTotalCount(prev => prev + 1);
        window.dispatchEvent(new Event('phraseAdded'));
      }
    } catch (error) {
      console.error('Failed to copy phrase:', error);
    }
    setShowCopyModal(false);
    setActionPhrase(null);
    setNewCategoryName('');
  };

  const updatePhrase = async () => {
    if (!actionPhrase) return;
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/phrasebook/phrases/${actionPhrase.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ german: editText, context: editContext }),
      });
      if (response.ok) {
        loadPhrases();
      }
    } catch (error) {
      console.error('Failed to update phrase:', error);
    }
    setShowEditModal(false);
    setActionPhrase(null);
  };

  const filteredPhrases = phrases.filter(phrase =>
    phrase.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (phrase.context && phrase.context.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeCategory = categoryParam && categoryParam !== 'all' ? categoryParam : null;

  // Get all unique category names including defaults
  const allCategoryNames = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...categories.map(c => c.name)])
  );

  return (
    <>
      <div className="mx-auto max-w-4xl">
        {/* Header section */}
        <div className="flex flex-col gap-4">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2">
            <a className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary" href="/dashboard">Home</a>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-sm font-medium text-text-light dark:text-text-dark">Redemittel</span>
            {activeCategory && (
              <>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                <span className="text-sm font-medium text-primary capitalize">{activeCategory}</span>
              </>
            )}
          </div>

          {/* Page Heading */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-text-light dark:text-text-dark">
                {activeCategory || 'Alle Redemittel'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Deine gespeicherten Ausdrücke und Vokabeln
                <span className="ml-2 text-sm font-medium">
                  ({totalCount}/{MAX_PHRASES})
                </span>
              </p>
            </div>
            <button
              onClick={() => router.push('/chat')}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              Üben im Chat
            </button>
          </div>

          {/* Limit Warning Banner */}
          {showLimitWarning && (
            <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-200">
              <span className="material-symbols-outlined text-xl">warning</span>
              <div>
                <p className="font-semibold text-sm">Limit erreicht!</p>
                <p className="text-xs">Du hast {totalCount} von {MAX_PHRASES} Redemitteln. Bitte lösche einige, um Platz für neue zu schaffen.</p>
              </div>
              <button onClick={() => setShowLimitWarning(false)} className="ml-auto p-1 hover:bg-amber-100 dark:hover:bg-amber-800 rounded">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          )}

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

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push('/phrases?category=all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!activeCategory
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              Alle
            </button>
            {allCategoryNames.map(catName => {
              const cat = categories.find(c => c.name === catName);
              const count = cat?.phraseCount ?? 0;
              return (
                <button
                  key={catName}
                  onClick={() => router.push(`/phrases?category=${encodeURIComponent(catName)}`)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === catName
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  {catName} {count > 0 && <span className="ml-1 opacity-70">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isLoading ? 'Lade...' : `${filteredPhrases.length} Ausdrücke`}
            </p>
          </div>

          {/* Phrase List */}
          <div className="grid grid-cols-1 gap-3">
            {isLoading ? (
              <div className="text-center py-12 text-gray-400">
                <span className="material-symbols-outlined text-4xl animate-spin mb-2">progress_activity</span>
                <p>Lade Daten...</p>
              </div>
            ) : filteredPhrases.length === 0 ? (
              <div className="text-center py-16 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
                <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600 mb-3">bookmark_border</span>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {activeCategory
                    ? `Keine Redemittel in "${activeCategory}".`
                    : 'Noch keine Redemittel gespeichert.'}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                  Markiere Text im Chat, um Redemittel hier zu speichern.
                </p>
                <button
                  onClick={() => router.push('/chat')}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  Zum Chat
                </button>
              </div>
            ) : (
              filteredPhrases.map(phrase => (
                <div
                  key={phrase.id}
                  className="group p-4 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark flex justify-between items-start shadow-sm hover:shadow-md transition-all hover:border-primary/30"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold leading-snug">{phrase.german}</h3>
                    {phrase.context && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">{phrase.context}</p>
                    )}
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent">
                      {phrase.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 ml-3 shrink-0">
                    {/* Play */}
                    <button
                      onClick={() => playPhrase(phrase.german)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-primary transition-colors"
                      title="Anhören"
                    >
                      <span className="material-symbols-outlined text-xl">volume_up</span>
                    </button>

                    {/* More actions dropdown */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === phrase.id ? null : phrase.id);
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors"
                        title="Weitere Aktionen"
                      >
                        <span className="material-symbols-outlined text-xl">more_vert</span>
                      </button>

                      {openMenuId === phrase.id && (
                        <div
                          className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-20 py-1 animate-in fade-in zoom-in-95 duration-150"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              setActionPhrase(phrase);
                              setEditText(phrase.german);
                              setEditContext(phrase.context || '');
                              setShowEditModal(true);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                          >
                            <span className="material-symbols-outlined text-base">edit</span>
                            Bearbeiten
                          </button>
                          <button
                            onClick={() => {
                              setActionPhrase(phrase);
                              setShowMoveModal(true);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                          >
                            <span className="material-symbols-outlined text-base">drive_file_move</span>
                            Verschieben
                          </button>
                          <button
                            onClick={() => {
                              setActionPhrase(phrase);
                              setShowCopyModal(true);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                          >
                            <span className="material-symbols-outlined text-base">content_copy</span>
                            Kopieren nach
                          </button>
                          <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              if (confirm('Möchtest du dieses Redemittel wirklich löschen?')) {
                                deletePhrase(phrase.id);
                              }
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 text-left transition-colors"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                            Löschen
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* === MODALS === */}

      {/* Move Modal */}
      {showMoveModal && actionPhrase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { setShowMoveModal(false); setActionPhrase(null); setNewCategoryName(''); }}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-1">Verschieben nach</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate">
              &quot;{actionPhrase.german.substring(0, 60)}{actionPhrase.german.length > 60 ? '...' : ''}&quot;
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {allCategoryNames
                .filter(name => name !== actionPhrase.category)
                .map(catName => (
                  <button
                    key={catName}
                    onClick={() => movePhrase(actionPhrase.id, catName)}
                    className="w-full p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-base text-primary">folder</span>
                    {catName}
                  </button>
                ))}
              {/* New category input */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Neue Kategorie..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                />
                <button
                  onClick={() => {
                    if (newCategoryName.trim()) movePhrase(actionPhrase.id, newCategoryName.trim());
                  }}
                  disabled={!newCategoryName.trim()}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
            <button
              onClick={() => { setShowMoveModal(false); setActionPhrase(null); setNewCategoryName(''); }}
              className="mt-4 w-full p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Copy Modal */}
      {showCopyModal && actionPhrase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { setShowCopyModal(false); setActionPhrase(null); setNewCategoryName(''); }}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-1">Kopieren nach</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate">
              &quot;{actionPhrase.german.substring(0, 60)}{actionPhrase.german.length > 60 ? '...' : ''}&quot;
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {allCategoryNames
                .filter(name => name !== actionPhrase.category)
                .map(catName => (
                  <button
                    key={catName}
                    onClick={() => copyPhrase(actionPhrase.id, catName)}
                    className="w-full p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-base text-primary">content_copy</span>
                    {catName}
                  </button>
                ))}
              {/* New category input */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Neue Kategorie..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                />
                <button
                  onClick={() => {
                    if (newCategoryName.trim()) copyPhrase(actionPhrase.id, newCategoryName.trim());
                  }}
                  disabled={!newCategoryName.trim()}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
            <button
              onClick={() => { setShowCopyModal(false); setActionPhrase(null); setNewCategoryName(''); }}
              className="mt-4 w-full p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && actionPhrase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { setShowEditModal(false); setActionPhrase(null); }}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Redemittel bearbeiten</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text</label>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Anmerkung / Kontext
                </label>
                <textarea
                  value={editContext}
                  onChange={(e) => setEditContext(e.target.value)}
                  rows={2}
                  placeholder="z.B. Formell, für E-Mails..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowEditModal(false); setActionPhrase(null); }}
                className="flex-1 p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={updatePhrase}
                className="flex-1 p-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}