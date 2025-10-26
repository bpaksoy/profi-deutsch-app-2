'use client';

import React from 'react';
import ChatSidebar from '../../components/ChatSidebar';
import ChatMessage from '../../components/ChatMessage';

// Placeholder Avatars
const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuC3UxJCLgdZY3vIQAPm31GnNp-7w1_8mASbyWEU7JgWMDBmyXkBUq0a9fqdYf3UiKOzV3UjUZdfW7a9VnuJBzD1Ld1yEOBhsCMqYwjROVjVPz6sHd2pznp2zP3eO3tl1y1m5wzdEvVadubycVDI-rzRskUm9FYWUjCjBcLfLNTjz5Di-Am4ZdbDJoqqBaWxS3l1HHJ_izz6YSC15Kd-OYpPp8eUpoN_90subodS_vH9WVSBWXHXfPyhA8tdvoGDTnfQV82dPnfwq2Ql";
const AI_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuCWUMtSS9G3SQC2IjMCNqvfvcH7IHfXBZoPZdQ1kBDZPxI54jL8edcEGhtruaLw-T5SJd_4UBiJkCiLYGWN6AEURmh_qRuUdsEyzQFDeHzexv0nZF0u6sW08jEDceAJn_bkfbIY8D8ztfXLhiN-KZNv9Gg9Re9iHmZrbyOLCARxuruv02f4KU4BPtDwBIz26fuD9s0rJk2KkWI0WfUoKGRNIiHmZrbyOLCARxuruv02f4KU4BPtDwBIz26fuD9s0rJk2KkWI0WfUoKGRNIiMZynfWg85WxTBis1vPoYSqQEOZtYzoYM3m5SCNTd4v5URd0n-NcRsk";

interface ChatMessageData {
    type: 'ai' | 'user';
    sender: 'bot' | 'user';
    message: string;
    avatar: string;
    isTyping?: boolean; // Now TypeScript knows this property is optional
}

const chatHistory : ChatMessageData[] = [
  { type: 'ai', sender: 'bot', message: 'Hallo! Ich bin Ihr KI-Assistent. Worüber möchten Sie heute sprechen? Sie können ein Szenario wie \'Vorstellungsgespräch\' wählen oder einfach eine Frage stellen.', avatar: AI_AVATAR },
  { type: 'user', sender: 'user', message: 'Ich möchte ein Vorstellungsgespräch üben.', avatar: USER_AVATAR },
  // { type: 'ai', sender: 'bot', message: '', avatar: AI_AVATAR, isTyping: true }, // <-- TEMPORARILY COMMENT OUT
];

export default function ChatPage() {
  const username = "Max Mustermann";

  // CRITICAL: Next.js Layout (RootLayout/CustomLayout) should wrap this entire content.
  // We need to ensure that the layout wrapper provides the h-screen and flex-col structure.
  
  return (
    // This div needs to manage the full height and flexible structure for the sidebar/main area
    // NOTE: If you use CustomLayout, the h-screen must be in the RootLayout/CustomLayout.
    // Assuming CustomLayout already establishes flex-col min-h-screen, this can start below the TopNav
    <div className="flex h-[calc(100vh-64px)] w-full"> {/* Adjust height to exclude TopNav height (e.g., 64px) */}
        
        {/* Sidebar */}
        <ChatSidebar 
            username={username} 
            userAvatar={USER_AVATAR} 
            conversations={[]} 
            onSelectConversation={() => {}} 
        />

        {/* Main Chat Area */}
        <main className="flex flex-1 flex-col">
            
            {/* Mobile Header (Hidden on MD) */}
            <header className="flex md:hidden items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
                <h2 className="text-lg font-bold">German AI Agent</h2>
                <button className="p-2">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </header>
            
            {/* Chat History Container (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="mx-auto max-w-3xl">
                    {chatHistory.map((msg, index) => (
                        <ChatMessage 
                            key={index}
                            type={msg.type as 'ai' | 'user'}
                            sender={msg.sender as 'user' | 'bot'}
                            message={msg.message}
                            avatarUrl={msg.avatar}
                            isTyping={msg.isTyping ?? false}
                        />
                    ))}
                </div>
            </div>
            
            {/* Composer/Input Box */}
            <div className="p-4 md:p-6 lg:p-8 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-border-dark">
                <div className="flex items-center gap-3 @container mx-auto max-w-3xl">
                    {/* User Avatar (Desktop) */}
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0 hidden sm:block" 
                        style={{ backgroundImage: `url("${USER_AVATAR}")` }}>
                    </div>
                    
                    {/* Input Field and Buttons */}
                    <div className="flex w-full flex-1 items-stretch rounded-xl h-12 bg-gray-100 dark:bg-gray-800">
                        <input 
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-transparent h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal" 
                            placeholder="Type your response..." 
                        />
                        <div className="flex items-center justify-center pr-2">
                            <div className="flex items-center gap-1">
                                <button className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent">
                                    <span className="material-symbols-outlined text-lg">mic</span>
                                </button>
                                <button className="flex items-center justify-center p-2 rounded-full bg-primary text-white hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-lg">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}