import React from 'react';

interface ProgressCardProps {
    title: string;
    progress: number; // Progress as a percentage (0-100)
}

const ProgressCard: React.FC<ProgressCardProps> = ({ title, progress }) => {
    return (
        <div style={styles.card}>
            <h3 style={styles.title}>{title}</h3>
            <div style={styles.progressBarContainer}>
                <div
                    style={{
                        ...styles.progressBar,
                        width: `${progress}%`,
                    }}
                />
            </div>
            <p style={styles.progressText}>{progress}% completed</p>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '18px',
        marginBottom: '12px',
    },
    progressBarContainer: {
        height: '10px',
        backgroundColor: '#f3f3f3',
        borderRadius: '5px',
        overflow: 'hidden',
        marginBottom: '8px',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4caf50',
    },
    progressText: {
        fontSize: '14px',
        color: '#555',
    },
};

export default ProgressCard;