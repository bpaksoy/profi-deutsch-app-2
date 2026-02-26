'use client';

import React, { useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';

interface ChatMessageProps {
    message: string;
    type: 'ai' | 'user';
    sender: 'user' | 'bot';
    avatarUrl: string;
    isTyping?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender, isTyping = false }) => {
    const isUser = sender === 'user';
    const isBot = sender === 'bot';
    const { getToken } = useAuth();
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const [playbackState, setPlaybackState] = React.useState<'idle' | 'loading' | 'playing'>('idle');

    const handleAudioClick = useCallback(async () => {
        if (!isBot || !message) return;

        // If currently playing → pause/stop
        if (playbackState === 'playing' && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setPlaybackState('idle');
            return;
        }

        // If loading, ignore extra clicks
        if (playbackState === 'loading') return;

        // Otherwise → fetch and play
        try {
            setPlaybackState('loading');
            const token = await getToken();
            const params = new URLSearchParams({ text: message });
            const ttsUrl = `${API_BASE_URL}/chat/tts?${params.toString()}`;

            const response = await fetch(ttsUrl, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error(`TTS request failed: ${response.status}`);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            if (!audioRef.current) {
                audioRef.current = new Audio();
            }

            audioRef.current.src = audioUrl;
            audioRef.current.onended = () => {
                URL.revokeObjectURL(audioUrl);
                setPlaybackState('idle');
            };
            audioRef.current.onerror = () => {
                URL.revokeObjectURL(audioUrl);
                setPlaybackState('idle');
            };

            await audioRef.current.play();
            setPlaybackState('playing');
        } catch (error) {
            console.error('Error playing audio:', error);
            setPlaybackState('idle');
        }
    }, [isBot, message, playbackState, getToken]);

    const getIcon = () => {
        switch (playbackState) {
            case 'loading': return 'progress_activity';
            case 'playing': return 'stop_circle';
            default: return 'volume_up';
        }
    };

    const getTitle = () => {
        switch (playbackState) {
            case 'loading': return 'Wird geladen...';
            case 'playing': return 'Stoppen';
            default: return 'Anhören';
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                margin: '10px 0',
                alignItems: 'flex-end',
            }}
        >
            {/* Message Bubble */}
            <div
                style={{
                    maxWidth: '70%',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: isUser ? '#008073' : '#e1e1e1',
                    color: isUser ? '#fff' : '#000',
                }}
            >
                {message}
            </div>

            {/* TTS Playback Button (Bot messages only) */}
            {isBot && !isTyping && (
                <button
                    onClick={handleAudioClick}
                    disabled={playbackState === 'loading'}
                    style={{
                        marginLeft: '5px',
                        padding: '5px',
                        cursor: playbackState === 'loading' ? 'wait' : 'pointer',
                        background: 'transparent',
                        border: 'none',
                        color: playbackState === 'playing' ? '#008073' : '#555',
                        opacity: playbackState === 'loading' ? 0.5 : 1,
                        transition: 'all 0.2s',
                    }}
                    title={getTitle()}
                >
                    <span
                        className={`material-symbols-outlined ${playbackState === 'loading' ? 'animate-spin' : ''}`}
                        style={{ fontSize: '18px' }}
                    >
                        {getIcon()}
                    </span>
                </button>
            )}
        </div>
    );
};

export default ChatMessage;