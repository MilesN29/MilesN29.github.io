import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Core from '../game/Core';
import '../styles/game.css';

function Game() {
    // eslint-disable-next-line no-unused-vars
    const [highScores, setHighScores] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
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
        <div className="min-h-screen">
            <Navbar />

            <section className="pt-24 pb-32 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* game container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="rounded-2xl overflow-hidden bg-[rgba(30,30,30,0.8)] backdrop-blur-sm border border-white/5 shadow-2xl"
                    >
                        {/* game content */}
                        <div className="game-section p-4">
                            {isGameOver ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2 text-gray-400">
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading...
                                        </div>
                                    ) : error ? (
                                        <p className="text-red-400">Error: {error}</p>
                                    ) : (
                                        <div>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', bounce: 0.5 }}
                                                className="text-6xl mb-4"
                                            >
                                                🎮
                                            </motion.div>
                                            <h2 className="text-2xl font-bold text-white mb-2">Game Over!</h2>
                                            <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
                                                {score} points
                                            </p>
                                            
                                            {highScores.length > 0 && (
                                                <div className="mb-6">
                                                    <h3 className="text-sm text-gray-500 mb-3">High Scores</h3>
                                                    <ul className="space-y-2">
                                                        {highScores.map((s, index) => (
                                                            <li key={index} className="text-gray-400">
                                                                {s.name}: <span className="text-white">{s.score}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            
                                            <motion.button 
                                                onClick={() => setGameOver(false)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium rounded-xl shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-shadow"
                                            >
                                                Play Again
                                            </motion.button>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <div className="flex justify-center items-center">
                                    <Core setGameOver={setGameOver} score={score} setScore={setScore} />
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* controls help */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8 flex flex-wrap justify-center gap-4"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                            <kbd className="px-2 py-1 rounded bg-white/10 text-xs text-gray-400">A</kbd>
                            <kbd className="px-2 py-1 rounded bg-white/10 text-xs text-gray-400">D</kbd>
                            <span className="text-sm text-gray-500">Move</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                            <kbd className="px-2 py-1 rounded bg-white/10 text-xs text-gray-400">W</kbd>
                            <span className="text-sm text-gray-500">Jump</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                            <kbd className="px-2 py-1 rounded bg-white/10 text-xs text-gray-400">Shift</kbd>
                            <span className="text-sm text-gray-500">Sprint</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}

export default Game;
