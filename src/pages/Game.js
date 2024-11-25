import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/game.css';

function Game() {
    const [highScores, setHighScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGameOver, setGameOver] = useState(true);

    useEffect(() => {
        const fetchHighScores = async () => {
            try {
                const response = await fetch('https://highscore-backend.onrender.com/highscores');
                if (!response.ok) {
                    throw new Error('Failed to fetch high scores');
                }
                const data = await response.json();
                setHighScores(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHighScores();
    }, []);

    return (
        <div className="game-page">
            <Navbar />

            <header className='game-header'>
             <h1>Welcome to the Game</h1>
            </header>
            <section className='game-section'>
                {isGameOver ? (
                    loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <ul>
                            {highScores.map((score, index) => (
                                <li key={index}>
                                    {score.name}: {score.score}
                                </li>
                            ))}
                        </ul>
                    )
                ) : (
                    <p>Playing game</p>
                )}
            </section>

            <Footer />
        </div>
    );
}

export default Game;
