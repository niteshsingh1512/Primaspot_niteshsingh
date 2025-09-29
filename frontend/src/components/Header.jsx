import React, { useState } from 'react';
import { Search, Bell, ChevronDown, X } from 'lucide-react';

const Header = ({ profileData, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        
        // Format the search query to be an Instagram URL if it's just a username
        let formattedQuery = searchQuery.trim();
        
        // If it doesn't start with http, assume it's a username
        if (!formattedQuery.startsWith('http')) {
            // Remove @ if user typed it
            formattedQuery = formattedQuery.replace('@', '');
            formattedQuery = `https://www.instagram.com/${formattedQuery}/`;
        }
        
        // Call the search function passed from App.js
        const success = await onSearch(formattedQuery);
        
        setIsSearching(false);
        
        // Clear search box on success
        if (success) {
            setSearchQuery('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <header className="flex-shrink-0 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/80 p-4 flex items-center justify-between sticky top-0 z-40">
            <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Search influencers (e.g. username)" 
                    className="bg-slate-800/50 text-white placeholder-slate-500 rounded-lg pl-10 pr-20 py-2 w-96 border border-transparent hover:border-slate-700 focus:border-cyan-500 focus:outline-none transition-colors" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isSearching}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {searchQuery && !isSearching && (
                        <button 
                            onClick={clearSearch}
                            className="text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                    {isSearching && (
                        <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-6">
                <button className="text-slate-400 hover:text-white transition-colors relative">
                    <Bell size={20} />
                </button>
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <img 
                        src={profileData.profilePicture} 
                        alt="Profile" 
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-700" 
                    />
                    <div className="hidden md:block">
                        <p className="text-white text-sm font-medium">{profileData.displayName}</p>
                        <p className="text-slate-500 text-xs">@{profileData.username}</p>
                    </div>
                    <ChevronDown size={16} className="text-slate-500" />
                </div>
            </div>
        </header>
    );
};

export default Header;