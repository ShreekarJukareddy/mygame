import React from 'react';
import MatrixBackground from './MatrixBackground';
import './HomePage.css';

const HomePage = ({ onStartGame }) => {
    const games = [
        {
            id: 1,
            title: "CineGuess-Telugu",
            description: "Guess Telugu movie titles letter by letter",
            icon: "🎬",
            isActive: true
        },
        {
            id: 2,
            title: "Memory Match",
            description: "Test your memory by matching pairs of cards",
            icon: "🃏",
            isActive: true
        },
        {
            id: 3,
            title: "Song Guess",
            description: "Guess Telugu movie songs from lyrics",
            icon: "🎵",
            isActive: false
        }
    ];

    return (
        <div className="home-page">
            <MatrixBackground />
            <div className="home-content">
                <div className="title-container">
                    <div className="typing-effect">
                        <h1 className="title-word">Gamez-0007</h1>
                    </div>
                </div>

                <div className="games-grid">
                    {games.map(game => (
                        <div key={game.id} className={`game-card ${!game.isActive ? 'coming-soon' : ''}`}>
                            <span className="game-icon">{game.icon}</span>
                            <h2 className="game-card-title">{game.title}</h2>
                            <p className="game-card-description">{game.description}</p>
                            {game.isActive ? (
                                <button 
                                    className="play-button"
                                    onClick={() => onStartGame(game.id)}
                                >
                                    Play Now
                                </button>
                            ) : (
                                <div className="coming-soon-badge">
                                    <span>Coming Soon</span>
                                    <span className="sparkle">✨</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage; 