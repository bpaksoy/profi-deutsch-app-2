import React from 'react';

interface SpeakingPracticeCardProps {
    question: string;
    onAnswer: (answer: string) => void;
}

const SpeakingPracticeCard: React.FC<SpeakingPracticeCardProps> = ({ question, onAnswer }) => {
    const handleAnswer = () => {
        const answer = prompt('Your answer:');
        if (answer) {
            onAnswer(answer);
        }
    };

    return (
        <div style={styles.card}>
            <h2 style={styles.question}>{question}</h2>
            <button style={styles.button} onClick={handleAnswer}>
                Answer
            </button>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '400px',
        margin: '16px auto',
        textAlign: 'center' as 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    question: {
        fontSize: '18px',
        marginBottom: '12px',
    },
    button: {
        padding: '8px 16px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default SpeakingPracticeCard;