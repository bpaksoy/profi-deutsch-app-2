'use client';
import React, { useState } from 'react';
import { AssistantModal } from '../../components/AssistantModal';
import { AssistantOrb } from '../../components/AssistantOrb';
import { VoiceAssistant } from '../../components/VoiceAssistant';
import { PhrasebookCard } from '../../components/PhrasebookCard';

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
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pt-5">Redemittel</h2>
                {/* Phrasebook Card */}
                <PhrasebookCard />
              </div>
              {/* Right Column (Progress) */}
              <div className="lg:col-span-1 flex flex-col gap-8">
                {/* SectionHeader for Progress */}
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">Lern-Fortschritt</h2>
                {/* Progress Stats Card */}
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6 border border-border-light dark:border-border-dark flex flex-col gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative size-40">
                      <svg className="size-full" height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg">
                        <circle className="stroke-current text-gray-200 dark:text-gray-700" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                        <circle className="stroke-current text-accent" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="35" strokeLinecap="round" strokeWidth="3"></circle>
                      </svg>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-3xl font-bold">65%</span>
                        <p className="text-xs text-gray-500">Übezeit diese Woche</p>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">Du kannst noch 50 min üben. </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-background-light dark:bg-background-dark">
                      <p className="text-sm font-medium leading-normal text-gray-600 dark:text-gray-400">Übezeit gesamt</p>
                      <div className="flex justify-between items-baseline">
                        <p className="tracking-light text-2xl font-bold leading-tight">12 Std 45 min</p>
                        <p className="text-primary text-sm font-medium leading-normal">+12% diese Woche</p>
                      </div>
                    </div>
                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-background-light dark:bg-background-dark">
                      <p className="text-sm font-medium leading-normal text-gray-600 dark:text-gray-400">Aussprache</p>
                      <div className="flex justify-between items-baseline">
                        <p className="tracking-light text-2xl font-bold leading-tight">65 von 100</p>
                        <p className="text-primary text-sm font-medium leading-normal">+8% diese Woche</p>
                      </div>
                    </div>
                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-background-light dark:bg-background-dark">
                      <p className="text-sm font-medium leading-normal text-gray-600 dark:text-gray-400">Wortschatz</p>
                      <div className="flex justify-between items-baseline">
                        <p className="tracking-light text-2xl font-bold leading-tight">80 von 100</p>
                        <p className="text-primary text-sm font-medium leading-normal">+10% diese Woche</p>
                      </div>
                    </div>
                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-background-light dark:bg-background-dark">
                      <p className="text-sm font-medium leading-normal text-gray-600 dark:text-gray-400">Grammatik</p>
                      <div className="flex justify-between items-baseline">
                        <p className="tracking-light text-2xl font-bold leading-tight">34 von 100</p>
                        <p className="text-primary text-sm font-medium leading-normal">-5% diese Woche</p>
                      </div>
                    </div>
                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-background-light dark:bg-background-dark">
                      <p className="text-sm font-medium leading-normal text-gray-600 dark:text-gray-400">Strategien</p>
                      <div className="flex justify-between items-baseline">
                        <p className="tracking-light text-2xl font-bold leading-tight">98 von 100</p>
                        <p className="text-primary text-sm font-medium leading-normal">+0% diese Woche</p>
                      </div>
                    </div>
                  </div>
                </div>
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