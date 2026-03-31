
'use client';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'assistant';
}

export const AssistantModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { getToken } = useAuth();

    const sendMessage = async (userMessage: string) => {
        if (!userMessage.trim() || isLoading) return;

        const newUserMessage: Message = { id: Date.now(), text: userMessage, sender: 'user' };
        const assistantPlaceholderId = Date.now() + 1;
        setMessages(current => [...current, newUserMessage, { id: assistantPlaceholderId, text: '', sender: 'assistant' }]);
        setInput('');
        setIsLoading(true);

        try {
            const token = await getToken();
            const response = await fetch(`${API_BASE_URL}/chat/text`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) throw new Error(`Backend error: ${response.status}`);

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No response body');

            const decoder = new TextDecoder();
            let buffer = '';
            let accumulatedText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;
                    const jsonStr = line.slice(6).trim();
                    if (!jsonStr) continue;

                    try {
                        const event = JSON.parse(jsonStr);
                        if (event.type === 'chunk') {
                            accumulatedText += event.content;
                            setMessages(current => current.map(m =>
                                m.id === assistantPlaceholderId ? { ...m, text: accumulatedText } : m
                            ));
                        } else if (event.type === 'done') {
                            const finalText = event.fullText || accumulatedText;
                            setMessages(current => current.map(m =>
                                m.id === assistantPlaceholderId ? { ...m, text: finalText } : m
                            ));
                        }
                    } catch {
                        // skip malformed JSON
                    }
                }
            }
        } catch (error) {
            console.error(error);
            setMessages(current => {
                const hasPlaceholder = current.some(m => m.id === assistantPlaceholderId);
                if (hasPlaceholder) {
                    return current.map(m =>
                        m.id === assistantPlaceholderId ? { ...m, text: "Verbindungsfehler." } : m
                    );
                }
                return [...current, { id: Date.now() + 1, text: "Verbindungsfehler.", sender: 'assistant' }];
            });
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