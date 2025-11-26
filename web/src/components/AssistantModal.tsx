
'use client';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'assistant';
}

export const AssistantModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (userMessage: string) => {
        if (!userMessage.trim() || isLoading) return;

        const newUserMessage: Message = { id: Date.now(), text: userMessage, sender: 'user' };
        setMessages(current => [...current, newUserMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/chat/assistant`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });
            
            const data = await response.json();
            
            const assistantMessage: Message = {
                id: Date.now() + 1,
                text: data.response || "Entschuldigung, ich bin abgelenkt.",
                sender: 'assistant'
            };
            
            setMessages(current => [...current, assistantMessage]);

        } catch (error) {
            console.error(error);
            setMessages(current => [...current, { id: Date.now() + 1, text: "Verbindungsfehler.", sender: 'assistant' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Auto-send initial "High Five" on load
    React.useEffect(() => {
        sendMessage("High Five");
    }, []);

    // ... (rest of the modal UI structure) ...
    // You would implement the UI here with an input box and message map
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            {/* Modal Box */}
            <div className="bg-white dark:bg-card-dark w-full max-w-sm rounded-lg shadow-xl flex flex-col h-[60vh]">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-bold">Lern-Buddy</h3>
                    <button onClick={onClose}>X</button>
                </div>
                {/* Message History Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map(msg => (
                        <div key={msg.id} className={twMerge("flex", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                            <div className={twMerge("p-2 rounded-lg max-w-[75%]", msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700')}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && <p className="text-sm text-gray-500">Muss noch überlegen...</p>}
                </div>
                {/* Input Composer */}
                <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="p-4 border-t flex gap-2">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} placeholder="Deine Frage..." className="flex-1 p-2 border rounded-lg" />
                    <button type="submit" disabled={isLoading} className="bg-primary text-white p-2 rounded-lg">Send</button>
                </form>
            </div>
        </div>
    );
};