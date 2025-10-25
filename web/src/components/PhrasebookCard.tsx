import React from 'react';

interface PhrasebookCardProps {
    title: string;
    description: string;
    onClick: () => void;
}

const PhrasebookCard: React.FC<PhrasebookCardProps> = ({ title, description, onClick }) => {
    return (
        <div
            className="phrasebook-card border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

export default PhrasebookCard;