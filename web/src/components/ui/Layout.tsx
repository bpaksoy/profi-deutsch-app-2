'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { Button } from './Button';
import { PhraseSidebar } from './PhraseSidebar';
import { Footer } from './Footer';
import { useUser, useAuth } from '../../context/AuthContext';

const LogoutModal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => createPortal(
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onCancel}>
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mx-4 max-w-sm w-full" onClick={e => e.stopPropagation()}>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-3 rounded-full bg-red-50 dark:bg-red-900/20">
          <span className="material-symbols-outlined text-3xl text-red-500">logout</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Abmelden?</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Möchtest du dich wirklich abmelden?</p>
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Abmelden
          </button>
        </div>
      </div>
    </div>
  </div>,
  document.body
);

interface LayoutProps {
  children: React.ReactNode;
  activeNav?: 'home' | 'phrases' | 'favorites' | 'internships' | 'dashboard' | 'chat' | 'settings' | 'history' | 'scenarios' | 'tipps';
}

const TopNavBar: React.FC<{ activeNav?: string }> = ({ activeNav }) => {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-border-light dark:border-border-dark bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between whitespace-nowrap px-4 md:px-8 lg:px-10">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-6 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"></path>
              <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <Link href="/" className="text-xl font-bold leading-tight tracking-[-0.015em] text-primary">Sigsag</Link>
        </div>
        <nav className="hidden items-center gap-6 sm:flex">
          <Link href="/dashboard" className={twMerge("text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-accent transition-colors", activeNav === 'dashboard' && 'text-primary dark:text-accent')}>Start</Link>
          <Link href="/phrases" className={twMerge("text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-accent transition-colors", activeNav === 'phrases' && 'text-primary dark:text-accent')}>Meine Redemittel</Link>
          <Link href="/chat" className={twMerge("text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-accent transition-colors", activeNav === 'chat' && 'text-primary dark:text-accent')}>Chat</Link>
          <Link href="/tipps" className={twMerge("text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-accent transition-colors", activeNav === 'tipps' && 'text-primary dark:text-accent')}>Tipps</Link>
          <Link href="/settings" className={twMerge("text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-accent transition-colors", activeNav === 'settings' && 'text-primary dark:text-accent')}>Profil</Link>
        </nav>
        <div className="flex items-center gap-3">
          {isLoaded && isSignedIn ? (
            <div className="hidden sm:flex items-center gap-3">
               {user?.imageUrl ? (
                 <img src={user.imageUrl} className="size-8 rounded-full border border-border-light shadow-sm" alt="Profil" />
               ) : (
                 <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{user?.firstName?.[0] || 'U'}</div>
               )}
               <button onClick={() => setShowLogoutModal(true)} className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors">Abmelden</button>
            </div>
          ) : isLoaded ? (
            <Link href="/sign-in" className="text-sm font-medium text-primary hover:underline px-4 py-2 bg-primary/10 rounded-full">Anmelden</Link>
          ) : null}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-md text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="sm:hidden border-t border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-4 py-3 flex flex-col gap-1">
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className={twMerge("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-white/10", activeNav === 'dashboard' && 'bg-primary/10 text-primary')}>
            <span className="material-symbols-outlined text-lg">dashboard</span>Start
          </Link>
          <Link href="/chat" onClick={() => setMobileMenuOpen(false)} className={twMerge("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-white/10", activeNav === 'chat' && 'bg-primary/10 text-primary')}>
            <span className="material-symbols-outlined text-lg">chat</span>Chat
          </Link>
          <Link href="/phrases" onClick={() => setMobileMenuOpen(false)} className={twMerge("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-white/10", activeNav === 'phrases' && 'bg-primary/10 text-primary')}>
            <span className="material-symbols-outlined text-lg">bookmark</span>Redemittel
          </Link>
          <Link href="/tipps" onClick={() => setMobileMenuOpen(false)} className={twMerge("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-white/10", activeNav === 'tipps' && 'bg-primary/10 text-primary')}>
            <span className="material-symbols-outlined text-lg">lightbulb</span>Tipps
          </Link>
          <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className={twMerge("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-white/10", activeNav === 'settings' && 'bg-primary/10 text-primary')}>
            <span className="material-symbols-outlined text-lg">person</span>Profil
          </Link>
          {isLoaded && isSignedIn && (
            <button
              onClick={() => { setMobileMenuOpen(false); setShowLogoutModal(true); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-1"
            >
              <span className="material-symbols-outlined text-lg">logout</span>Abmelden
            </button>
          )}
        </nav>
      )}

      {showLogoutModal && <LogoutModal onConfirm={() => signOut()} onCancel={() => setShowLogoutModal(false)} />}
    </header>
  );
}

const Sidebar: React.FC<{ activeNav?: string; user: any }> = ({ activeNav, user }) => {
  const { isSignedIn, signOut } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  return (
    <>
      <aside className="flex-col bg-background-light dark:bg-background-dark border-r border-border-light dark:border-border-dark w-64 p-4 shrink-0 hidden md:flex">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center p-2 rounded-xl bg-accent/5">
              {isSignedIn ? (
                <div className="flex gap-3 items-center">
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} className="size-10 rounded-full border border-white dark:border-gray-700 shadow-sm" alt="User" />
                  ) : (
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{user?.firstName?.[0] || 'U'}</div>
                  )}
                  <div className="flex flex-col overflow-hidden">
                    <h1 className="text-text-light dark:text-text-dark text-sm font-bold truncate">
                      {user?.firstName || 'Entdecker'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">Konto aktiv</p>
                  </div>
                </div>
              ) : (
                <Link href="/sign-in" className="text-primary text-sm font-bold">Jetzt anmelden</Link>
              )}
            </div>
            
            <div className="flex flex-col gap-2 mt-4">
              <Link
                href="/dashboard"
                className={twMerge(
                  "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer",
                  activeNav === "dashboard" && "bg-primary/10 dark:bg-primary/20 text-primary dark:text-white"
                )}
              >
                <span className="material-symbols-outlined text-base">dashboard</span>
                <p className="text-sm font-medium leading-normal">Dashboard</p>
              </Link>
              <Link
                href="/chat"
                className={twMerge(
                  "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer",
                  activeNav === "chat" && "bg-primary/10 dark:bg-primary/20 text-primary dark:text-white"
                )}
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <p className="text-sm font-medium leading-normal">Gespräche</p>
              </Link>
               <Link
                href="/phrases"
                className={twMerge(
                  "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer",
                  activeNav === "phrases" && "bg-primary/10 dark:bg-primary/20 text-primary dark:text-white"
                )}
              >
                <span className="material-symbols-outlined text-base">bookmark</span>
                <p className="text-sm font-medium leading-normal">Redemittel</p>
              </Link>
            </div>
          </div>
          
          {isSignedIn && (
            <button 
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <p className="text-sm font-medium">Abmelden</p>
            </button>
          )}
        </div>
      </aside>
      {showLogoutModal && <LogoutModal onConfirm={() => signOut()} onCancel={() => setShowLogoutModal(false)} />}
    </>
  );
};

export const CustomLayout: React.FC<LayoutProps> = ({ children, activeNav }) => {
  const { user } = useUser();
  const showPhraseSidebar = activeNav === 'phrases';

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <TopNavBar activeNav={activeNav} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar activeNav={activeNav} user={user} />
        {showPhraseSidebar && <PhraseSidebar />}
        <main className="flex-grow overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};