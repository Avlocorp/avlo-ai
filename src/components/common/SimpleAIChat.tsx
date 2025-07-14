import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, StopCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SimpleAIChatProps {
  context?: string;
}

const SimpleAIChat: React.FC<SimpleAIChatProps> = ({ context = 'business' }) => {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isExpanded) {
      scrollToBottom();
    }
  }, [messages, isExpanded]);

  // Auto-expand when new messages are added
  useEffect(() => {
    if (messages?.length > 0 && !isExpanded) {
      setIsExpanded(true);
    }
  }, [messages?.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage = { type: 'user' as const, content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = {
        type: 'assistant' as const,
        content: `This is a simulated response for the ${context} context.`,
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual STT functionality
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <motion.div
        initial={false}
        animate={{
          height: isExpanded && messages?.length > 0 ? 'auto' : 'auto'
        }}
        className={`
          bg-white dark:bg-gray-800 shadow-lg border dark:border-gray-700 rounded-lg
          ${!isExpanded ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800' : ''}
        `}
      >
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          onClick={toggleExpanded}
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('Ask AI everything about this page')}
            </span>
          </div>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && messages?.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="max-h-[300px] overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="border-t dark:border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('Ask anything about the data...')}
              className="flex-1 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              disabled={isLoading || isRecording}
            />

            <button
              type="submit"
              onClick={input.trim() ? undefined : toggleRecording}
              disabled={isLoading}
              className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : input.trim() ? (
                <Send className="w-5 h-5" />
              ) : isRecording ? (
                <StopCircle className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SimpleAIChat;