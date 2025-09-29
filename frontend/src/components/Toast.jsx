import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle size={20} className="text-green-400" />,
        error: <XCircle size={20} className="text-red-400" />,
        info: <Info size={20} className="text-cyan-400" />
    };

    const colors = {
        success: 'bg-green-900/80 border-green-500',
        error: 'bg-red-900/80 border-red-500',
        info: 'bg-cyan-900/80 border-cyan-500'
    };

    return (
        <div className={`fixed top-20 right-6 ${colors[type]} backdrop-blur-sm border rounded-lg p-4 shadow-lg z-50 flex items-center gap-3 min-w-[300px] animate-slide-in`}>
            {icons[type]}
            <p className="text-white text-sm flex-1">{message}</p>
            <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;