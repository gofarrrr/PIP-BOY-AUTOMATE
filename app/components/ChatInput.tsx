import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
    onSend,
    disabled = false,
    placeholder = "Type your message..."
}) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        const trimmed = input.trim();
        if (trimmed && !disabled) {
            onSend(trimmed);
            setInput('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div
            className="flex items-center gap-2 p-4 border-t-2"
            style={{
                borderColor: '#1E3D2F',
                background: '#FFFFFF'
            }}
        >
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className="flex-1 resize-none rounded-2xl px-4 py-3 font-body text-sm md:text-base border-2 focus:outline-none focus:border-orange-500 transition-all"
                style={{
                    borderColor: '#1E3D2F',
                    background: '#F9F8F6',
                    color: '#1E3D2F',
                    minHeight: '48px',
                    maxHeight: '120px',
                }}
                onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                }}
            />
            <button
                onClick={handleSend}
                disabled={disabled || !input.trim()}
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale active:scale-90"
                style={{
                    background: '#FF6B4A',
                    color: 'white',
                    boxShadow: input.trim() ? '0 4px 12px rgba(255, 107, 74, 0.4)' : 'none',
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>
    );
};

export default ChatInput;
