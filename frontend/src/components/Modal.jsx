import React from 'react';

const Modal = ({ modalContent, closeModal }) => {
    if (!modalContent) return null;

    const isGenerating = modalContent.content === null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeModal}>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-lg w-full text-white shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold mb-4">{modalContent.title}</h3>
                {isGenerating ? (
                    <div className="flex items-center gap-2 text-slate-300"><div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>Loading suggestions...</div>
                ) : (
                    <div className="space-y-4 text-slate-300">
                        {modalContent.content?.map((line, index) => (
                            <p key={index} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">{line}</p>
                        ))}
                    </div>
                )}
                <button onClick={closeModal} className="mt-6 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Close</button>
            </div>
        </div>
    );
};

export default Modal;
