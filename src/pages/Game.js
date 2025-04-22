import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Core from '../game/Core';
import '../styles/game.css';

function Game() {
    const [highScores, setHighScores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isGameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchHighScores = async () => {

            // try {
            //     const response = await fetch('https://highscore-backend.onrender.com/highscores');
            //     if (!response.ok) {
            //         throw new Error('Failed to fetch high scores');
            //     }
            //     const data = await response.json();
            //     setHighScores(data);
            // } catch (err) {
            //     setError(err.message);
            // } finally {
            //     setLoading(false);
            // }
        };

        fetchHighScores();
    }, []);

    return (
        <div className="game-page">
            <Navbar />

            <header className='game-header'>
            </header>
            <section className='game-section'>
                {isGameOver ? (
                    loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <div>
                            <ul>
                                <li>
                                    Score: {score}
                                </li>
                                {highScores.map((score, index) => (
                                    <li key={index}>
                                        {score.name}: {score.score}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setGameOver(false)}>Play Again?</button>
                        </div>
                    )
                ) : (
                    <div>
                        <Core setGameOver={setGameOver} score={score} setScore={setScore} />
                        {/*pass in the game state and score to the core game*/}
                    </div>
                )}
            </section>


        </div>
    );
}

export default Game;
