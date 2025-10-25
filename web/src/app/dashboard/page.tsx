import React from 'react';

export const metadata = {
  title: 'ProfiDeutsch AI Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="layout-content-container flex flex-col gap-8">
            {/* PageHeading */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">Guten Tag, Kathrin!</p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Let's practice your professional German speaking skills.</p>
              </div>
            </div>
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column (Main Content) */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* AI Practice Card */}
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6 lg:p-8 flex flex-col items-center text-center gap-6 border border-border-light dark:border-border-dark">
                  <div className="flex flex-col gap-2 items-center">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">Sprechübung</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">Choose a scenario and start your conversation. The AI will provide feedback on your fluency, grammar, and pronunciation.</p>
                  </div>
                  {/* Scenario Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
                    <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg bg-background-light dark:bg-background-dark border-2 border-primary ring-2 ring-primary/20 text-primary font-semibold transition-all">
                      <span className="material-symbols-outlined text-3xl">groups</span>
                      <span>Team Meeting</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg bg-background-light dark:bg-background-dark hover:border-primary border-2 border-transparent transition-all">
                      <span className="material-symbols-outlined text-3xl">call</span>
                      <span>Client Call</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg bg-background-light dark:bg-background-dark hover:border-primary border-2 border-transparent transition-all">
                      <span className="material-symbols-outlined text-3xl">work</span>
                      <span>Job Interview</span>
                    </button>
                  </div>
                  {/* SingleButton CTA */}
                  <button className="flex w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-white gap-3 text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined text-2xl">mic</span>
                    <span className="truncate">Übung starten</span>
                  </button>
                </div>
                {/* SectionHeader for Phrasebook */}
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pt-5">Business-Wortschatz</h2>
                {/* Phrasebook Card */}
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary dark:bg-accent dark:text-primary">Meetings</button>
                        <button className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">Emails</button>
                        <button className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">Phone Calls</button>
                      </div>
                      <div className="relative">
                        <input className="w-full sm:w-auto pl-10 pr-4 py-2 rounded-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="Search phrases..." type="text"/>
                      </div>
                    </div>
                    <ul className="mt-6 space-y-4">
                      <li className="flex justify-between items-center p-4 rounded-lg bg-background-light dark:bg-background-dark">
                        <p className="font-medium">Können wir die Details besprechen?</p>
                        <div className="flex items-center gap-3">
                          <button aria-label="Listen to phrase" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">volume_up</span></button>
                          <button aria-label="Practice with AI" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">mic</span></button>
                        </div>
                      </li>
                      <li className="flex justify-between items-center p-4 rounded-lg bg-background-light dark:bg-background-dark">
                        <p className="font-medium">Ich stimme Ihrem Vorschlag zu.</p>
                        <div className="flex items-center gap-3">
                          <button aria-label="Listen to phrase" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">volume_up</span></button>
                          <button aria-label="Practice with AI" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">mic</span></button>
                        </div>
                      </li>
                      <li className="flex justify-between items-center p-4 rounded-lg bg-background-light dark:bg-background-dark">
                        <p className="font-medium">Lassen Sie uns einen Termin vereinbaren.</p>
                        <div className="flex items-center gap-3">
                          <button aria-label="Listen to phrase" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">volume_up</span></button>
                          <button aria-label="Practice with AI" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">mic</span></button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Right Column (Progress) */}
              <div className="lg:col-span-1 flex flex-col gap-8">
                {/* SectionHeader for Progress */}
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">Dein Fortschritt</h2>
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
                        <p className="text-xs text-gray-500">B1 Fluency</p>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">You are 5% away from your goal of B2 level!</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-background-light dark:bg-background-dark">
                      <p className="text-sm font-medium leading-normal text-gray-600 dark:text-gray-400">Total Practice Time</p>
                      <div className="flex justify-between items-baseline">
                        <p className="tracking-light text-2xl font-bold leading-tight">12h 45m</p>
                        <p className="text-green-600 text-sm font-medium leading-normal">+12% this week</p>
                      </div>
                    </div>
                    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-4 bg-background-light dark:bg-background-dark">
                      <p className="text-sm font-medium leading-normal text-gray-600 dark:text-gray-400">Words Mastered</p>
                      <div className="flex justify-between items-baseline">
                        <p className="tracking-light text-2xl font-bold leading-tight">258</p>
                        <p className="text-green-600 text-sm font-medium leading-normal">+8% this week</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Recent Activity Card */}
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6 border border-border-light dark:border-border-dark">
                  <h3 className="text-lg font-bold mb-4">Letzte Übungen</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">quiz</span>
                      </div>
                      <div>
                        <p className="font-semibold">Practiced 'Job Interview'</p>
                        <p className="text-sm text-gray-500">Yesterday</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">celebration</span>
                      </div>
                      <div>
                        <p className="font-semibold">Achievement: 10 Hours Practiced</p>
                        <p className="text-sm text-gray-500">2 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">groups</span>
                      </div>
                      <div>
                        <p className="font-semibold">Practiced 'Team Meeting'</p>
                        <p className="text-sm text-gray-500">4 days ago</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}