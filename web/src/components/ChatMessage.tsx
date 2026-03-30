'use client';
import React, { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
interface ChatMessageProps {
    message: string;
    type: 'ai' | 'user';
    sender: 'user' | 'bot';
    avatarUrl: string;
    isTyping?: boolean;
    timestamp?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender, avatarUrl, isTyping = false, timestamp }) => {
    const isUser = sender === 'user';
    const isBot = sender === 'bot';
    const { getToken } = useAuth();
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const [playbackState, setPlaybackState] = React.useState<'idle' | 'loading' | 'playing'>('idle');

    const formatTimestamp = (ts?: string) => {
        if (!ts) return '';
        const d = new Date(ts);
        return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    };

    const handleAudioClick = useCallback(async () => {
        if (!isBot || !message) return;

        if (playbackState === 'playing' && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setPlaybackState('idle');
            return;
        }

        if (playbackState === 'loading') return;

        try {
            setPlaybackState('loading');
            const token = await getToken();
            const params = new URLSearchParams({ text: message });
            const response = await fetch(`${API_BASE_URL}/chat/tts?${params.toString()}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('TTS failed');

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            if (!audioRef.current) audioRef.current = new Audio();
            audioRef.current.src = audioUrl;
            audioRef.current.onended = () => {
                URL.revokeObjectURL(audioUrl);
                setPlaybackState('idle');
            };
            audioRef.current.play();
            setPlaybackState('playing');
        } catch (error) {
            console.error(error);
            setPlaybackState('idle');
        }
    }, [isBot, message, playbackState, getToken]);

    return (
        <div className={`flex w-full mb-4 items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="size-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-primary/20 shadow-sm bg-primary/10">
                    <img 
                        src={avatarUrl || "/flo-avatar.svg"} 
                        alt="Flo" 
                        className="size-full object-cover" 
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="material-symbols-outlined text-primary text-sm">smart_toy</span>';
                        }}
                    />
                </div>
            )}
            
            <div className={`group relative flex flex-col max-w-[80%] sm:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-base leading-relaxed shadow-sm transition-all duration-200
                    ${isUser 
                        ? 'bg-primary text-white rounded-br-none hover:bg-primary/95' 
                        : 'bg-white dark:bg-card-dark text-gray-800 dark:text-gray-100 border border-border-light dark:border-border-dark rounded-bl-none hover:border-primary/30'
                    }`}
                >
                    {isTyping ? (
                        <div className="flex gap-1 py-1.5 items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    ) : (
                        <div className="whitespace-pre-wrap break-words">{message}</div>
                    )}
                </div>

                <div className={`mt-1 flex items-center gap-2 px-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    {timestamp && (
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium tracking-tight">
                            {formatTimestamp(timestamp)}
                        </span>
                    )}

                    {isBot && !isTyping && (
                        <button
                            onClick={handleAudioClick}
                            disabled={playbackState === 'loading'}
                            className={`flex items-center gap-1 transition-all duration-200 hover:scale-110 active:scale-95
                                ${playbackState === 'playing' ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-primary'}
                                ${playbackState === 'loading' ? 'cursor-wait opacity-50' : 'cursor-pointer'}
                            `}
                            title={playbackState === 'playing' ? 'Stoppen' : 'Anhören'}
                        >
                            <span className={`material-symbols-outlined text-base ${playbackState === 'loading' ? 'animate-spin' : ''}`}>
                                {playbackState === 'loading' ? 'progress_activity' : (playbackState === 'playing' ? 'stop_circle' : 'volume_up')}
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {isUser && (
                <div className="size-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-accent/20 shadow-sm bg-accent/10">
                    <img 
                        src={avatarUrl || "https://api.dicebear.com/7.x/notionists/svg?seed=User"} 
                        alt="Du" 
                        className="size-full object-cover" 
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="material-symbols-outlined text-primary text-sm font-bold">person</span>';
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatMessage;