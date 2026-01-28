import React, { useState } from 'react';
import ChatPanel from './ChatPanel';

const FloatingChatButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasBeenOpened, setHasBeenOpened] = useState(() => {
        return localStorage.getItem('aiornot-chat-opened') === 'true';
    });

    const toggleChat = () => {
        if (!isOpen) {
            setHasBeenOpened(true);
            localStorage.setItem('aiornot-chat-opened', 'true');
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Floating Action Button - only visible when chat is closed */}
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                    style={{
                        background: '#FF6B4A',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    }}
                    aria-label="Open chat"
                >
                    {/* Chat icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>

                    {/* Pulse animation for first-time users */}
                    {!hasBeenOpened && (
                        <span
                            className="absolute inset-0 rounded-full animate-ping"
                            style={{
                                background: '#FF6B4A',
                                opacity: 0.5,
                            }}
                        />
                    )}
                </button>
            )}

            {/* Backdrop - visible on ALL devices when chat is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"
                    onClick={toggleChat}
                    aria-label="Close chat"
                />
            )}

            {/* Slide-out Chat Panel */}
            <div
                className={`fixed right-0 top-0 h-full z-40 transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{
                    width: 'min(400px, 100vw)',
                }}
            >
                {/* Chat Panel Container */}
                <div
                    className="h-full flex flex-col border-l-2"
                    style={{
                        background: '#FFFFFF',
                        borderColor: '#1E3D2F',
                        boxShadow: '-8px 0 30px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <style>{`
                        .chat-messages-container::-webkit-scrollbar {
                            width: 6px;
                        }
                        .chat-messages-container::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .chat-messages-container::-webkit-scrollbar-thumb {
                            background: #EBE8E2;
                            border-radius: 10px;
                        }
                        .chat-messages-container::-webkit-scrollbar-thumb:hover {
                            background: #D1CDC7;
                        }
                    `}</style>
                    {isOpen && <ChatPanel onClose={toggleChat} />}
                </div>
            </div>
        </>
    );
};

export default FloatingChatButton;
