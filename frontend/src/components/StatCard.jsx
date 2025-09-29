import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ icon, label, value, color, change }) => (
  <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/80 text-white text-center flex flex-col items-center justify-center">
    <div className={`w-12 h-12 mx-auto bg-${color}-500/10 rounded-xl flex items-center justify-center mb-3 border border-${color}-500/20`}>
      {React.cloneElement(icon, { className: `w-6 h-6 text-${color}-400` })}
    </div>
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-slate-400 text-xs uppercase tracking-wider mt-1">{label}</div>
    {change && (
      <div className={`mt-2 text-sm font-medium flex items-center justify-center ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
        {change.startsWith('+') ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
        {change}
      </div>
    )}
  </div>
);

export default StatCard;
