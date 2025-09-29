import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Wand2, Sparkles } from 'lucide-react';
import { audienceGrowth, topLocations } from '../data/mockData';
import { handleGenerate } from '../api/gemini';
import { renderGeneratedContent } from '../utils/renderGeneratedContent';

const Analytics = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState({});

    const onGenerate = async (type) => {
        setIsGenerating(true);
        await handleGenerate(type, setGeneratedContent);
        setIsGenerating(false);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Deep Dive Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80">
                    <h3 className="text-xl font-bold text-white mb-4">Audience Growth (in Thousands)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={audienceGrowth}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
                            <Bar dataKey="followers" fill="url(#colorUv)" name="Followers (K)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80">
                    <h3 className="text-xl font-bold text-white mb-4">Audience by Location</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={topLocations} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} >
                                {topLocations.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Wand2 /> AI Content Strategy Hub</h3>
                <p className="text-slate-400 text-sm mb-4">Let Gemini analyze this influencer's performance and generate actionable strategies to boost growth and engagement.</p>
                <button onClick={() => onGenerate('strategy')} disabled={isGenerating} className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 text-white px-5 py-2.5 rounded-lg font-semibold transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isGenerating ? <><div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> Generating...</> : <><Sparkles size={16} /> Generate Full Strategy</>}
                </button>
                {isGenerating && !generatedContent.strategy && <div className="mt-4 text-sm text-slate-300">AI is analyzing data...</div>}
                {generatedContent.strategy && (
                    <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700 max-w-none">{renderGeneratedContent(generatedContent.strategy)}</div>
                )}
            </div>
        </div>
    );
}

export default Analytics;
