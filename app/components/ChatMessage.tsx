import React from 'react';

interface ChatMessageProps {
    role: 'user' | 'assistant';
    content: string;
    isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, isTyping }) => {
    const isUser = role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 px-1`}>
            <div
                className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${isUser
                    ? 'rounded-br-sm'
                    : 'rounded-bl-sm'
                    }`}
                style={{
                    background: isUser ? '#FF6B4A' : '#F9F8F6',
                    color: isUser ? '#FFFFFF' : '#1E3D2F',
                    border: '2px solid #1E3D2F',
                    boxShadow: isUser ? '4px 4px 0px rgba(30, 61, 47, 0.2)' : '2px 2px 0px rgba(30, 61, 47, 0.1)',
                }}
            >
                {/* Avatar area for assistant - only if not user */}
                {!isUser && (
                    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b-2" style={{ borderColor: 'rgba(30, 61, 47, 0.1)' }}>
                        <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                            style={{ background: '#1E3D2F', color: 'white' }}
                        >
                            AI
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider opacity-60">
                            Diagnostic System
                        </span>
                    </div>
                )}

                {/* Message content */}
                <div className={`font-body text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap ${!isUser && content.includes('>>') ? 'font-mono text-sm leading-tight' : ''}`}>
                    {isTyping ? (
                        <span className="flex items-center gap-1 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </span>
                    ) : (
                        content
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
