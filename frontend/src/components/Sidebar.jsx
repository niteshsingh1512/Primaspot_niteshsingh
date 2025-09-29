import React from 'react';
import { Home, Grid, Film, BarChart3, Users, Settings, Activity, Download } from 'lucide-react';

const sidebarItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'posts', icon: Grid, label: 'Posts' },
    { id: 'reels', icon: Film, label: 'Reels' },
    { id: 'audience', icon: Users, label: 'Audience' },
    { id: 'settings', icon: Download, label: 'Download Report' }
];

const Sidebar = ({ activePage, setActivePage, profileData }) => (
    <div className="w-20 lg:w-64 bg-slate-900/80 backdrop-blur-sm border-r border-slate-700/80 p-4 flex flex-col fixed h-full">
        <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl hidden lg:block">Dashboard</span>
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto">
            {sidebarItems.map(item => (
                <button key={item.id} onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${activePage === item.id ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="hidden lg:block text-sm">{item.label}</span>
                </button>
            ))}
        </nav>

        <div className="pt-4 border-t border-slate-700/80 flex-shrink-0">
            <div className="flex items-center gap-3">
                <img src={profileData.profilePicture} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                <div className="hidden lg:block">
                    <div className="text-white text-sm font-medium">{profileData.displayName}</div>
                    <div className="text-slate-400 text-xs">@{profileData.username}</div>
                </div>
            </div>
        </div>
    </div>
);
 
export default Sidebar;
