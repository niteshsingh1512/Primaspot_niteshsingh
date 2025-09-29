import React from 'react';
import { Heart, MessageCircle, Tag, Sparkles, Star, Image as ImageIcon } from 'lucide-react';
import { formatNumber } from '../utils/formatNumber';

const PostCard = ({ post, onGenerateCaption, onAnalyzeImage }) => (
  <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/80 hover:border-cyan-500/50 transition-all duration-300 group flex flex-col">
    <div className="relative">
      {post.image ? (
        <img src={post.image} alt="Post" className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No Image Available</p>
          </div>
        </div>
      )}
      {post.qualityScore && (
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
          <span className="text-white text-xs font-medium">{post.qualityScore}/10</span>
        </div>
      )}
    </div>
    
    <div className="p-4 flex flex-col flex-grow">
      <p className="text-slate-300 text-sm mb-3 line-clamp-2 h-10">{post.caption}</p>
      
      {/* Engagement Stats */}
      <div className="flex justify-between items-center text-slate-400 text-xs mb-4 pb-3 border-b border-slate-700/50">
        <div className="flex items-center gap-1.5">
          <Heart size={14} className="text-red-400" />
          <span className="text-white font-medium">{formatNumber(post.likes)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MessageCircle size={14} className="text-blue-400" />
          <span className="text-white font-medium">{formatNumber(post.comments)}</span>
        </div>
      </div>

      {/* Image Analysis Section */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
            <Tag size={12} />
            <span className="font-medium">Keywords</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 4).map((tag, idx) => (
              <span key={idx} className="text-xs bg-slate-700/50 text-cyan-300 px-2 py-0.5 rounded-full border border-slate-600/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Vibe/Ambience */}
      {post.vibe && (
        <div className="mb-3">
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
            <Sparkles size={12} />
            <span className="font-medium">Vibe</span>
          </div>
          <span className="inline-block text-xs text-purple-300 font-medium bg-purple-500/20 border border-purple-500/30 px-3 py-1 rounded-full">
            {post.vibe}
          </span>
        </div>
      )}

      {/* Quality Indicators */}
      {post.qualityIndicators && (
        <div className="mb-3">
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
            <ImageIcon size={12} />
            <span className="font-medium">Quality</span>
          </div>
          <div className="space-y-1">
            {post.qualityIndicators.lighting && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Lighting</span>
                <span className="text-green-400 font-medium">{post.qualityIndicators.lighting}</span>
              </div>
            )}
            {post.qualityIndicators.appeal && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Visual Appeal</span>
                <span className="text-green-400 font-medium">{post.qualityIndicators.appeal}</span>
              </div>
            )}
            {post.qualityIndicators.consistency && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Consistency</span>
                <span className="text-green-400 font-medium">{post.qualityIndicators.consistency}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="pt-3 mt-auto space-y-2 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>{post.date}</span>
        </div>
        
        {!post.tags || post.tags.length === 0 ? (
          <button 
            onClick={() => onAnalyzeImage(post)} 
            className="w-full bg-purple-600/50 hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ImageIcon size={16}/> Analyze Image
          </button>
        ) : null}
        
        <button 
          onClick={() => onGenerateCaption(post)} 
          className="w-full bg-cyan-600/50 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles size={16}/> Generate Captions
        </button>
      </div>
    </div>
  </div>
);

export default PostCard;