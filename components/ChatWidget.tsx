
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertTriangle } from 'lucide-react';
import { ChatMessage, ChatSender } from '../types';
import { sendMessageToGemini, isConfigured } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: ChatSender.BOT,
      text: "Hi! I'm PortfoBot. Ask me anything about Sahil's work.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasKey, setHasKey] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const configured = isConfigured();
    setHasKey(configured);
    if (!configured) {
        setMessages(prev => [...prev, {
            id: 'system-error',
            sender: ChatSender.BOT,
            text: "⚠️ API Key is missing. Please add GEMINI_API_KEY to your .env.local file to enable chat.",
            timestamp: new Date(),
            isError: true
        }]);
    }
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    if (!hasKey) {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: ChatSender.BOT,
            text: "Cannot send message: API Key is not configured.",
            timestamp: new Date(),
            isError: true
        }]);
        return;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: ChatSender.USER,
      text: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: ChatSender.BOT,
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: ChatSender.BOT,
        text: "Sorry, I had trouble connecting to the server.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white border border-zinc-200 rounded-lg shadow-2xl w-80 md:w-96 mb-4 flex flex-col h-[450px] overflow-hidden origin-bottom-right animate-fade-in">
          {/* Header */}
          <div className="bg-zinc-50 p-4 border-b border-zinc-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full ${hasKey ? 'bg-black' : 'bg-red-500'}`}>
                {hasKey ? <Sparkles size={14} className="text-white" /> : <AlertTriangle size={14} className="text-white" />}
              </div>
              <span className="text-zinc-900 font-bold text-sm">PortfoBot</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-black transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === ChatSender.USER ? 'flex-row-reverse' : ''}`}
              >
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === ChatSender.USER ? 'bg-zinc-100' : 'bg-black'}`}>
                   {msg.sender === ChatSender.USER ? <User size={14} className="text-zinc-500" /> : <Bot size={14} className="text-white" />}
                 </div>
                 <div className={`p-3 rounded-lg text-sm max-w-[80%] leading-relaxed ${
                   msg.sender === ChatSender.USER 
                   ? 'bg-zinc-100 text-zinc-900' 
                   : 'bg-white border border-zinc-100 text-zinc-700 shadow-sm'
                 } ${msg.isError ? 'border-red-100 text-red-600 bg-red-50' : ''}`}>
                   {msg.text}
                 </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-black">
                   <Bot size={14} className="text-white" />
                 </div>
                 <div className="bg-white border border-zinc-100 p-3 rounded-lg shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-zinc-100 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={hasKey ? "Ask me something..." : "Chat unavailable"}
              disabled={!hasKey}
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim() || !hasKey}
              className="p-2 bg-black text-white rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black hover:bg-zinc-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;