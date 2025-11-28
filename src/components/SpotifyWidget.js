import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SPOTIFY_API_URL = 'https://spotify-api-111147801991.us-central1.run.app';

const SpotifyWidget = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpotifyData = async () => {
            try {
                const response = await fetch(`${SPOTIFY_API_URL}/all`);
                if (!response.ok) throw new Error('Failed to fetch');
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSpotifyData();
        // refresh every 30 seconds
        const interval = setInterval(fetchSpotifyData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-pulse flex items-center gap-2 text-gray-500">
                    <SpotifyIcon className="w-5 h-5" />
                    <span>Loading Spotify data...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return null; // silently fail - don't show widget if API is down
    }

    const { currentlyPlaying, topArtists, topTracks } = data;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="w-full max-w-3xl mx-auto"
        >
            {/* header */}
            <div className="flex items-center justify-center gap-2 mb-6">
                <SpotifyIcon className="w-5 h-5 text-[#1DB954]" />
                <span className="text-sm text-gray-500">What I'm listening to</span>
            </div>

            {/* currently playing */}
            {currentlyPlaying && (
                <motion.a
                    href={currentlyPlaying.trackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="block mb-6 p-4 rounded-xl bg-gradient-to-r from-[#1DB954]/10 to-transparent border border-[#1DB954]/20 hover:border-[#1DB954]/40 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                src={currentlyPlaying.albumArt}
                                alt={currentlyPlaying.album}
                                className="w-14 h-14 rounded-lg shadow-lg"
                            />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#1DB954] rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#1DB954] font-medium mb-1">Now Playing</p>
                            <p className="text-white font-medium truncate">{currentlyPlaying.name}</p>
                            <p className="text-gray-400 text-sm truncate">{currentlyPlaying.artist}</p>
                        </div>
                        <EqualizerBars />
                    </div>
                </motion.a>
            )}

            {/* top artists and tracks grid */}
            <div className="grid sm:grid-cols-2 gap-4">
                {/* top artists */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-gray-500 mb-3">Top Artists This Month</p>
                    <div className="space-y-3">
                        {topArtists?.slice(0, 3).map((artist, index) => (
                            <motion.a
                                key={artist.name}
                                href={artist.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4 + index * 0.1 }}
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-3 group"
                            >
                                <span className="text-xs text-gray-600 w-4">{index + 1}</span>
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white group-hover:text-[#1DB954] transition-colors truncate">
                                        {artist.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {artist.genres?.[0] || 'Artist'}
                                    </p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* top tracks */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-gray-500 mb-3">Top Tracks This Month</p>
                    <div className="space-y-3">
                        {topTracks?.slice(0, 3).map((track, index) => (
                            <motion.a
                                key={track.name}
                                href={track.trackUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4 + index * 0.1 }}
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-3 group"
                            >
                                <span className="text-xs text-gray-600 w-4">{index + 1}</span>
                                <img
                                    src={track.albumArt}
                                    alt={track.album}
                                    className="w-10 h-10 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white group-hover:text-[#1DB954] transition-colors truncate">
                                        {track.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {track.artist}
                                    </p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// spotify logo ...not sponsored
const SpotifyIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
);

// animated equalizer bars for "now playing" :o
const EqualizerBars = () => (
    <div className="flex items-end gap-0.5 h-4">
        {[1, 2, 3].map((bar) => (
            <motion.div
                key={bar}
                className="w-1 bg-[#1DB954] rounded-full"
                animate={{
                    height: ['40%', '100%', '60%', '80%', '40%'],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: bar * 0.2,
                }}
            />
        ))}
    </div>
);

export default SpotifyWidget;
