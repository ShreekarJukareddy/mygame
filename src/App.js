import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Movieguess from './components/Movieguess';
import MemoryCard from './components/MemoryCard';

const App = () => {
    const [currentGame, setCurrentGame] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleGameSelection = (gameId) => {
        setCurrentGame(
            gameId === 1 ? 'Movieguess' :
            gameId === 2 ? 'MemoryCard' : null
        );
    };

    const handleBackToHome = () => {
        setCurrentGame(null);
    };

    return (
        <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {currentGame === 'Movieguess' ? (
                <Movieguess 
                    onBackToHome={handleBackToHome}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                />
            ) : currentGame === 'MemoryCard' ? (
                <MemoryCard 
                    onBackToHome={handleBackToHome}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                />
            ) : (
                <HomePage 
                    onStartGame={handleGameSelection}
                />
            )}
        </div>
    );
};

export default App;
