// web/src/app/settings/page.tsx
'use client';

import React, { useState } from 'react';
import { SettingsSidebar } from '../../components/SettingsSidebar'; 
import { twMerge } from 'tailwind-merge';

// Placeholders (replace with actual user data logic)
const USERNAME = "Klaus Meier";
const EMAIL = "klaus.meier@email.de";
const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuCQiLGiFIjW2hsCFsYpn9soBXlhsnqsGnrUniX2-iUR4y6UcohNX_td3BF-yem-aH2L5XGe9DJIoZ5qqr0lKzSWCrUlmdHo49XZb8dXHo-qIl1R2LodFX1FN7K9hBNYuSNvoqbZubdUThfEXTzJDIk8aLJy0D6q4rBBzYQlT1siDz7Oj3o9MdLzMnTJnlwP0ItDX0_s30CTyYtrfpN5jydq6Xr4RG3iNdLHJOg-kBRTStiegOZqPze9GSC46Is9evXnS7F7Sqca_St_";

// Settings Page Component
export default function SettingsPage() {
  // Simple state to track active navigation section for sidebar highlighting
  const [activeSection, setActiveSection] = useState<'profile' | 'preferences' | 'privacy' | 'logout'>('profile');

  // NOTE: Intersection Observer or hash change listener is typically used to update activeSection based on scroll position in the main section.

  return (
    // This container simulates the unwrapped layout (no TopNav) and central padding
    <div className="flex flex-1 justify-center py-5 px-4 sm:px-6 lg:px-8">
      <div className="layout-content-container flex w-full max-w-6xl flex-1">
        
        {/* Main Grid: Sidebar (1 col) and Content (2-3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8 w-full">
          
          {/* Side Navigation */}
          <SettingsSidebar 
            username={USERNAME}
            email={EMAIL}
            userAvatar={USER_AVATAR}
            activeSection={activeSection}
          />

          {/* Main Content Area */}
          <main className="md:col-span-3 lg:col-span-2 space-y-8">
            
            {/* ---------------------------------------------------- */}
            {/* PROFILE SECTION */}
            {/* ---------------------------------------------------- */}
            <section id="profile">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <h2 className="text-text-light dark:text-text-dark text-3xl font-black leading-tight tracking-[-0.033em] min-w-72">Profile Settings</h2>
              </div>
              <div className="bg-card-light dark:bg-card-dark/50 rounded-xl p-4 sm:p-6 border border-border-light dark:border-border-dark">
                {/* Photo & Name Section */}
                <div className="flex p-4 @container">
                  <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                    <div className="flex items-center gap-6">
                      <div 
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24" 
                        data-alt="User's profile picture" 
                        style={{ backgroundImage: `url("${USER_AVATAR}")` }}>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em]">{USERNAME}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">{EMAIL}</p>
                      </div>
                    </div>
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-border-light dark:bg-border-dark text-text-light dark:text-text-dark text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto hover:bg-gray-300 dark:hover:bg-slate-700">
                      <span className="truncate">Change Photo</span>
                    </button>
                  </div>
                </div>
                <hr className="border-border-light dark:border-border-dark my-4"/>
                
                {/* Form Fields */}
                <div className="p-4 space-y-6">
                  <div className="flex flex-col sm:flex-row items-end gap-4">
                    {/* First Name */}
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">First Name</p>
                      <input className={twMerge("form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary dark:focus:border-primary h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal")} placeholder="Klaus" value="Klaus"/>
                    </label>
                    {/* Last Name */}
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Last Name</p>
                      <input className={twMerge("form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary dark:focus:border-primary h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal")} placeholder="Meier" value="Meier"/>
                    </label>
                  </div>
                  {/* Email */}
                  <div className="flex flex-wrap items-end gap-4">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Email Address</p>
                      <input className={twMerge("form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary dark:focus:border-primary h-14 placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal")} placeholder="klaus.meier@email.de" value="klaus.meier@email.de"/>
                    </label>
                  </div>
                  {/* Save/Cancel Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-border-light dark:bg-border-dark text-text-light dark:text-text-dark text-base font-bold leading-normal hover:bg-gray-300 dark:hover:bg-slate-700">
                      <span className="truncate">Cancel</span>
                    </button>
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal hover:bg-primary/90">
                      <span className="truncate">Save Changes</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* ---------------------------------------------------- */}
            {/* PREFERENCES SECTION */}
            {/* ---------------------------------------------------- */}
            <section id="preferences">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <h2 className="text-text-light dark:text-text-dark text-3xl font-black leading-tight tracking-[-0.033em] min-w-72">App Preferences</h2>
              </div>
              <div className="bg-card-light dark:bg-card-dark/50 rounded-xl border border-border-light dark:border-border-dark p-4 sm:p-6 space-y-8">
                
                {/* AI Agent Settings */}
                <div>
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark">AI Agent</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Customize your AI learning partner.</p>
                  <div className="mt-6 space-y-6">
                    <div>
                      <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Agent Voice</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Radio buttons (using has-[:checked] for styling) */}
                        <label className="flex-1 flex items-center p-4 rounded-lg border border-border-light dark:border-border-dark has-[:checked]:border-primary has-[:checked]:bg-primary/10 cursor-pointer">
                          <input className="form-radio text-primary focus:ring-primary/50" name="agent-voice" type="radio" value="male"/>
                          <span className="ml-3 text-text-light dark:text-text-dark">Male</span>
                        </label>
                        <label className="flex-1 flex items-center p-4 rounded-lg border border-border-light dark:border-border-dark has-[:checked]:border-primary has-[:checked]:bg-primary/10 cursor-pointer">
                          <input defaultChecked className="form-radio text-primary focus:ring-primary/50" name="agent-voice" type="radio" value="female"/>
                          <span className="ml-3 text-text-light dark:text-text-dark">Female</span>
                        </label>
                        <label className="flex-1 flex items-center p-4 rounded-lg border border-border-light dark:border-border-dark has-[:checked]:border-primary has-[:checked]:bg-primary/10 cursor-pointer">
                          <input className="form-radio text-primary focus:ring-primary/50" name="agent-voice" type="radio" value="neutral"/>
                          <span className="ml-3 text-text-light dark:text-text-dark">Neutral</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <hr className="border-border-light dark:border-border-dark"/>
                
                {/* Notification Settings */}
                <div>
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Notifications</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage how you receive updates from us.</p>
                  <div className="mt-6 space-y-4">
                    {/* Email Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border-light dark:border-border-dark">
                      <div>
                        <p className="text-text-light dark:text-text-dark font-medium">Email Notifications</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Get practice reminders and progress updates.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" value=""/>
                        {/* Custom Toggle using peer-checked */}
                        <div className="w-11 h-6 bg-border-light dark:bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    {/* Push Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border-light dark:border-border-dark">
                      <div>
                        <p className="text-text-light dark:text-text-dark font-medium">Push Notifications</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Receive alerts directly on your device.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only peer" type="checkbox" value=""/>
                        <div className="w-11 h-6 bg-border-light dark:bg-border-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <hr className="border-border-light dark:border-border-dark"/>
                
                {/* Appearance */}
                <div>
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Appearance</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Switch between light and dark themes.</p>
                  <div className="mt-6">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Theme</p>
                      <select className={twMerge("form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary dark:focus:border-primary h-14 placeholder:text-gray-400 px-4 text-base font-normal leading-normal")}>
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                        <option value="system">System Default</option>
                      </select>
                    </label>
                  </div>
                </div>
                
                {/* Save Preferences Button */}
                <div className="flex justify-end gap-3 pt-4">
                  <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal hover:bg-primary/90">
                    <span className="truncate">Save Preferences</span>
                  </button>
                </div>
              </div>
            </section>
            
            {/* ---------------------------------------------------- */}
            {/* DANGER ZONE */}
            {/* ---------------------------------------------------- */}
            <section id="danger-zone">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <h2 className="text-red-600 dark:text-red-500 text-3xl font-black leading-tight tracking-[-0.033em] min-w-72">Danger Zone</h2>
              </div>
              <div className="bg-card-light dark:bg-card-dark/50 rounded-xl border border-red-500/50 p-4 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Delete Account</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">Once you delete your account, there is no going back. Please be certain before proceeding. This action will permanently erase all your data, including your learning progress and personal information.</p>
                </div>
                <div className="flex justify-start">
                  <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-red-600 text-white text-base font-bold leading-normal hover:bg-red-700">
                    <span className="truncate">Delete My Account</span>
                  </button>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}