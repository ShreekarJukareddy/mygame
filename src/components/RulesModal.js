import React from 'react';
import './RulesModal.css';

const RulesModal = ({ isOpen, onClose, gameType = 'movieguess' }) => {
    if (!isOpen) return null;

    const movieGuessRules = [
        {
            number: "1",
            text: "Guess the Telugu movie title letter by letter"
        },
        {
            number: "2",
            text: "You have 6 chances to guess wrong letters"
        },
        {
            number: "3",
            text: "Each correct letter reveals its position in the title"
        },
        {
            number: "4",
            text: "Guess the complete title before running out of chances"
        }
    ];

    const memoryCardRules = [
        {
            number: "1",
            text: "Find matching pairs by flipping cards"
        },
        {
            number: "2",
            text: "Only two cards can be flipped at once"
        },
        {
            number: "3",
            text: "Complete the game in as few moves as possible"
        },
        {
            number: "4",
            text: "Match all 8 pairs to win"
        }
    ];

    const rules = gameType === 'memorycard' ? memoryCardRules : movieGuessRules;

    return (
        <div className="rules-modal-overlay">
            <div className="rules-modal">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>How to Play</h2>
                <div className="rules-list">
                    {rules.map((rule) => (
                        <div key={rule.number} className="rule-item">
                            <span className="rule-number">{rule.number}</span>
                            <span className="rule-text">{rule.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RulesModal; 