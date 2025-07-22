'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIContactBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your AI assistant. I can help you learn about Aftermath Technologies, schedule demos, or answer questions about our offline-first AI solutions. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userInput: string): Promise<string> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const input = userInput.toLowerCase();
    
    // Context-aware responses based on user input
    if (input.includes('demo') || input.includes('try')) {
      return 'I\'d be happy to help you schedule a demo! Our interactive demos showcase our WebAssembly-powered LLMs running entirely in your browser. You can experience real-time AI inference without any cloud dependencies. Would you like me to connect you with our demo team?';
    }
    
    if (input.includes('offline') || input.includes('local') || input.includes('privacy')) {
      return 'Great question about our offline-first approach! Our AI models run entirely on your device using WebAssembly, meaning your data never leaves your machine. This provides maximum privacy, zero latency, and works even without internet. It\'s like having ChatGPT that runs completely locally!';
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return 'Our pricing varies based on your specific needs. We offer free developer tiers for open-source projects, enterprise licensing for commercial use, and custom solutions for large organizations. Would you like me to connect you with our sales team for detailed pricing?';
    }
    
    if (input.includes('integration') || input.includes('api') || input.includes('develop')) {
      return 'Our platform is designed for easy integration! We provide WebAssembly modules, REST APIs, and SDKs for multiple languages. Integration typically takes just a few lines of code. I can connect you with our technical team for implementation guidance.';
    }
    
    if (input.includes('team') || input.includes('company') || input.includes('about')) {
      return 'Aftermath Technologies was founded by AI researchers passionate about democratizing artificial intelligence. Our team combines expertise in machine learning, WebAssembly optimization, and edge computing to create truly autonomous AI systems. We\'re backed by leading investors and growing rapidly!';
    }
    
    if (input.includes('help') || input.includes('support') || input.includes('question')) {
      return 'I\'m here to help! I can answer questions about our technology, schedule demos, connect you with our team, or provide technical documentation. What specific aspect of our AI platform interests you most?';
    }
    
    // Default responses
    const defaultResponses = [
      'That\'s an interesting question! Our AI systems are designed to be completely autonomous and privacy-first. Can you tell me more about your specific use case?',
      'I understand you\'re interested in our technology. Our offline-first AI approach means better performance, privacy, and reliability. What would you like to explore?',
      'Thanks for reaching out! Aftermath Technologies specializes in edge AI that runs without cloud dependencies. How can we help solve your AI challenges?',
      'Great to hear from you! Our WebAssembly-powered AI models deliver enterprise-grade performance right in your browser. What brings you to learn about our platform?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponse(inputText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I\'m experiencing technical difficulties. Please try contacting us directly at contact@aftermathtech.com or try again in a moment.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    'Schedule a demo',
    'Learn about pricing',
    'Technical documentation',
    'Contact sales team'
  ];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-4 border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Assistant</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-cyan-300">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-pink-500 to-purple-500' 
                    : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-xs ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-white'
                      : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="inline-block p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(action)}
                    className="text-xs bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full transition-all"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-cyan-500/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isTyping}
                className="flex-1 bg-black/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by local AI • Your conversations are private
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIContactBot;