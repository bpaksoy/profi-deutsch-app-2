import React from 'react';

interface RecentActivityCardProps {
    title: string;
    description: string;
    date: string;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ title, description, date }) => {
    return (
        <div className="recent-activity-card">
            <h3 className="recent-activity-title">{title}</h3>
            <p className="recent-activity-description">{description}</p>
            <span className="recent-activity-date">{date}</span>
        </div>
    );
};

export default RecentActivityCard;