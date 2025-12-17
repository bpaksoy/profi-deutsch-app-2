import React from 'react';

interface ChatSidebarProps {
    conversations: { id: string; topic: string }[];
    activeConversationId?: string;
    username: string;
    userAvatar: string;
    onSelectConversation: (id: string) => void;
    onNewChat: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    conversations,
    activeConversationId,
    onSelectConversation,
    onNewChat
}) => {
    return (
        <aside className="hidden md:flex w-64 flex-col border-r border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
            <div className="p-4 border-b border-border-light dark:border-border-dark">
                <button
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Neues Gespräch</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Verlauf
                </h3>
                <div className="space-y-1">
                    {conversations.map((conversation) => (
                        <button
                            key={conversation.id}
                            onClick={() => onSelectConversation(conversation.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-3
                                ${activeConversationId === conversation.id
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg opacity-70">chat_bubble</span>
                            <span className="truncate">{conversation.topic || 'Neues Gespräch'}</span>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default ChatSidebar;