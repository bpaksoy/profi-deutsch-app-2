'use client';
import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '../../context/AuthContext';
import { AssistantModal } from '../../components/AssistantModal';
import { AssistantOrb } from '../../components/AssistantOrb';
import { VoiceAssistant } from '../../components/VoiceAssistant';
import { PhrasebookCard } from '../../components/PhrasebookCard';
import { ProgressDashboard } from '../../components/ProgressDashboard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Gerade eben';
  if (diffMins < 60) return `vor ${diffMins} Min.`;
  if (diffHours < 24) return diffHours === 1 ? 'vor einer Stunde' : `vor ${diffHours} Stunden`;
  if (diffDays === 1) return 'Gestern';
  if (diffDays < 7) return `vor ${diffDays} Tagen`;
  if (diffDays < 30) return `vor ${Math.floor(diffDays / 7)} Wochen`;
  return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' });
}

export default function DashboardPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [recentTopics, setRecentTopics] = useState<{ id: string; topic: string; createdAt: string }[]>([]);
  const [showAllTopics, setShowAllTopics] = useState(false);

  useEffect(() => {
    const loadRecentTopics = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API_BASE_URL}/chat/conversations`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setRecentTopics(
            (Array.isArray(data) ? data : []).slice(0, 5).map((c: any) => ({
              id: c.id,
              topic: c.topic || 'Gespräch',
              createdAt: c.createdAt
            }))
          );
        }
      } catch (e) {
        console.error('Failed to load recent topics:', e);
      }
    };
    loadRecentTopics();
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="layout-content-container flex flex-col gap-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-1xl lg:text-4xl font-bold leading-tight tracking-[-0.033em]">
                  Hallo {user?.firstName || 'Entdecker'}!
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  Übe freies Sprechen und erhalte Feedback.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-8">
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6 lg:p-8 flex flex-col items-center text-center gap-6 border border-border-light dark:border-border-dark">
                  <button
                    onClick={() => setIsVoiceAssistantOpen(true)}
                    className="flex w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-white gap-3 text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                  >
                    <span className="material-symbols-outlined text-2xl">mic</span>
                    <span className="truncate">Übung starten</span>
                  </button>
                </div>

                <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pt-5">Meine Redemittel</h2>
                <PhrasebookCard />
              </div>

              <div className="lg:col-span-1 flex flex-col gap-8">
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">Lern-Fortschritt</h2>
                <ProgressDashboard apiBaseUrl={API_BASE_URL} />

                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6 border border-border-light dark:border-border-dark">
                  <h3 className="text-lg font-bold mb-4">Letzte Themen</h3>
                  {recentTopics.length === 0 ? (
                    <p className="text-sm text-gray-400">Noch keine Gespräche — starte dein erstes Übungsgespräch!</p>
                  ) : (
                    <>
                      <ul className="space-y-4">
                        {(showAllTopics ? recentTopics : recentTopics.slice(0, 3)).map((topic) => (
                          <li key={topic.id} className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-accent/30 text-primary">
                              <span className="material-symbols-outlined">voice_selection</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold truncate">{topic.topic}</p>
                              <p className="text-sm text-gray-400">{formatRelativeDate(topic.createdAt)}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {recentTopics.length > 3 && (
                        <button
                          onClick={() => setShowAllTopics(!showAllTopics)}
                          className="w-full text-center pt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          {showAllTopics ? 'Weniger anzeigen' : `Alle ${recentTopics.length} anzeigen`}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {isVoiceAssistantOpen && (
        <VoiceAssistant onClose={() => setIsVoiceAssistantOpen(false)} />
      )}
      <AssistantOrb onClick={() => setIsModalOpen(true)} isModalOpen={isModalOpen} />
      {isModalOpen && <AssistantModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}