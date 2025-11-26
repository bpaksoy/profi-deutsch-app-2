'use client';

import React, { useEffect, useRef, useState } from 'react';
import ChatSidebar from '../../components/ChatSidebar';
import ChatMessage from '../../components/ChatMessage';
import { ListeningAgentIcon } from '../../components/ListeningAgentIcon';

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

interface AudioRecorderControls {
    isRecording: boolean;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
}


const chatHistory : ChatMessageData[] = [
  { type: 'ai', sender: 'bot', message: 'Hallo! Ich bin Flo und unterstütze dich beim Lernen. Worüber möchtest du heute reden? Du kannst ein Szenario wie \'Vorstellungsgespräch\' wählen oder du hast eine eigene Idee.', avatar: AI_AVATAR },
  { type: 'user', sender: 'user', message: 'Ich möchte ein Vorstellungsgespräch üben.', avatar: USER_AVATAR },
  // { type: 'ai', sender: 'bot', message: '', avatar: AI_AVATAR, isTyping: true }, // <-- TEMPORARILY COMMENT OUT
];

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
                // Clean up for the next recording
                audioChunksRef.current = []; 
                stream.getTracks().forEach(track => track.stop());

                 await submitCallback(audioBlob); 

                // You would typically call a submit function here
                // console.log('Recording finished. Audio Blob ready to send:', audioBlob);
                // Placeholder: return the blob for submission
                // setAudioBlob(audioBlob); 
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
  apiBaseUrl: string; // Receive the URL here
}) =>{
  const [isAgentListening, setIsAgentListening] = React.useState(false);
  const [messages, setMessages] = useState(chatHistory); 


  const [hasMounted, setHasMounted] = useState(false); // NEW STATE

  React.useEffect(() => {
    // This runs ONLY on the client after initial server render
    setHasMounted(true);
  }, []);

  const handleSubmitAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'voice_input.webm'); 

    // Add a "Transcribing..." placeholder message
    const placeholderUserMsg: ChatMessageData = {
        type: 'user',
        sender: 'user',
        message: 'Transcribing...',
        avatar: USER_AVATAR,
    };
    setMessages(current => [...current, placeholderUserMsg]);

    try {
        const response = await fetch(`${props.apiBaseUrl}/chat/stt`, {
            method: 'POST',
            body: formData,
        });
        
        if (!response.ok) {
            throw new Error('Backend failed to transcribe/respond.');
        }
        
        const jsonResponse = await response.json(); 
        console.log("Backend Response:", jsonResponse); 

        // Replace the 'Transcribing...' message with the actual transcript
        setMessages(current => current.map(msg => 
            msg.message === 'Transcribing...' 
                ? { ...msg, message: jsonResponse.transcript || "Stimme war undeutlich." } 
                : msg
        ));

        // Add AI response
        const aiMessage: ChatMessageData = {
            type: 'ai',
            sender: 'bot',
            message: jsonResponse.responseText  // ✅ FIXED: removed the extra .responseText
                || "Entschuldigung, ich konnte keine Antwort generieren.",
            avatar: AI_AVATAR,
            isTyping: false
        };

        setMessages(current => [...current, aiMessage]);

        // 🎵 PLAY THE AUDIO RESPONSE
        if (jsonResponse.audioBase64) {
            playAudioFromBase64(jsonResponse.audioBase64);
        }

        } catch (error) {
            console.error('Submission Failed:', error);
            setMessages(current => current.map(msg => 
                msg.message === 'Transcribing...' 
                    ? { ...msg, message: 'Transcription Failed.' } 
                    : msg
            ));
        }
    };

    const playAudioFromBase64 = (base64Audio: string) => {
        try {
            // Convert base64 to blob
            const byteCharacters = atob(base64Audio);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'audio/mpeg' });
            
            // Create audio URL and play
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
            
            audio.play()
                .then(() => console.log('Audio playing...'))
                .catch(err => console.error('Audio playback failed:', err));
            
            // Clean up URL after playback
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
            };
        } catch (error) {
            console.error('Failed to play audio:', error);
        }
    };

  const { isRecording, startRecording, stopRecording } = useAudioRecorder(handleSubmitAudio);

  const handleMicClick = () => {
        if (isRecording) {
            stopRecording();
            // TODO: Add logic here to send the final audio blob to your NestJS STT endpoint
        } else {
            startRecording();
        }
    };

  
    if (!hasMounted) {
        // Render a simple placeholder (or null) during the initial client render
        // to match what the server renders.
        return (
            <div className="flex h-[calc(100vh-64px)] w-full">
                <div className="flex-1 flex items-center justify-center">Chat wird geladen...</div>
            </div>
        ); 
    }

//   const { isRecording } = recorderControls;
  // CRITICAL: Next.js Layout (RootLayout/CustomLayout) should wrap this entire content.
  // We need to ensure that the layout wrapper provides the h-screen and flex-col structure.
  
  return (
    // This div needs to manage the full height and flexible structure for the sidebar/main area
    // NOTE: If you use CustomLayout, the h-screen must be in the RootLayout/CustomLayout.
    // Assuming CustomLayout already establishes flex-col min-h-screen, this can start below the TopNav
    <div className="flex h-[calc(100vh-64px)] w-full"> {/* Adjust height to exclude TopNav height (e.g., 64px) */}
        
        {/* Sidebar */}
        <ChatSidebar 
            username={props.username} 
            userAvatar={USER_AVATAR} 
            conversations={[]} 
            onSelectConversation={() => {}} 
        />

        {/* Main Chat Area */}
        <main className="flex flex-1 flex-col">
            
            {/* Mobile Header (Hidden on MD) */}
            <header className="flex md:hidden items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
                <h2 className="text-lg font-bold">Sprech-Buddy</h2>
                <button className="p-2">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </header>
            
            {/* Chat History Container (Scrollable) */}
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
                            placeholder="Tippe das Mikro an und sprich..." 
                        />
                        <div className="flex items-center justify-center pr-2">
                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={handleMicClick} 
                                    className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent"
                                >
                                {/* Pass the state to the visual component */}
                                <ListeningAgentIcon isListening={isRecording} size="sm" /> 
                                </button>
                                
                                <button >
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

export default ChatInterface;