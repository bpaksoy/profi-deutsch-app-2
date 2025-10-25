import React from 'react';

interface ChatMessageProps {
    message: string;
    type: 'ai' | 'user';
    sender: 'user' | 'bot';
    avatarUrl: string;
    isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
    const isUser = sender === 'user';

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                margin: '10px 0',
            }}
        >
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
        </div>
    );
};

export default ChatMessage;