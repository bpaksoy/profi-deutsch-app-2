import React from 'react';

interface ChatSidebarProps {
    conversations: { id: string; name: string }[];
    username: string;
    userAvatar: string;
    onSelectConversation: (id: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ conversations, onSelectConversation }) => {
    return (
        <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
            <h3>Conversations</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {conversations.map((conversation) => (
                    <li
                        key={conversation.id}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee',
                        }}
                        onClick={() => onSelectConversation(conversation.id)}
                    >
                        {conversation.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;