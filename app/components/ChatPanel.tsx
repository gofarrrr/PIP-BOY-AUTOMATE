import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { sendMessage, getInitialGreeting, ChatMessage as ChatMessageType } from '../lib/openrouter';

interface ChatPanelProps {
    onClose: () => void;
}

const STORAGE_KEY = 'aiornot-chat-history';

const ChatPanel: React.FC<ChatPanelProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasApiKey, setHasApiKey] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Load saved conversation or get initial greeting
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                    return;
                }
            } catch (e) {
                console.error('Failed to parse saved chat:', e);
            }
        }

        initConversation();
    }, []);

    // Save conversation to localStorage
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        }
    }, [messages]);

    const initConversation = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const greeting = await getInitialGreeting();
            setMessages([{ role: 'assistant', content: greeting }]);
        } catch (err: any) {
            if (err.message?.includes('API_KEY') || err.message?.includes('401')) {
                setHasApiKey(false);
                setError('API key not configured.');
            } else {
                // Use fallback greeting
                setMessages([{
                    role: 'assistant',
                    content: "Hey! I'm here to help you figure out how AI fits into your work. What's been on your mind lately?"
                }]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async (userMessage: string) => {
        const newMessages: ChatMessageType[] = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);
        setError(null);

        try {
            const response = await sendMessage(messages, userMessage);
            setMessages([...newMessages, { role: 'assistant', content: response }]);
        } catch (err: any) {
            console.error('Chat error:', err);
            if (err.message?.includes('API_KEY') || err.message?.includes('401')) {
                setHasApiKey(false);
                setError('API key not configured.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearChat = () => {
        localStorage.removeItem(STORAGE_KEY);
        setMessages([]);
        initConversation();
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 py-3 border-b-2"
                style={{
                    borderColor: '#1E3D2F',
                    background: '#FFFFFF'
                }}
            >
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: 'var(--bg-accent)', color: 'white' }}
                    >
                        AI
                    </div>
                    <span className="font-display text-lg font-bold tracking-tight">
                        Diagnostic Guide
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {messages.length > 1 && (
                        <button
                            onClick={handleClearChat}
                            className="text-xs px-2 py-1 rounded border transition-colors hover:bg-red-50"
                            style={{
                                borderColor: 'var(--border-primary)',
                                color: 'var(--text-tertiary)'
                            }}
                        >
                            Clear
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-gray-100 transition-colors"
                        style={{ color: 'var(--text-tertiary)' }}
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-4 chat-messages-container"
                style={{ background: '#FFFFFF' }}
            >
                {/* API Key Warning */}
                {!hasApiKey && (
                    <div
                        className="mb-4 p-3 rounded-lg border text-xs"
                        style={{
                            background: '#FEF3C7',
                            borderColor: '#F59E0B',
                            color: '#92400E'
                        }}
                    >
                        <strong>API Key Required</strong>
                        <p className="mt-1">
                            Add <code className="bg-white/50 px-1 rounded">VITE_OPENROUTER_API_KEY</code> to your .env file.
                        </p>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        role={msg.role}
                        content={msg.content}
                    />
                ))}

                {isLoading && (
                    <ChatMessage
                        role="assistant"
                        content=""
                        isTyping={true}
                    />
                )}

                {error && (
                    <div
                        className="text-center text-xs py-2 px-3 rounded-lg mb-2"
                        style={{
                            background: '#FEE2E2',
                            color: '#DC2626'
                        }}
                    >
                        {error}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <ChatInput
                onSend={handleSend}
                disabled={isLoading || !hasApiKey}
                placeholder={hasApiKey ? "Type your message..." : "API key required..."}
            />
        </div>
    );
};

export default ChatPanel;
