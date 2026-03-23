import React from 'react';

interface ChatSidebarProps {
    conversations: { id: string; topic: string; createdAt?: string }[];
    activeConversationId?: string;
    onSelectConversation: (id: string) => void;
    onNewChat: () => void;
    onDeleteConversation: (id: string) => void;
    onRenameConversation: (id: string, newTopic: string) => void;
}

const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Heute';
    if (days === 1) return 'Gestern';
    if (days < 7) return `${days} Tg.`;
    return date.toLocaleDateString('de-DE', { month: 'short', day: 'numeric' });
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    conversations,
    activeConversationId,
    onSelectConversation,
    onNewChat,
    onDeleteConversation,
    onRenameConversation
}) => {
    return (
        <aside className="hidden md:flex w-64 flex-col border-r border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
            <div className="p-4 border-b border-border-light dark:border-border-dark">
                <button
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span className="font-semibold">Neues Gespräch</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Verlauf
                </h3>
                <div className="space-y-1">
                    {conversations.map((conversation) => (
                        <div key={conversation.id} className="group relative">
                            <button
                                onClick={() => onSelectConversation(conversation.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex flex-col gap-0.5
                                    ${activeConversationId === conversation.id
                                        ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                                        : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg opacity-70">chat_bubble</span>
                                    <span className="truncate flex-1 pr-6">{conversation.topic || 'Neues Gespräch'}</span>
                                </div>
                                <span className="text-[10px] opacity-50 pl-7">{formatDate(conversation.createdAt)}</span>
                            </button>
                            
                            {/* Hover Actions */}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 dark:bg-black/20 rounded-md p-1 backdrop-blur-sm">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newTopic = prompt('Gesprächsthema ändern:', conversation.topic);
                                        if (newTopic && newTopic !== conversation.topic) onRenameConversation(conversation.id, newTopic);
                                    }}
                                    className="p-1 hover:text-primary transition-colors text-gray-500"
                                    title="Umbenennen"
                                >
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm('Möchtest du dieses Gespräch wirklich löschen?')) onDeleteConversation(conversation.id);
                                    }}
                                    className="p-1 hover:text-red-500 transition-colors text-gray-500"
                                    title="Löschen"
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default ChatSidebar;