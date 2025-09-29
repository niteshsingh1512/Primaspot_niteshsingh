import React, { useState } from 'react';
import { Bot, User, Users, TrendingUp, Globe } from 'lucide-react';

const Audience = ({ profileData }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState({});

    // Use the profileData passed from App.jsx
    const audienceData = profileData ? {
        genders: profileData.genders || [],
        ages: profileData.ages || [],
        countries: profileData.countries || [],
        cities: profileData.cities || [],
        interests: profileData.interests || [],
        qualityScore: profileData.qualityScore || 0
    } : null;

    const formatAgeRange = (ages) => {
        if (!ages || ages.length === 0) return 'N/A';
        const topAge = ages[0];
        return topAge.name.replace('_', '-') + ' years';
    };

    const formatGenderSplit = (genders) => {
        if (!genders || genders.length === 0) return { female: 0, male: 0 };
        const female = genders.find(g => g.name === 'f');
        const male = genders.find(g => g.name === 'm');
        return {
            female: female ? (female.percent * 100).toFixed(1) : 0,
            male: male ? (male.percent * 100).toFixed(1) : 0
        };
    };

    const formatTopLocations = (countries) => {
        if (!countries || countries.length === 0) return [];
        return countries.slice(0, 3).map(c => 
            c.name.charAt(0).toUpperCase() + c.name.slice(1).replace('-', ' ')
        );
    };

    const onGenerate = async () => {
        setIsGenerating(true);
        // Simulate AI generation - replace with actual API call to your Gemini service
        setTimeout(() => {
            const topCountries = formatTopLocations(audienceData?.countries).join(', ');
            const ageRange = formatAgeRange(audienceData?.ages);
            const genderData = formatGenderSplit(audienceData?.genders);
            
            setGeneratedContent({
                persona: `Based on the comprehensive demographic analysis, the typical follower is a ${ageRange} individual with a ${genderData.female > genderData.male ? 'predominantly female' : 'balanced gender'} audience distribution (${genderData.female}% female, ${genderData.male}% male). 

The audience shows strong geographic diversity, with primary concentrations in ${topCountries}. This international following suggests content that resonates across cultural boundaries and appeals to a globally-minded audience.

The quality score of ${(audienceData?.qualityScore * 100).toFixed(1)}% indicates a highly engaged and authentic follower base. This demographic is likely interested in leadership, governance, and social issues, actively engaging with content that reflects their values and aspirations.

Key characteristics:
• Digitally savvy and socially conscious
• Values authentic leadership and transparent communication
• Seeks meaningful content over superficial engagement
• Part of a community-oriented, politically aware demographic
• High propensity for sharing and discussing content within their networks`
            });
            setIsGenerating(false);
        }, 2000);
    };

    if (!profileData || !audienceData) {
        return (
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white">Audience Insights</h2>
                <div className="flex items-center justify-center h-64">
                    <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    const genderSplit = formatGenderSplit(audienceData?.genders);
    const topLocations = formatTopLocations(audienceData?.countries);

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Audience Insights</h2>
            
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <TrendingUp className="text-purple-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white">Engagement Quality</h3>
                    </div>
                    <div className="text-4xl font-bold text-purple-400 mb-2">
                        {audienceData?.qualityScore ? (audienceData.qualityScore * 100).toFixed(1) : 0}%
                    </div>
                    <p className="text-slate-400 text-sm">Quality Score</p>
                </div>

                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Users className="text-blue-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white">Gender Distribution</h3>
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                        {genderSplit.female}% / {genderSplit.male}%
                    </div>
                    <p className="text-slate-400 text-sm">Female / Male</p>
                </div>

                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <User className="text-green-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white">Primary Age Group</h3>
                    </div>
                    <div className="text-3xl font-bold text-green-400 mb-2">
                        {formatAgeRange(audienceData?.ages)}
                    </div>
                    <p className="text-slate-400 text-sm">Most Common Age</p>
                </div>
            </div>

            {/* Demographics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Geographic Distribution */}
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Globe size={24} className="text-blue-400" />
                        Geographic Distribution
                    </h3>
                    <div className="space-y-4">
                        {audienceData?.countries.slice(0, 5).map((country, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-300 capitalize">{country.name.replace('-', ' ')}</span>
                                    <span className="text-white font-semibold">{(country.percent * 100).toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-slate-700/50 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${country.percent * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Age Demographics */}
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Users size={24} className="text-purple-400" />
                        Age Demographics
                    </h3>
                    <div className="space-y-4">
                        {audienceData?.ages.slice(0, 5).map((age, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-300">{age.name.replace('_', '-')} years</span>
                                    <span className="text-white font-semibold">{(age.percent * 100).toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-slate-700/50 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${age.percent * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Persona Generation */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Bot className="text-green-400" /> AI-Generated Persona
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                    Generate a detailed persona of the typical follower based on demographic data to better understand their motivations and pain points.
                </p>
                <button 
                    onClick={onGenerate} 
                    disabled={isGenerating} 
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:opacity-90 text-white px-5 py-2.5 rounded-lg font-semibold transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGenerating ? (
                        <>
                            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                            Generating Persona...
                        </>
                    ) : (
                        <>
                            <User size={16} /> Create Persona
                        </>
                    )}
                </button>
                {isGenerating && !generatedContent.persona && (
                    <div className="mt-4 text-sm text-slate-300">AI is crafting a persona...</div>
                )}
                {generatedContent.persona && (
                    <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                        <p className="text-slate-300 leading-relaxed whitespace-pre-line">{generatedContent.persona}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Audience;