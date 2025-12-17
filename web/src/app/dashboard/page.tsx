'use client';
import React, { useState } from 'react';
import { AssistantModal } from '../../components/AssistantModal';
import { AssistantOrb } from '../../components/AssistantOrb';
import { VoiceAssistant } from '../../components/VoiceAssistant';
import { PhrasebookCard } from '../../components/PhrasebookCard';
import { ProgressDashboard } from '../../components/ProgressDashboard';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="layout-content-container flex flex-col gap-8">
            {/* PageHeading */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-1xl lg:text-4xl font-bold leading-tight tracking-[-0.033em]">Hallo Kathrin!</p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Übe freies Sprechen und erhalte Feedback.</p>
              </div>
            </div>
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column (Main Content) */}
              {/*   
            <AssistantOrb 
                onClick={() => setIsModalOpen(true)}
                isModalOpen={isModalOpen}
            /> */}

              {/* Modal */}
              {isModalOpen && <AssistantModal onClose={() => setIsModalOpen(false)} />}
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* AI Practice Card */}
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6 lg:p-8 flex flex-col items-center text-center gap-6 border border-border-light dark:border-border-dark">

                  {/* SingleButton CTA */}
                  {/* SingleButton CTA */}
                  <button
                    onClick={() => setIsVoiceAssistantOpen(true)}
                    className="flex w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-white gap-3 text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                  >
                    <span className="material-symbols-outlined text-2xl">mic</span>
                    <span className="truncate">Übung starten</span>
                  </button>
                </div>
                {/* SectionHeader for Phrasebook */}
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pt-5">Meine Redemittel</h2>
                {/* Phrasebook Card */}
                <PhrasebookCard />
              </div>
              {/* Right Column (Progress) */}
              <div className="lg:col-span-1 flex flex-col gap-8">
                {/* SectionHeader for Progress */}
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">Lern-Fortschritt</h2>
                {/* Progress Stats Card */}
                {/* Progress Stats Card */}
                <ProgressDashboard apiBaseUrl="http://localhost:8000" />
                {/* Recent Activity Card */}
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6 border border-border-light dark:border-border-dark">
                  <h3 className="text-lg font-bold mb-4">Letzte Themen</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-accent/30 text-primary">
                        <span className="material-symbols-outlined">voice_selection</span>
                      </div>
                      <div>
                        <p className="font-semibold">Vorstellungsgespräch</p>
                        <p className="text-sm text-gray-500">Gestern</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-accent/30 text-primary">
                        <span className="material-symbols-outlined">voice_selection</span>
                      </div>
                      <div>
                        <p className="font-semibold">Führerschein beantragen</p>
                        <p className="text-sm text-gray-500">vor drei Tagen</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-accent/30 text-primary">
                        <span className="material-symbols-outlined">voice_selection</span>
                      </div>
                      <div>
                        <p className="font-semibold">Glühbirne austauschen</p>
                        <p className="text-sm text-gray-500">vor vier Tagen</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Voice Assistant Modal */}
      {isVoiceAssistantOpen && (
        <VoiceAssistant onClose={() => setIsVoiceAssistantOpen(false)} />
      )}
    </div>
  );
}