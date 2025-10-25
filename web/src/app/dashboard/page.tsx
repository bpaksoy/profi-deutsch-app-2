import React from 'react';

export const metadata = {
  title: 'ProfiDeutsch AI Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* TopNavBar */}
        <header className="sticky top-0 z-50 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between whitespace-nowrap h-16">
              <div className="flex items-center gap-4 text-primary">
                <div className="size-6 text-primary">
                  {/* Original SVG */}
                  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"></path>
                    <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
                  </svg>
                </div>
                <h2 className="text-primary text-xl font-bold leading-tight tracking-[-0.015em]">ProfiDeutsch AI</h2>
              </div>
              <div className="flex flex-1 justify-end items-center gap-6">
                <div className="hidden sm:flex items-center gap-6">
                  <a className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-accent transition-colors" href="#">Dashboard</a>
                  <a className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-accent transition-colors" href="#">Profile</a>
                  <a className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-accent transition-colors" href="#">Settings</a>
                </div>
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary" data-alt="User's profile picture" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvX38Y-qL9Gh9IAJbemO9swZwkQqPlmTIRMYELCU7FgtxKDHsrlbSRdHvXoIoX50_rmgKBO-eK3TKSVLGOWKALuXay7a-6ZYtqPDQk3VU4B1rnL6jvuQnCrMJA8CByo3aHgp0oABGMSv30DWCdzGNP4Z_AdZWuCJ1TSw_4ogi045TBcboWTPI79N3-JrXicBPa5DT2YXipQE5XS8bTsdIkmu6BvtUCKsjReWRDZpo8Vq24iayebT62ODfmyoByKkGPjXtkgcRgbU6E")' }}></div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="layout-content-container flex flex-col gap-8">
            {/* PageHeading */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">Guten Tag, Alex!</p>
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
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
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