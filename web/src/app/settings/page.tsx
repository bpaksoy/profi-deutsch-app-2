// web/src/app/settings/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useUser, useClerk, useAuth } from '../../context/AuthContext';
import { twMerge } from 'tailwind-merge';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

type ThemeMode = 'light' | 'dark' | 'system';
type VoiceOption = 'male' | 'female' | 'neutral';

const VOICE_MAP: Record<VoiceOption, string> = {
  female: 'de-DE-KatjaNeural',
  male: 'de-DE-ConradNeural',
  neutral: 'de-DE-AmalaNeural',
};

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Profile form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Preferences state
  const [voiceOption, setVoiceOption] = useState<VoiceOption>('female');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [prefsSaving, setPrefsSaving] = useState(false);
  const [prefsSaved, setPrefsSaved] = useState(false);

  // Danger zone
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Active sidebar section
  const [activeSection, setActiveSection] = useState<'profile' | 'preferences' | 'subscription' | 'danger-zone'>('profile');

  // Subscription state
  const [subStatus, setSubStatus] = useState<{ planTier: string; isActive: boolean; stripeCurrentPeriodEnd: string } | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  // Load user data from Clerk
  useEffect(() => {
    if (isLoaded && user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [isLoaded, user]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedVoice = localStorage.getItem('sigsag-voice') as VoiceOption | null;
    const savedEmails = localStorage.getItem('sigsag-email-notifications');
    const savedPush = localStorage.getItem('sigsag-push-notifications');
    const savedTheme = localStorage.getItem('sigsag-theme') as ThemeMode | null;

    if (savedVoice) setVoiceOption(savedVoice);
    if (savedEmails !== null) setEmailNotifications(savedEmails === 'true');
    if (savedPush !== null) setPushNotifications(savedPush === 'true');
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  // Fetch subscription status
  useEffect(() => {
    if (isLoaded && user) {
      const fetchStatus = async () => {
        try {
          const token = await getToken();
          const response = await fetch(`${API_BASE_URL}/payments/status`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setSubStatus(data);
          }
        } catch (e) {
          console.error("Failed to load sub status", e);
        }
      };
      fetchStatus();
    }
  }, [isLoaded, user, getToken]);

  // Intersection Observer for sidebar highlighting
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as any);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const applyTheme = useCallback((mode: ThemeMode) => {
    const html = document.documentElement;
    if (mode === 'dark') {
      html.classList.remove('light');
      html.classList.add('dark');
    } else if (mode === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.remove('light', 'dark');
      html.classList.add(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // ---- Profile Save ----
  const handleProfileSave = async () => {
    if (!user) return;
    setProfileSaving(true);
    try {
      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      setProfileSaved(true);
      showToast('Profil erfolgreich gespeichert!');
      setTimeout(() => setProfileSaved(false), 2000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      showToast('Fehler beim Speichern des Profils.', 'error');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleProfileCancel = () => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  };

  // ---- Preferences Save ----
  const handlePrefsSave = () => {
    setPrefsSaving(true);

    // Save to localStorage
    localStorage.setItem('sigsag-voice', voiceOption);
    localStorage.setItem('sigsag-email-notifications', String(emailNotifications));
    localStorage.setItem('sigsag-push-notifications', String(pushNotifications));
    localStorage.setItem('sigsag-theme', theme);

    // Apply theme immediately
    applyTheme(theme);

    // Dispatch event so other components can react to voice change
    window.dispatchEvent(new CustomEvent('voiceChanged', { detail: { voice: VOICE_MAP[voiceOption] } }));

    setTimeout(() => {
      setPrefsSaving(false);
      setPrefsSaved(true);
      showToast('Einstellungen gespeichert!');
      setTimeout(() => setPrefsSaved(false), 2000);
    }, 300);
  };

  // ---- Theme Change (apply immediately + sync to server) ----
  const handleThemeChange = async (newTheme: ThemeMode) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('sigsag-theme', newTheme);
    try {
      const token = await getToken();
      await fetch(`${API_BASE_URL}/progress/theme`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ theme: newTheme })
      });
    } catch (e) {
      console.error('Failed to sync theme:', e);
    }
  };

  // ---- Account Deletion ----
  const handleDeleteAccount = async () => {
    if (deleteInput !== 'LÖSCHEN') return;
    try {
      await user?.delete();
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to delete account:', error);
      showToast('Fehler beim Löschen des Kontos.', 'error');
    }
  };

  const handlePortalSession = async () => {
    setPortalLoading(true);
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/payments/create-portal-session`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        showToast('Stripe Portal konnte nicht geladen werden.', 'error');
      }
    } catch (err) {
      showToast('Aktion fehlgeschlagen.', 'error');
    } finally {
      setPortalLoading(false);
    }
  };

  // Input style helper
  const inputClass = twMerge(
    "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg",
    "text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50",
    "border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark",
    "focus:border-primary dark:focus:border-primary h-14 placeholder:text-gray-400 p-[15px]",
    "text-base font-normal leading-normal"
  );

  if (!isLoaded) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
      </div>
    );
  }

  const sidebarItems = [
    { name: 'Profil', icon: 'person', section: 'profile' },
    { name: 'Einstellungen', icon: 'tune', section: 'preferences' },
    { name: 'Abonnement', icon: 'credit_card', section: 'subscription' },
    { name: 'Gefahrenzone', icon: 'warning', section: 'danger-zone' },
  ];

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-medium flex items-center gap-2 animate-in slide-in-from-right fade-in duration-300 ${toast.type === 'success' ? 'bg-primary' : 'bg-red-600'
          }`}>
          <span className="material-symbols-outlined text-base">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          {toast.message}
        </div>
      )}

      <div className="flex flex-1 justify-center py-5 px-4 sm:px-6 lg:px-8">
        <div className="layout-content-container flex w-full max-w-6xl flex-1">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8 w-full">

            {/* ---- SIDEBAR ---- */}
            <aside className="md:col-span-1 lg:col-span-1">
              <div className="flex h-full min-h-[480px] flex-col justify-between bg-card-light dark:bg-card-dark/50 rounded-xl p-4 border border-border-light dark:border-border-dark sticky top-20">
                <div className="flex flex-col gap-4">
                  {/* User Info */}
                  <div className="flex gap-3 items-center">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shrink-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {user?.imageUrl ? (
                        <img src={user.imageUrl} alt="Avatar" className="size-12 rounded-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-2xl text-gray-400">person</span>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h1 className="text-text-light dark:text-text-dark text-base font-bold leading-normal truncate">
                        {user?.firstName || 'Entdecker'} {user?.lastName || ''}
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal truncate">
                        {user?.primaryEmailAddress?.emailAddress || ''}
                      </p>
                    </div>
                  </div>

                  {/* Nav */}
                  <nav className="flex flex-col gap-2 mt-4">
                    {sidebarItems.map((item) => (
                      <a
                        key={item.section}
                        href={`#${item.section}`}
                        className={twMerge(
                          "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                          activeSection === item.section
                            ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent"
                            : "hover:bg-border-light dark:hover:bg-card-dark text-text-light dark:text-text-dark"
                        )}
                      >
                        <span className={twMerge(
                          "material-symbols-outlined text-2xl",
                          activeSection === item.section ? 'text-primary dark:text-accent' : 'text-gray-500 dark:text-gray-400',
                          item.section === 'danger-zone' && 'text-red-500'
                        )}>
                          {item.icon}
                        </span>
                        <p className="text-sm font-medium leading-normal">{item.name}</p>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Logout */}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-border-light dark:hover:bg-card-dark cursor-pointer text-text-light dark:text-text-dark mt-6"
                >
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-2xl">logout</span>
                  <p className="text-sm font-medium leading-normal">Ausloggen</p>
                </button>
                {showLogoutModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mx-4 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-3 rounded-full bg-red-50 dark:bg-red-900/20">
                          <span className="material-symbols-outlined text-3xl text-red-500">logout</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Abmelden?</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Möchtest du dich wirklich abmelden?</p>
                        <div className="flex gap-3 w-full mt-2">
                          <button onClick={() => setShowLogoutModal(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Abbrechen</button>
                          <button onClick={() => signOut({ redirectUrl: '/' })} className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">Abmelden</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* ---- MAIN CONTENT ---- */}
            <main className="md:col-span-3 lg:col-span-2 space-y-8">

              {/* ========== PROFILE SECTION ========== */}
              <section id="profile">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <h2 className="text-text-light dark:text-text-dark text-3xl font-bold leading-tight tracking-[-0.033em]">Profil-Einstellungen</h2>
                </div>
                <div className="bg-card-light dark:bg-card-dark/50 rounded-xl p-4 sm:p-6 border border-border-light dark:border-border-dark">
                  {/* Photo & Name */}
                  <div className="flex p-4 @container">
                    <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                      <div className="flex items-center gap-6">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full min-h-24 w-24 flex items-center justify-center overflow-hidden">
                          {user?.imageUrl ? (
                            <img src={user.imageUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-4xl text-gray-400">person</span>
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em]">
                            {user?.firstName || ''} {user?.lastName || ''}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                            {user?.primaryEmailAddress?.emailAddress || ''}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          // Open Clerk's managed profile UI for photo change
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = async (e: any) => {
                            const file = e.target.files?.[0];
                            if (file && user) {
                              try {
                                await user.setProfileImage({ file });
                                showToast('Profilbild aktualisiert!');
                              } catch (err) {
                                console.error('Failed to upload image:', err);
                                showToast('Fehler beim Hochladen des Bildes.', 'error');
                              }
                            }
                          };
                          input.click();
                        }}
                        className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-border-light dark:bg-border-dark text-text-light dark:text-text-dark text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto hover:bg-gray-300 dark:hover:bg-slate-700"
                      >
                        <span className="material-symbols-outlined text-base mr-2">photo_camera</span>
                        <span className="truncate">Foto ändern</span>
                      </button>
                    </div>
                  </div>
                  <hr className="border-border-light dark:border-border-dark my-4" />

                  {/* Form Fields */}
                  <div className="p-4 space-y-6">
                    <div className="flex flex-col sm:flex-row items-end gap-4">
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Vorname</p>
                        <input
                          className={inputClass}
                          placeholder="Vorname"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </label>
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Nachname</p>
                        <input
                          className={inputClass}
                          placeholder="Nachname"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </label>
                    </div>
                    {/* Email (read-only, managed by Clerk) */}
                    <div className="flex flex-wrap items-end gap-4">
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">E-Mail-Adresse</p>
                        <input
                          className={twMerge(inputClass, "bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed")}
                          value={user?.primaryEmailAddress?.emailAddress || ''}
                          readOnly
                          title="E-Mail wird über Clerk verwaltet"
                        />
                        <p className="text-xs text-gray-400 mt-1">Wird über deinen Login-Anbieter verwaltet.</p>
                      </label>
                    </div>

                    {/* Save / Cancel */}
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        onClick={handleProfileCancel}
                        className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-border-light dark:bg-border-dark text-text-light dark:text-text-dark text-base font-bold leading-normal hover:bg-gray-300 dark:hover:bg-slate-700"
                      >
                        Abbrechen
                      </button>
                      <button
                        onClick={handleProfileSave}
                        disabled={profileSaving}
                        className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {profileSaving && <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>}
                        {profileSaved ? (
                          <><span className="material-symbols-outlined text-base">check</span> Gespeichert</>
                        ) : (
                          'Speichern'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* ========== PREFERENCES SECTION ========== */}
              <section id="preferences">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <h2 className="text-text-light dark:text-text-dark text-3xl font-bold leading-tight tracking-[-0.033em]">App-Einstellungen</h2>
                </div>
                <div className="bg-card-light dark:bg-card-dark/50 rounded-xl border border-border-light dark:border-border-dark p-4 sm:p-6 space-y-8">

                  {/* Voice Selection */}
                  <div>
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Lern-Buddy</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Passe den Lern-Buddy an.</p>
                    <div className="mt-6">
                      <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Stimme ändern</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {([
                          { value: 'male' as VoiceOption, label: 'Männlich', icon: 'face_6' },
                          { value: 'female' as VoiceOption, label: 'Weiblich', icon: 'face_3' },
                          { value: 'neutral' as VoiceOption, label: 'Neutral', icon: 'sentiment_neutral' },
                        ]).map(opt => (
                          <label
                            key={opt.value}
                            className={twMerge(
                              "flex-1 flex items-center p-4 rounded-lg border cursor-pointer transition-all",
                              voiceOption === opt.value
                                ? "border-primary bg-primary/10 dark:bg-primary/20 ring-2 ring-primary/30"
                                : "border-border-light dark:border-border-dark hover:border-primary/50"
                            )}
                          >
                            <input
                              className="form-radio text-primary focus:ring-primary/50"
                              name="agent-voice"
                              type="radio"
                              value={opt.value}
                              checked={voiceOption === opt.value}
                              onChange={() => setVoiceOption(opt.value)}
                            />
                            <span className="material-symbols-outlined ml-3 text-xl">{opt.icon}</span>
                            <span className="ml-2 text-text-light dark:text-text-dark font-medium">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="border-border-light dark:border-border-dark" />

                  {/* Notifications */}
                  <div>
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Mitteilungen</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Bestimme selbst, in welcher Form du Updates erhältst.</p>
                    <div className="mt-6 space-y-4">
                      {/* Email Toggle */}
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border-light dark:border-border-dark">
                        <div>
                          <p className="text-text-light dark:text-text-dark font-medium">E-Mails empfangen</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Erinnerungen und Updates zu deinem Lernfortschritt.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                          />
                          <div className="w-11 h-6 bg-border-light dark:bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                        </label>
                      </div>
                      {/* Push Toggle */}
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border-light dark:border-border-dark">
                        <div>
                          <p className="text-text-light dark:text-text-dark font-medium">Push-Nachrichten</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Nachrichten direkt auf dein Mobiltelefon.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={pushNotifications}
                            onChange={() => setPushNotifications(!pushNotifications)}
                          />
                          <div className="w-11 h-6 bg-border-light dark:bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <hr className="border-border-light dark:border-border-dark" />

                  {/* Theme */}
                  <div>
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Modus</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Wechsle zwischen hellem und dunklem Modus.</p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                      {([
                        { value: 'light' as ThemeMode, label: 'Hell', icon: 'light_mode' },
                        { value: 'dark' as ThemeMode, label: 'Dunkel', icon: 'dark_mode' },
                        { value: 'system' as ThemeMode, label: 'System', icon: 'desktop_windows' },
                      ]).map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => handleThemeChange(opt.value)}
                          className={twMerge(
                            "flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                            theme === opt.value
                              ? "border-primary bg-primary/10 dark:bg-primary/20 ring-2 ring-primary/30"
                              : "border-border-light dark:border-border-dark hover:border-primary/50"
                          )}
                        >
                          <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                          <span className="font-medium text-text-light dark:text-text-dark">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Save Preferences */}
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={handlePrefsSave}
                      disabled={prefsSaving}
                      className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal hover:bg-primary/90 disabled:opacity-50"
                    >
                      {prefsSaving && <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>}
                      {prefsSaved ? (
                        <><span className="material-symbols-outlined text-base">check</span> Gespeichert</>
                      ) : (
                        'Einstellungen speichern'
                      )}
                    </button>
                  </div>
                </div>
              </section>

              {/* ========== SUBSCRIPTION SECTION ========== */}
              <section id="subscription">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <h2 className="text-text-light dark:text-text-dark text-3xl font-bold leading-tight tracking-[-0.033em]">Abonnement & Zahlungen</h2>
                </div>
                <div className="bg-card-light dark:bg-card-dark/50 rounded-xl border border-border-light dark:border-border-dark p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
                    <div className="flex items-center gap-6">
                      <div className="bg-primary/10 dark:bg-primary/20 p-5 rounded-2xl">
                          <span className="material-symbols-outlined text-4xl text-primary">redeem</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-text-light dark:text-text-dark text-lg font-bold">
                           Aktueller Plan: {subStatus?.planTier?.toUpperCase() || 'FREE'}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                           {subStatus?.isActive 
                             ? (subStatus.stripeCurrentPeriodEnd 
                                ? `Nächste Abrechnung: ${new Date(subStatus.stripeCurrentPeriodEnd).toLocaleDateString('de-DE')}`
                                : 'Abonnement aktiv')
                             : 'Du nutzt derzeit die kostenlose Testversion.'}
                        </p>
                      </div>
                    </div>
                    
                    {!subStatus?.isActive ? (
                       <button
                         onClick={() => window.location.href = '/pricing'}
                         className="w-full sm:w-auto px-6 h-12 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                       >
                         Upgrade auf Classic
                       </button>
                    ) : (
                      <button
                        onClick={handlePortalSession}
                        disabled={portalLoading}
                        className="w-full sm:w-auto px-6 h-12 bg-border-light dark:bg-border-dark text-text-light dark:text-text-dark rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2"
                      >
                         {portalLoading && <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>}
                         Abonnement verwalten 
                         <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* ========== DANGER ZONE ========== */}
              <section id="danger-zone">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <h2 className="text-red-600 dark:text-red-500 text-3xl font-bold leading-tight tracking-[-0.033em]">Gefahrenzone</h2>
                </div>
                <div className="bg-card-light dark:bg-card-dark/50 rounded-xl border border-red-500/50 p-4 sm:p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Nutzerkonto löschen</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
                      Achtung, wenn du deinen Account löschst, gibt es kein Zurück. Bitte überlege gut, ob du das wirklich möchtest.
                      Diese Aktion löscht dauerhaft deine Daten, auch deinen Lernfortschritt, Redemittel und persönliche Angaben.
                    </p>
                  </div>

                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-red-600 text-white text-base font-bold leading-normal hover:bg-red-700"
                    >
                      <span className="material-symbols-outlined text-base mr-2">delete_forever</span>
                      Nutzerkonto löschen
                    </button>
                  ) : (
                    <div className="border border-red-300 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/10 space-y-4">
                      <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                        Bitte gib <strong>LÖSCHEN</strong> ein, um zu bestätigen:
                      </p>
                      <input
                        className={twMerge(inputClass, "border-red-300 dark:border-red-700 focus:ring-red-500/50 focus:border-red-500")}
                        placeholder="LÖSCHEN"
                        value={deleteInput}
                        onChange={(e) => setDeleteInput(e.target.value)}
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => { setShowDeleteConfirm(false); setDeleteInput(''); }}
                          className="flex-1 h-12 px-5 rounded-lg bg-border-light dark:bg-border-dark text-text-light dark:text-text-dark font-bold hover:bg-gray-300 dark:hover:bg-slate-700"
                        >
                          Abbrechen
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          disabled={deleteInput !== 'LÖSCHEN'}
                          className="flex-1 h-12 px-5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Endgültig löschen
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </>
  );
}