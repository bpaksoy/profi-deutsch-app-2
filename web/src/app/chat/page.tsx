'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useUser } from '../../context/AuthContext';

// Dynamically import ChatInterface with SSR disabled to avoid hydration errors
const ChatInterface = dynamic(() => import('./ChatInterface'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
});

const USER_AVATAR = "https://api.dicebear.com/7.x/notionists/svg?seed=User&backgroundColor=f1f5f9";
const AI_AVATAR = "/flo-avatar.svg";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function ChatPage() {
  const { user } = useUser();

  return <ChatInterface
    username={user?.firstName || 'Entdecker'}
    avatarUrl={user?.imageUrl || USER_AVATAR}
    aiAvatarUrl={AI_AVATAR}
    apiBaseUrl={API_BASE_URL}
  />;
}