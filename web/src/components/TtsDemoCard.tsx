
'use client'; 

import React, { useState, useRef } from 'react';
import { twMerge } from 'tailwind-merge'; 

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

export const TtsDemoCard: React.FC = () => {
    const [text, setText] = useState('Hallo! Klicken Sie auf den Knopf, um meine Stimme zu hören.');
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = async () => {
        if (!text.trim()) return;

        setIsLoading(true);
        const params = new URLSearchParams({ text: text });
        const ttsUrl = `${API_BASE_URL}/chat/tts?${params.toString()}`;

        try {
            // 1. Create or reuse an invisible audio element
            if (!audioRef.current) {
                audioRef.current = new Audio();
                document.body.appendChild(audioRef.current);
            }
            
            // 2. Set the source and play
            audioRef.current.src = ttsUrl;
            await audioRef.current.play();

            audioRef.current.onended = () => setIsLoading(false);
        } catch (error) {
            console.error('TTS Playback Error:', error);
            alert("Fehler beim Abspielen der Stimme. Prüfen Sie die Konsole und das Backend!");
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-lg border border-border-light dark:border-border-dark flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Azure TTS Demo</h2>
            
            {/* Text Input Area */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className={twMerge(
                    "w-full p-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:ring-primary focus:border-primary resize-none",
                    "placeholder:text-gray-500"
                )}
                placeholder="Geben Sie hier Text ein..."
            />

            {/* Play Button */}
            <button
                onClick={playAudio}
                disabled={isLoading}
                className={twMerge(
                    "flex items-center justify-center h-12 rounded-lg bg-primary text-white text-base font-bold transition-colors",
                    isLoading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-primary/90"
                )}
            >
                {isLoading ? (
                    "Spreche..."
                ) : (
                    <>
                        <span className="material-symbols-outlined mr-2">volume_up</span>
                        Text vorlesen
                    </>
                )}
            </button>
            <p className="text-sm text-gray-500">Powered by Azure Speech Services</p>
        </div>
    );
};