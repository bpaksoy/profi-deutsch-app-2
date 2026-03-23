'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import ChatSidebar from '../../components/ChatSidebar';
import ChatMessage from '../../components/ChatMessage';
import { ListeningAgentIcon } from '../../components/ListeningAgentIcon';

// Removed hardcoded avatars to use props instead.

interface ChatMessageData {
    type: 'ai' | 'user';
    sender: 'bot' | 'user';
    message: string;
    avatar: string;
    isTyping?: boolean;
    timestamp?: string;
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

export const ChatInterface = (props: {
    username: string;
    avatarUrl: string;
    aiAvatarUrl: string;
    apiBaseUrl: string;
}) => {
    const { getToken } = useAuth();
    const [isAgentListening, setIsAgentListening] = useState(false);
    const [messages, setMessages] = useState<ChatMessageData[]>([]);
    const [textInput, setTextInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [conversations, setConversations] = useState<{ id: string; topic: string }[]>([]);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
    const [selection, setSelection] = useState<{ text: string, x: number, y: number } | null>(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [phraseToSave, setPhraseToSave] = useState<string | null>(null);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        loadConversations();
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`${props.apiBaseUrl}/phrasebook/categories`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setAvailableCategories(data.map((cat: any) => cat.name));
            }
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    };

    useEffect(() => {
        if (currentConversationId) {
            loadMessages(currentConversationId);
        } else if (conversations.length > 0) {
            setCurrentConversationId(conversations[0].id);
        } else if (conversations.length === 0) {
            setMessages([
                { type: 'ai', sender: 'bot', message: 'Hallo! Ich bin Flo. Starte ein neues Gespräch!', avatar: props.aiAvatarUrl }
            ]);
        }
    }, [currentConversationId, conversations.length]);

    useEffect(() => {
        const handleSelection = () => {
            const selectionObj = window.getSelection();
            if (selectionObj && selectionObj.toString().trim().length > 0) {
                const range = selectionObj.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                setSelection({
                    text: selectionObj.toString().trim(),
                    x: rect.left + window.scrollX,
                    y: rect.top + window.scrollY - 40
                });
            } else {
                setSelection(null);
            }
        };

        document.addEventListener('mouseup', handleSelection);
        return () => document.removeEventListener('mouseup', handleSelection);
    }, []);

    const loadConversations = async () => {
        try {
            const token = await getToken();
            const res = await fetch(`${props.apiBaseUrl}/chat/conversations`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setConversations(data.map((c: any) => ({
                    id: c.id,
                    topic: c.topic,
                    createdAt: c.createdAt
                })));
            }
        } catch (e) {
            console.error("Failed to load conversations", e);
        }
    };

    const loadMessages = async (id: string) => {
        try {
            const token = await getToken();
            const res = await fetch(`${props.apiBaseUrl}/chat/conversations/${id}/messages`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                const formattedMessages: ChatMessageData[] = data.map((m: any) => ({
                    type: m.role === 'assistant' ? 'ai' : 'user',
                    sender: m.role === 'assistant' ? 'bot' : 'user',
                    message: m.content,
                    avatar: m.role === 'assistant' ? props.aiAvatarUrl : props.avatarUrl,
                    timestamp: m.timestamp
                }));
                setMessages(formattedMessages);
            }
        } catch (e) {
            console.error("Failed to load messages", e);
        }
    };

    const handleDeleteConversation = async (id: string) => {
        try {
            const token = await getToken();
            const res = await fetch(`${props.apiBaseUrl}/chat/conversations/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                if (currentConversationId === id) {
                    setCurrentConversationId(null);
                    setMessages([]);
                }
                loadConversations();
            }
        } catch (e) {
            console.error("Failed to delete conversation", e);
        }
    };

    const handleRenameConversation = async (id: string, newTopic: string) => {
        try {
            const token = await getToken();
            const res = await fetch(`${props.apiBaseUrl}/chat/conversations/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic: newTopic })
            });
            if (res.ok) {
                loadConversations();
            }
        } catch (e) {
            console.error("Failed to rename conversation", e);
        }
    };

    const handleNewChat = async () => {
        try {
            const token = await getToken();
            const res = await fetch(`${props.apiBaseUrl}/chat/conversations`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const newConv = await res.json();
                setConversations(prev => [{ id: newConv.id, topic: newConv.topic, createdAt: newConv.createdAt }, ...prev]);
                setCurrentConversationId(newConv.id);
                setMessages([{ type: 'ai', sender: 'bot', message: 'Hallo! Worüber möchtest du sprechen?', avatar: props.aiAvatarUrl, timestamp: new Date().toISOString() }]);
            }
        } catch (e) {
            console.error("Failed to create new chat", e);
        }
    };

    const handleTextSubmit = async () => {
        if (!textInput.trim() || isProcessing) return;

        const userMessage = textInput.trim();
        setTextInput('');
        setIsProcessing(true);

        const newUserMsg: ChatMessageData = {
            type: 'user',
            sender: 'user',
            message: userMessage,
            avatar: props.avatarUrl,
            timestamp: new Date().toISOString()
        };
        setMessages(current => [...current, newUserMsg]);

        try {
            const token = await getToken();
            const response = await fetch(`${props.apiBaseUrl}/chat/text`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationId: currentConversationId
                }),
            });

            if (!response.ok) throw new Error('Backend failed to respond.');

            const jsonResponse = await response.json();
            const aiMessage: ChatMessageData = {
                type: 'ai',
                sender: 'bot',
                message: jsonResponse.responseText || "Entschuldigung, ich konnte keine Antwort generieren.",
                avatar: props.aiAvatarUrl,
                isTyping: false,
                timestamp: new Date().toISOString()
            };

            setMessages(current => [...current, aiMessage]);
            if (jsonResponse.audioBase64) playAudioFromBase64(jsonResponse.audioBase64);

            if (jsonResponse.conversationId && jsonResponse.conversationId !== currentConversationId) {
                setCurrentConversationId(jsonResponse.conversationId);
            }
            loadConversations();
        } catch (error) {
            console.error('Text Submission Failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSubmitAudio = async (audioBlob: Blob) => {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'voice_input.webm');
        if (currentConversationId) formData.append('conversationId', currentConversationId);

        setIsProcessing(true);

        const placeholderUserMsg: ChatMessageData = {
            type: 'user',
            sender: 'user',
            message: '…wird verarbeitet',
            avatar: props.avatarUrl,
        };
        setMessages(current => [...current, placeholderUserMsg]);

        try {
            const token = await getToken();
            const response = await fetch(`${props.apiBaseUrl}/chat/stt`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            if (!response.ok) throw new Error('Backend failed to transcribe/respond.');

            const jsonResponse = await response.json();
            setMessages(current => current.map(msg =>
                msg.message === '…wird verarbeitet'
                    ? { ...msg, message: jsonResponse.transcript || "Stimme war undeutlich." }
                    : msg
            ));

            const aiMessage: ChatMessageData = {
                type: 'ai',
                sender: 'bot',
                message: jsonResponse.responseText || "Entschuldigung, ich konnte keine Antwort generieren.",
                avatar: props.aiAvatarUrl,
                isTyping: false,
                timestamp: new Date().toISOString()
            };
            setMessages(current => [...current, aiMessage]);

            if (jsonResponse.audioBase64) playAudioFromBase64(jsonResponse.audioBase64);
            if (jsonResponse.conversationId && jsonResponse.conversationId !== currentConversationId) {
                setCurrentConversationId(jsonResponse.conversationId);
            }
            loadConversations();
        } catch (error) {
            console.error('Submission Failed:', error);
            setMessages(current => current.map(msg =>
                msg.message === '…wird verarbeitet' ? { ...msg, message: 'Transkription fehlgeschlagen.' } : msg
            ));
        } finally {
            setIsProcessing(false);
        }
    };

    const playAudioFromBase64 = (base64Audio: string) => {
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
            audio.play().catch(err => console.error('Audio playback failed:', err));
            audio.onended = () => URL.revokeObjectURL(audioUrl);
        } catch (error) {
            console.error('Failed to play audio:', error);
        }
    };

    const { isRecording, startRecording, stopRecording } = useAudioRecorder(handleSubmitAudio);

    const handleMicClick = () => {
        if (isRecording) stopRecording();
        else startRecording();
    };

    const handleSavePhrase = () => {
        if (!selection) return;
        setPhraseToSave(selection.text);
        setShowCategoryModal(true);
        setSelection(null);
        window.getSelection()?.removeAllRanges();
    };

    const savePhraseWithCategory = async (category: string) => {
        if (!phraseToSave) return;
        try {
            const token = await getToken();
            const response = await fetch(`${props.apiBaseUrl}/phrasebook/phrases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    german: phraseToSave,
                    category: category,
                    context: 'Aus dem Chat gespeichert'
                })
            });
            if (response.ok) {
                window.dispatchEvent(new CustomEvent('phraseAdded'));
                setShowCategoryModal(false);
                setPhraseToSave(null);
            }
        } catch (e) {
            console.error('Failed to save phrase', e);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] w-full relative">
            {selection && (
                <div
                    className="fixed z-50 bg-black text-white px-3 py-1 rounded-lg shadow-lg cursor-pointer flex items-center gap-2 animate-in fade-in zoom-in duration-200"
                    style={{ left: selection.x, top: selection.y }}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSavePhrase();
                    }}
                >
                    <span className="material-symbols-outlined text-sm">bookmark</span>
                    <span className="text-sm font-medium">Speichern</span>
                </div>
            )}

            <ChatSidebar
                conversations={conversations}
                activeConversationId={currentConversationId || undefined}
                onSelectConversation={setCurrentConversationId}
                onNewChat={handleNewChat}
                onDeleteConversation={handleDeleteConversation}
                onRenameConversation={handleRenameConversation}
            />

            <main className="flex flex-1 flex-col">
                <header className="flex md:hidden items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-lg font-bold">Sprech-Buddy</h2>
                    <button className="p-2">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="mx-auto max-w-3xl">
                        {messages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                type={msg.type as 'ai' | 'user'}
                                sender={msg.sender as 'user' | 'bot'}
                                message={msg.message}
                                avatarUrl={msg.avatar}
                                isTyping={msg.isTyping ?? false}
                                timestamp={msg.timestamp}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div className="p-4 md:p-6 lg:p-8 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-border-dark flex flex-col items-center gap-6">
                    {/* ISOLATED MIC (Dedicated Voice Area) - FAVOURED FUNCTIONALITY */}
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={handleMicClick}
                            disabled={isProcessing}
                            className={`group relative size-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl
                                ${isRecording 
                                    ? 'bg-red-500 scale-110 shadow-red-500/40 ring-4 ring-red-500/20' 
                                    : 'bg-primary hover:bg-primary/90 shadow-primary/30'
                                } ${isProcessing ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
                        >
                             {isRecording ? (
                                <span className="material-symbols-outlined text-4xl text-white animate-pulse">stop</span>
                             ) : (
                                <ListeningAgentIcon isListening={isRecording} size="lg" />
                             )}
                             
                             {/* Label for Mic */}
                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded">
                                 Sprechen & Hören
                             </div>
                        </button>
                        
                        {(isRecording || isProcessing) && (
                            <div className="flex items-center justify-center gap-2 pt-1">
                                {isRecording && (
                                    <>
                                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                        <span className="text-sm font-bold text-red-500">Ich höre dir zu...</span>
                                    </>
                                )}
                                {isProcessing && !isRecording && (
                                    <>
                                        <span className="material-symbols-outlined text-base text-primary animate-spin">progress_activity</span>
                                        <span className="text-sm font-medium text-gray-500">Ich überlege...</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* TYPING BOX (Isolated functionality) */}
                    <div className="flex items-center gap-3 w-full max-w-3xl">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 hidden sm:block opacity-70"
                            style={{ backgroundImage: `url("${props.avatarUrl}")` }}>
                        </div>

                        <div className="flex w-full flex-1 items-stretch rounded-2xl h-11 bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus-within:border-primary/20 transition-all">
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-2xl text-text-light dark:text-text-dark focus:outline-0 border-none bg-transparent h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-sm font-normal leading-normal"
                                placeholder={isRecording ? "Warte, ich höre dir gerade zu..." : "Oder hier tippen..."}
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleTextSubmit();
                                    }
                                }}
                                disabled={isProcessing || isRecording}
                            />
                            <div className="flex items-center justify-center pr-2">
                                <button
                                    onClick={handleTextSubmit}
                                    className={`flex items-center justify-center p-2 rounded-full hover:bg-primary/10 text-gray-400 hover:text-primary transition-colors ${(!textInput.trim() || isProcessing || isRecording) ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    disabled={!textInput.trim() || isProcessing || isRecording}
                                >
                                    <span className="material-symbols-outlined text-xl">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Category Selection Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={() => { setShowCategoryModal(false); setPhraseToSave(null); }}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-bold mb-1">Kategorie wählen</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                            &quot;{phraseToSave?.substring(0, 80)}{(phraseToSave?.length ?? 0) > 80 ? '...' : ''}&quot; speichern in:
                        </p>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {availableCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => savePhraseWithCategory(cat)}
                                    className="w-full p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-base text-primary">folder</span>
                                    {cat}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    const newCat = prompt('Neue Kategorie:');
                                    if (newCat) savePhraseWithCategory(newCat);
                                }}
                                className="w-full p-3 text-left rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary transition-colors flex items-center gap-3"
                            >
                                <span className="material-symbols-outlined text-base">add</span>
                                Neue Kategorie erstellen
                            </button>
                        </div>
                        <button
                            onClick={() => { setShowCategoryModal(false); setPhraseToSave(null); }}
                            className="mt-4 w-full p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            Abbrechen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatInterface;