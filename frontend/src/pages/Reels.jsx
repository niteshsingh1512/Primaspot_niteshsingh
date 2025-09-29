import React, { useState, useEffect } from 'react';
import ReelCard from '../components/ReelCard.jsx';
import { getRecentReels } from '../api/instaService.js';
import useStore from '../store/instaStore.js';
import { Loader2, Film, TrendingUp } from 'lucide-react';

const Reels = () => {
    const { instaId } = useStore();
    const [reels, setReels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!instaId) {
            setError('No Instagram ID found');
            setIsLoading(false);
            return;
        }

        const fetchReels = async () => {
            try {
                const to = new Date();
                const from = new Date();
                from.setFullYear(from.getFullYear() - 1);
                
                const formatDate = (date) => {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}.${month}.${year}`;
                };

                const reelsData = await getRecentReels(
                    instaId,
                    formatDate(from),
                    formatDate(to)
                );
                
                setReels(reelsData);
            } catch (err) {
                setError('Failed to load reels');
                console.error('Error fetching reels:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReels();
    }, [instaId]);

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-2xl">
                        <Film className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-white">Reels Performance</h2>
                        <p className="text-slate-400 text-sm mt-1">Analyzing your latest video content</p>
                    </div>
                </div>

                <div className="flex items-center justify-center h-96 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <Loader2 className="w-16 h-16 text-pink-500 animate-spin" />
                            <div className="absolute inset-0 w-16 h-16 rounded-full bg-pink-500/20 animate-ping" />
                        </div>
                        <div className="text-slate-300 text-lg font-medium">Loading reels...</div>
                        <div className="text-slate-500 text-sm">Fetching latest content</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-2xl">
                        <Film className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-white">Reels Performance</h2>
                        <p className="text-slate-400 text-sm mt-1">Analyzing your latest video content</p>
                    </div>
                </div>

                <div className="flex items-center justify-center h-96 bg-gradient-to-br from-red-900/20 to-slate-900/50 rounded-3xl border border-red-500/30">
                    <div className="text-center">
                        <div className="text-red-400 text-xl font-semibold mb-2">{error}</div>
                        <div className="text-slate-500 text-sm">Please try refreshing the page</div>
                    </div>
                </div>
            </div>
        );
    }

    if (reels.length === 0) {
        return (
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-2xl">
                        <Film className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-white">Reels Performance</h2>
                        <p className="text-slate-400 text-sm mt-1">Analyzing your latest video content</p>
                    </div>
                </div>

                <div className="flex items-center justify-center h-96 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50">
                    <div className="text-center">
                        <Film className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <div className="text-slate-400 text-lg font-medium mb-2">No reels found</div>
                        <div className="text-slate-500 text-sm">No reels were posted in the last year</div>
                    </div>
                </div>
            </div>
        );
    }

    const totalViews = reels.reduce((sum, reel) => sum + (reel.videoViews || 0), 0);
    const totalLikes = reels.reduce((sum, reel) => sum + (reel.likes || 0), 0);
    const avgViews = Math.round(totalViews / reels.length);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-2xl shadow-lg shadow-pink-500/30">
                            <Film className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-white">Reels Performance</h2>
                            <p className="text-slate-400 text-sm mt-1">Analyzing your latest video content</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-slate-400 text-sm">Total Reels</div>
                        <div className="text-3xl font-bold text-white">{reels.length}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm font-medium">Total Views</span>
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-3xl font-bold text-white">{formatNumber(totalViews)}</div>
                        <div className="text-slate-500 text-xs mt-1">Across all reels</div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20 rounded-2xl p-6 hover:border-pink-500/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm font-medium">Total Likes</span>
                            <TrendingUp className="w-5 h-5 text-pink-400" />
                        </div>
                        <div className="text-3xl font-bold text-white">{formatNumber(totalLikes)}</div>
                        <div className="text-slate-500 text-xs mt-1">Across all reels</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm font-medium">Avg Views</span>
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="text-3xl font-bold text-white">{formatNumber(avgViews)}</div>
                        <div className="text-slate-500 text-xs mt-1">Per reel</div>
                    </div>
                </div>
            </div>
            
            {/* Grid locked to 3 columns on all screen sizes except mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {reels.map((reel) => (
                    <ReelCard 
                        key={reel.dataId || reel.postID} 
                        reel={reel}
                    />
                ))}
            </div>
        </div>
    );
};

export default Reels;