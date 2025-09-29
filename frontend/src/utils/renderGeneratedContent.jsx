import React from 'react';

export const renderGeneratedContent = (content) => {
    if (!content) return null;
    return content.split('\n').map((line, index) => {
        if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-bold text-white mt-4 mb-2">{line.substring(4)}</h3>;
        if (line.startsWith('**')) return <p key={index} className="font-semibold text-slate-200 mt-2">{line.replace(/\*\*/g, '')}</p>;
        if (line.startsWith('- ')) return <li key={index} className="text-slate-300 list-disc ml-4">{line.substring(2)}</li>;
        return <p key={index} className="text-slate-300 mb-1">{line}</p>;
    });
};
