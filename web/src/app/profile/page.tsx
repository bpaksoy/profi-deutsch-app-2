// web/src/app/profile/page.tsx
import React from 'react';
// import { SpeakingPracticeCard } from './components/SpeakingPracticeCard';
// import { PhrasebookCard } from './components/PhrasebookCard';
// import { ProgressCard } from './components/ProgressCard';
// import { RecentActivityCard } from './components/RecentActivityCard';

// This is the ProfilePage content component.
export default function ProfilePage() {
  const username = "Alex"; // Placeholder for user name

  return (
    // This div matches the flex-1 container mx-auto structure from your HTML
    <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="layout-content-container flex flex-col gap-8">

        {/* Page Heading (Matches the Dashboard heading) */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">Guten Tag, {username}!</p>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Let's practice your professional German speaking skills.</p>
          </div>
        </div>

        {/* Main Grid: lg:grid-cols-3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (Main Content) - lg:col-span-2 */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* <SpeakingPracticeCard /> */}

            {/* SectionHeader for Phrasebook */}
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pt-5">Business-Wortschatz</h2>
            
            {/* <PhrasebookCard /> */}
          </div>

          {/* Right Column (Progress) - lg:col-span-1 */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* SectionHeader for Progress */}
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">Dein Fortschritt</h2>
            
            {/* <ProgressCard />
            <RecentActivityCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// NOTE: You must create the components directory and the four components inside it.