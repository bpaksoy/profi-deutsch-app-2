import React from 'react';

interface ChatMessageProps {
    message: string;
    type: 'ai' | 'user'; // Type is a good key for styling
    sender: 'user' | 'bot'; // Sender is used for logic/display
    avatarUrl: string;
    isTyping?: boolean;
}
const API_BASE_URL = 'http://localhost:8000'; // BASE_URL is correct

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender, isTyping = false  }) => {
    const isUser = sender === 'user';
    const isBot = sender === 'bot'; // Use 'bot' to trigger TTS
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    // Function to call NestJS and stream the audio
    const playAudio = async () => {
        if (!isBot || !message) return;

        // 1. Construct the URL with URLSearchParams for safe encoding
        const params = new URLSearchParams({ text: message });
        const ttsUrl = `${API_BASE_URL}/chat/tts?${params.toString()}`;

        try {
            // 2. Create or reuse an invisible audio element
            if (!audioRef.current) {
                audioRef.current = new Audio();
                // Optionally append to body if necessary, though not always needed
                // document.body.appendChild(audioRef.current);
            }
            
            // 3. Set the source to the NestJS endpoint
            audioRef.current.src = ttsUrl;
            
            // 4. Play the audio
            await audioRef.current.play();
            
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                margin: '10px 0',
                alignItems: 'flex-end' // Align elements to the bottom
            }}
        >
            {/* Message Bubble Container */}
            <div
                style={{
                    maxWidth: '70%',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: isUser ? '#0078d4' : '#e1e1e1',
                    color: isUser ? '#fff' : '#000',
                }}
            >
                {message}
            </div>
            
            {/* TTS Playback Button (Only for the Bot's message) */}
            {isBot && !isTyping &&  (
                <button 
                    onClick={playAudio} 
                    style={{ 
                        marginLeft: isUser ? '0' : '5px', 
                        marginRight: isUser ? '5px' : '0',
                        padding: '5px',
                        cursor: 'pointer',
                        background: 'transparent',
                        border: 'none',
                        color: isUser ? '#0078d4' : '#555', // Adjust color as needed
                    }}
                    title="Listen to message"
                >
                    {/* Material Symbols Outlined is assumed to be imported globally */}
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>volume_up</span>
                </button>
            )}
        </div>
    );
};

export default ChatMessage;