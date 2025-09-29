import React, { useState } from 'react';
import { Play, Eye, Heart, MessageCircle, ExternalLink } from 'lucide-react';

const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

const ReelCard = ({ reel }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="group bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/50 hover:border-pink-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-1">
            
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] overflow-hidden">
                {!imageError ? (
                    <img 
                        src={reel.postImage} 
                        alt="Reel thumbnail" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <Play className="w-20 h-20 text-slate-600" />
                    </div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a 
                        href={reel.postUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-6 shadow-2xl transform transition-all duration-300 hover:scale-125 hover:rotate-12 hover:shadow-pink-500/50"
                    >
                        <Play className="w-12 h-12 text-white drop-shadow-lg" fill="currentColor" />
                    </a>
                </div>
                
                {/* Reel Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500/90 to-purple-600/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow-lg">
                    <Play className="w-3 h-3" fill="currentColor" />
                    REEL
                </div>
                
                {/* Date Badge */}
                <div className="absolute bottom-4 left-4 text-white text-xs font-semibold bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    {new Date(reel.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
                
                {/* Caption */}
                <div className="min-h-[80px]">
                    <p className="text-slate-300 text-base leading-relaxed line-clamp-3">
                        {reel.text || 'No caption available'}
                    </p>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4 hover:bg-blue-500/20 transition-colors duration-300">
                        <Eye className="w-6 h-6 text-blue-400 mb-2" />
                        <span className="text-white font-bold text-lg">{formatNumber(reel.videoViews)}</span>
                        <span className="text-slate-400 text-xs mt-1">Views</span>
                    </div>
                    <div className="flex flex-col items-center bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20 rounded-xl p-4 hover:bg-pink-500/20 transition-colors duration-300">
                        <Heart className="w-6 h-6 text-pink-400 mb-2" />
                        <span className="text-white font-bold text-lg">{formatNumber(reel.likes)}</span>
                        <span className="text-slate-400 text-xs mt-1">Likes</span>
                    </div>
                    <div className="flex flex-col items-center bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-4 hover:bg-green-500/20 transition-colors duration-300">
                        <MessageCircle className="w-6 h-6 text-green-400 mb-2" />
                        <span className="text-white font-bold text-lg">{formatNumber(reel.comments)}</span>
                        <span className="text-slate-400 text-xs mt-1">Comments</span>
                    </div>
                </div>
                
                {/* View Button */}
                <a 
                    href={reel.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold py-3.5 px-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 w-full shadow-lg hover:shadow-xl hover:shadow-pink-500/30 transform hover:scale-105"
                >
                    <ExternalLink className="w-4 h-4" />
                    View on Instagram
                </a>
            </div>
        </div>
    );
};

export default ReelCard;