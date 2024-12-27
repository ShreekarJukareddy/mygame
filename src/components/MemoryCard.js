import React, { useState, useEffect } from 'react';
import Header from './Header';
import RulesModal from './RulesModal';
import './MemoryCard.css';

const MemoryCard = ({ onBackToHome, isDarkMode, toggleTheme }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [moves, setMoves] = useState(0);
    const [showRules, setShowRules] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [bestScore, setBestScore] = useState(
        localStorage.getItem('memoryGameBestScore') || '∞'
    );

    // Exactly 8 pairs for 16 cards total
    const cardPairs = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺'];

    const initializeGame = () => {
        // Create pairs from exactly 8 emojis
        const shuffledCards = [...cardPairs, ...cardPairs]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({
                id: index,
                emoji: emoji,
                isFlipped: false,
                isMatched: false
            }));
        
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedPairs([]);
        setMoves(0);
        setGameOver(false);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        if (gameOver && moves < bestScore) {
            localStorage.setItem('memoryGameBestScore', moves);
            setBestScore(moves);
        }
    }, [gameOver, moves]);

    const handleCardClick = (clickedCard) => {
        if (
            flippedCards.length === 2 || 
            flippedCards.includes(clickedCard.id) ||
            matchedPairs.includes(clickedCard.id)
        ) return;

        const newFlippedCards = [...flippedCards, clickedCard.id];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves(prev => prev + 1);
            
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(card => card.id === firstCardId);
            const secondCard = cards.find(card => card.id === secondCardId);

            if (firstCard.emoji === secondCard.emoji) {
                setMatchedPairs(prev => [...prev, firstCardId, secondCardId]);
                setFlippedCards([]);

                // Check if all 8 pairs are matched
                if (matchedPairs.length + 2 === 16) {
                    setGameOver(true);
                }
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <div className={`memory-game ${isDarkMode ? 'dark-mode' : ''}`}>
            <Header 
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                onBackToHome={onBackToHome}
                onShowRules={() => setShowRules(true)}
                onStartGame={initializeGame}
                gameOver={gameOver}
            />

            <div className="game-stats">
                <div className="moves-counter">
                    🎯 Moves: <span key={moves}>{moves}</span>
                </div>
                <div className="best-score">
                    🏆 Best: <span key={bestScore}>{bestScore}</span>
                </div>
                {gameOver && (
                    <div className="game-over-message">
                        🎉 Congratulations! You won in {moves} moves! 🎉
                        {moves < bestScore && " 🌟 That's a new best score! 🌟"}
                    </div>
                )}
            </div>

            <div className="cards-grid">
                {cards.map(card => (
                    <div
                        key={card.id}
                        className={`memory-card ${
                            flippedCards.includes(card.id) || matchedPairs.includes(card.id)
                                ? 'flipped'
                                : ''
                        } ${matchedPairs.includes(card.id) ? 'matched' : ''}`}
                        onClick={() => handleCardClick(card)}
                    >
                        <div className="card-inner">
                            <div className="card-front"></div>
                            <div className="card-back">
                                {card.emoji}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <RulesModal
                isOpen={showRules}
                onClose={() => setShowRules(false)}
                gameType="memorycard"
            />
        </div>
    );
};

export default MemoryCard; 