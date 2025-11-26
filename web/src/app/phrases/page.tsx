import React from 'react';
// Assuming PhraseCard.tsx is created for the individual card
// import { PhraseCard } from '@/components/PhraseCard'; // Adjust path if needed
// import { PhraseSidebar } from '@/components/ui/PhraseSidebar';

// Example Phrase Data (replace with actual data fetching)
const phrases = [
  // ... (Data for Phrase Card 1, 2, 3, 4)
];

// Note: This page needs to be wrapped by the CustomLayout to render the TopNav
// and the main flex container.

// This component will contain the content that goes into the <main> tag
export default function PhrasesPage() {
  return (
    // Note: The sidebar will be rendered next to this main content via CustomLayout
    <>
      <div className="mx-auto max-w-4xl">
        {/* Header section */}
        <div className="flex flex-col gap-4">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2">
            <a className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary" href="#">Home</a>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <a className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary" href="#">Notizen</a>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-sm font-medium text-text-light dark:text-text-dark">Alle</span>
          </div>

          {/* PageHeading */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-text-light dark:text-text-dark">Gespeicherte Redemittel</h1>
              <p className="text-gray-500 dark:text-gray-400">Deine Notizen zum Nachsprechen</p>
            </div>
          </div>

          {/* SearchBar */}
          <div className="relative w-full">
            <input 
              className="w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-2.5 pl-10 pr-4 text-base text-text-light dark:text-text-dark placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
              placeholder="Suche hier nach Begriffen, z.B. Freizeit, Büro" 
              type="Suche"
            />
          </div>
        </div>

        {/* Filter and Content Area */}
        <div className="mt-8 flex flex-col gap-6">
          {/* Filter Controls */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Kategorien anzeigen (124)</p>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300" htmlFor="sort">Sortieren:</label>
              <select 
                id="sort"
                className="rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-1.5 pl-2 pr-8 text-sm text-text-light dark:text-text-dark focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
              >
                <option>Häufig verwendet</option>
                <option>Zuletzt aktualisiert</option>
                <option>Alphabetisch</option>
              </select>
            </div>
          </div>
          
          {/* Phrase Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            {/* The individual PhraseCard components would be rendered here */}
            {/* For now, this is where PhraseCard would be mapped over data */}
            {/* {phrases.map(phrase => <PhraseCard key={phrase.id} {...phrase} />)} */}

            {/* Placeholder for Phrase Cards (You should create PhraseCard.tsx) */}
            <div className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark">
                Arbeitsplatz
            </div>
            <div className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark">
                Freizeit und Sport
            </div>
            <div className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark">
                Anträge stellen
            </div>
          </div>
        </div>
      </div>
    </>
  );
}