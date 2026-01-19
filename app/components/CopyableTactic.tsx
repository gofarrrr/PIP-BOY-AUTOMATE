import React, { useState } from 'react';

interface CopyableTacticProps {
    label: string;
    content: string;
}

const CopyableTactic: React.FC<CopyableTacticProps> = ({ label, content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-4 border-2 border-[#33ff00]/30 rounded-sm overflow-hidden bg-[#001100]/50 font-vt323">
            <div className="bg-[#33ff00]/20 px-3 py-1 flex justify-between items-center border-b border-[#33ff00]/30">
                <span className="text-[#33ff00] font-bold text-sm tracking-widest">{label.toUpperCase()}</span>
                <button
                    onClick={handleCopy}
                    className={`text-xs px-3 py-0.5 rounded transition-all ${copied ? 'bg-[#33ff00] text-black' : 'border border-[#33ff00]/50 text-[#33ff00] hover:bg-[#33ff00]/20'
                        }`}
                >
                    {copied ? '[COPIED]' : '[COPY]'}
                </button>
            </div>
            <div className="p-3">
                <pre className="text-[#33ff00]/80 whitespace-pre-wrap break-words text-lg leading-tight font-vt323">
                    {content}
                </pre>
            </div>
            <div className="bg-[#001d00] px-3 py-1 text-[10px] text-[#33ff00]/40 italic border-t border-[#33ff00]/10 flex justify-between">
                <span>TACTICAL_EXTRACTION_PROTO</span>
                <span>VER_8.1.0</span>
            </div>
        </div>
    );
};

export default CopyableTactic;
