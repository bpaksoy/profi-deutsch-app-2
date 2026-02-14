'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';

// Dynamically import ChatInterface with SSR disabled to avoid hydration errors
const ChatInterface = dynamic(() => import('./ChatInterface'), { ssr: false });

const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuC3UxJCLgdZY3vIQAPm31GnNp-7w1_8mASbyWEU7JgWMDBmyXkBUq0a9fqdYf3UiKOzV3UjUZdfW7a9VnuJBzD1Ld1yEOBhsCMqYwjROVjVPz6sHd2pznp2zP3eO3tl1y1m5wzdEvVadubycVDI-rzRskUm9FYWUjCjBcLfLNTjz5Di-Am4ZdbDJoqqBaWxS3l1HHJ_izz6YSC15Kd-OYpPp8eUpoN_90subodS_vH9WVSBWXHXfPyhA8tdvoGDTnfQV82dPnfwq2Ql";
const AI_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuCWUMtSS9G3SQC2IjMCNqvfvcH7IHfXBZoPZdQ1kBDZPxI54jL8edcEGhtruaLw-T5SJd_4UBiJkCiLYGWN6AEURmh_qRuUdsEyzQFDeHzexv0nZF0u6sW08jEDceAJn_bkfbIY8D8ztfXLhiN-KZNv9Gg9Re9iHmZrbyOLCARxuruv02f4KU4BPtDwBIz26fuD9s0rJk2KkWI0WfUoKGRNIiHmZrbyOLCARxuruv02f4KU4BPtDwBIz26fuD9s0rJk2KkWI0WfUoKGRNIiMZynfWg85WxTBis1vPoYSqQEOZtYzoYM3m5SCNTd4v5URd0n-NcRsk";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function ChatPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return <ChatInterface
    username={user?.firstName || 'Entdecker'}
    avatarUrl={user?.imageUrl || USER_AVATAR}
    aiAvatarUrl={AI_AVATAR}
    apiBaseUrl={API_BASE_URL}
  />;
}