'use client';

import React, { useState, useRef } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

interface VoiceAssistantProps {
    onClose: () => void;
}

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'assistant';
}

const useAudioRecorder = (submitCallback: (blob: Blob) => Promise<void>) => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            
            recorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            recorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                audioChunksRef.current = []; 
                stream.getTracks().forEach(track => track.stop());
                await submitCallback(audioBlob); 
            };

            mediaRecorderRef.current = recorder;
            recorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Microphone access denied or error:", err);
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return { isRecording, startRecording, stopRecording };
};

// Animated Smiley Face Component
// Animated Smiley Face Component
const SmileyFace: React.FC<{ 
    isRecording: boolean; 
    isAssistantSpeaking: boolean;
    isProcessing: boolean;
}> = ({ isRecording, isAssistantSpeaking, isProcessing }) => {
    return (
        <svg 
            width="192" 
            height="192" 
            viewBox="0 0 192 192" 
            className="drop-shadow-2xl"
        >
            {/* Face circle */}
            <circle 
                cx="96" 
                cy="96" 
                r="90" 
                fill={isRecording ? '#10b981' : isAssistantSpeaking ? '#3b82f6' : '#fbbf24'}
                className="transition-colors duration-300"
            />
            
            {/* Left eye - attentive when recording */}
            {isRecording ? (
                // Focused eye when listening
                <g>
                    <ellipse cx="70" cy="80" rx="8" ry="10" fill="#1f2937" />
                    <circle cx="70" cy="78" r="3" fill="#ffffff" />
                </g>
            ) : (
                <circle 
                    cx="70" 
                    cy="80" 
                    r={isAssistantSpeaking ? "8" : "6"}
                    fill="#1f2937"
                    className="transition-all duration-200"
                >
                    {isAssistantSpeaking && (
                        <animate
                            attributeName="r"
                            values="6;8;6"
                            dur="0.6s"
                            repeatCount="indefinite"
                        />
                    )}
                </circle>
            )}
            
            {/* Right eye - attentive when recording */}
            {isRecording ? (
                // Focused eye when listening
                <g>
                    <ellipse cx="122" cy="80" rx="8" ry="10" fill="#1f2937" />
                    <circle cx="122" cy="78" r="3" fill="#ffffff" />
                </g>
            ) : (
                <circle 
                    cx="122" 
                    cy="80" 
                    r={isAssistantSpeaking ? "8" : "6"}
                    fill="#1f2937"
                    className="transition-all duration-200"
                >
                    {isAssistantSpeaking && (
                        <animate
                            attributeName="r"
                            values="6;8;6"
                            dur="0.6s"
                            repeatCount="indefinite"
                        />
                    )}
                </circle>
            )}
            
            {/* Mouth - changes based on state */}
            {isRecording ? (
                // Gentle smile with sound waves when recording (listening attentively)
                <g>
                    <path 
                        d="M 70 115 Q 96 130 122 115" 
                        stroke="#1f2937" 
                        strokeWidth="4" 
                        fill="none" 
                        strokeLinecap="round"
                    />
                    {/* Sound wave indicators */}
                    <g opacity="0.6">
                        <path d="M 140 96 Q 145 96 145 96" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round">
                            <animate attributeName="d" values="M 140 96 Q 145 96 145 96;M 140 90 Q 150 96 140 102;M 140 96 Q 145 96 145 96" dur="1s" repeatCount="indefinite" />
                        </path>
                        <path d="M 150 96 Q 155 96 155 96" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round">
                            <animate attributeName="d" values="M 150 96 Q 155 96 155 96;M 150 85 Q 160 96 150 107;M 150 96 Q 155 96 155 96" dur="1s" repeatCount="indefinite" begin="0.2s" />
                        </path>
                    </g>
                </g>
            ) : isProcessing ? (
                // Thinking mouth
                <path 
                    d="M 70 115 Q 96 115 122 115" 
                    stroke="#1f2937" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeLinecap="round"
                />
            ) : (
                // Happy smile
                <path 
                    d="M 70 110 Q 96 135 122 110" 
                    stroke="#1f2937" 
                    strokeWidth="5" 
                    fill="none" 
                    strokeLinecap="round"
                >
                    {isAssistantSpeaking && (
                        <animate
                            attributeName="d"
                            values="M 70 110 Q 96 135 122 110;M 70 110 Q 96 130 122 110;M 70 110 Q 96 135 122 110"
                            dur="0.5s"
                            repeatCount="indefinite"
                        />
                    )}
                </path>
            )}
            
            {/* Rosy cheeks */}
            <circle cx="60" cy="100" r="10" fill="#ff6b9d" opacity="0.4" />
            <circle cx="132" cy="100" r="10" fill="#ff6b9d" opacity="0.4" />
        </svg>
    );
};

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Hallo! Drücken Sie auf das Mikrofon und sprechen Sie auf Deutsch oder Englisch. Ich antworte auf Deutsch! 😊', sender: 'assistant' }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [phraseToSave, setPhraseToSave] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);

    React.useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/phrasebook/categories`);
            const data = await response.json();
            setCategories(data.map((cat: any) => cat.name));
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    };

    const handleAddPhrase = (phrase: string) => {
        setPhraseToSave(phrase);
        setShowCategoryModal(true);
    };

    const savePhrase = async (category: string) => {
        if (!phraseToSave) return;

        try {
            await fetch(`${API_BASE_URL}/phrasebook/phrases`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    german: phraseToSave,
                    category: category.toLowerCase().replace(/\s+/g, '-'),
                    context: 'From conversation with Flo'
                })
            });
            
            window.dispatchEvent(new CustomEvent('phraseAdded'));
            setShowCategoryModal(false);
            setPhraseToSave(null);
            alert('Phrase saved successfully!');
        } catch (error) {
            console.error('Failed to save phrase:', error);
            alert('Failed to save phrase');
        }
    };



    const handleSubmitAudio = async (audioBlob: Blob) => {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'voice_input.webm');

        setIsProcessing(true);

        try {
            const response = await fetch(`${API_BASE_URL}/chat/stt`, {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                throw new Error('Backend failed to transcribe/respond.');
            }
            
            const jsonResponse = await response.json();
            console.log("Backend Response:", jsonResponse);

            // Don't show user's transcribed message, only AI response
            const aiMessage: Message = {
                id: Date.now(),
                text: jsonResponse.responseText || "Entschuldigung, ich konnte keine Antwort generieren.",
                sender: 'assistant'
            };

            setMessages(current => [...current, aiMessage]);

            // Play the audio response
            if (jsonResponse.audioBase64) {
                setIsAssistantSpeaking(true);
                await playAudioFromBase64(jsonResponse.audioBase64);
                setIsAssistantSpeaking(false);
            }

        } catch (error) {
            console.error('Submission Failed:', error);
            setMessages(current => [...current, {
                id: Date.now(),
                text: 'Entschuldigung, es gab einen Fehler.',
                sender: 'assistant'
            }]);
        } finally {
            setIsProcessing(false);
        }
    };

    const playAudioFromBase64 = (base64Audio: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                const byteCharacters = atob(base64Audio);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'audio/mpeg' });
                
                const audioUrl = URL.createObjectURL(blob);
                const audio = new Audio(audioUrl);
                
                audio.onended = () => {
                    URL.revokeObjectURL(audioUrl);
                    resolve();
                };
                
                audio.onerror = () => {
                    URL.revokeObjectURL(audioUrl);
                    reject(new Error('Audio playback failed'));
                };
                
                audio.play().catch(reject);
            } catch (error) {
                reject(error);
            }
        });
    };

    const { isRecording, startRecording, stopRecording } = useAudioRecorder(handleSubmitAudio);

    const handleMicClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white dark:bg-card-dark w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden h-[80vh]">
                
                {/* LEFT SIDE - Pulsating Smiley Face */}
                <div className="lg:w-1/2 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 flex flex-col items-center justify-center p-8 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    {/* Pulsating Orb with Smiley Face */}
                    <div className="relative">
                        {/* Outer pulsating rings */}
                        {(isRecording || isAssistantSpeaking) && (
                            <>
                                <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-ping"></div>
                                <div className="absolute -inset-4 rounded-full bg-yellow-300/30 animate-pulse"></div>
                            </>
                        )}
                        
                        {/* Smiley Face */}
                        <div className={`
                            relative transition-all duration-300
                            ${(isRecording || isAssistantSpeaking) ? 'scale-110' : 'scale-100'}
                        `}>
                            <SmileyFace 
                                isRecording={isRecording}
                                isAssistantSpeaking={isAssistantSpeaking}
                                isProcessing={isProcessing}
                            />
                        </div>
                    </div>

                    {/* Status Text */}
                    <div className="mt-8 text-center">
                        <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            {isRecording ? 'Ich höre zu...' : isAssistantSpeaking ? 'Ich spreche...' : isProcessing ? 'Ich denke...' : 'Bereit zum Sprechen'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {isRecording ? 'Sprechen Sie jetzt auf Deutsch oder Englisch' : 'Drücken Sie das Mikrofon unten'}
                        </p>
                    </div>

                    {/* Mic Button */}
                    <button
                        onClick={handleMicClick}
                        disabled={isProcessing || isAssistantSpeaking}
                        className={`
                            mt-8 p-6 rounded-full shadow-lg transition-all
                            ${isRecording 
                                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                : 'bg-primary hover:bg-primary/90'
                            }
                            ${(isProcessing || isAssistantSpeaking) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            text-white
                        `}
                    >
                        <span className="material-symbols-outlined text-4xl">
                            {isRecording ? 'stop' : 'mic'}
                        </span>
                    </button>
                </div>

                {/* RIGHT SIDE - Message Display */}
                <div className="lg:w-1/2 flex flex-col bg-white dark:bg-gray-900">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold">Konversation</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Sprechen Sie auf Deutsch oder Englisch - ich antworte auf Deutsch</p>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`
                                    max-w-[80%] p-4 rounded-2xl
                                    ${msg.sender === 'user' 
                                        ? 'bg-primary text-white rounded-br-sm' 
                                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-gray-900 dark:text-white rounded-bl-sm border-2 border-yellow-300 dark:border-yellow-700'
                                    }
                                `}>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                    {msg.sender === 'assistant' && (
                                        <button
                                            onClick={() => handleAddPhrase(msg.text)}
                                            className="self-start flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-base">add_circle</span>
                                            <span>Zur Phrasenliste hinzufügen</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {isProcessing && (
                            <div className="flex justify-start">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-2xl rounded-bl-sm border-2 border-yellow-300 dark:border-yellow-700">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Category Selection Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">Kategorie wählen</h3>
                        <div className="space-y-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => savePhrase(cat)}
                                    className="w-full p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {cat}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    const newCat = prompt('Neue Kategorie:');
                                    if (newCat) savePhrase(newCat);
                                }}
                                className="w-full p-3 text-left rounded-lg border-2 border-dashed border-gray-300 hover:border-primary transition-colors"
                            >
                                + Neue Kategorie erstellen
                            </button>
                        </div>
                        <button
                            onClick={() => setShowCategoryModal(false)}
                            className="mt-4 w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                        >
                            Abbrechen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};