
import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, StopCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'services/contexts/ThemeContext'

interface SimpleAIChatProps {
    context?: string
}

const SimpleAIChat: React.FC<SimpleAIChatProps> = ({ context = 'business' }) => {
    const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant'; content: string }>>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()
    const { theme } = useTheme()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (isExpanded) scrollToBottom()
    }, [messages, isExpanded])

    useEffect(() => {
        if (messages?.length > 0 && !isExpanded) setIsExpanded(true)
    }, [messages?.length])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const newMessage = { type: 'user' as const, content: input }
        setMessages(prev => [...prev, newMessage])
        setInput('')
        setIsLoading(true)

        setTimeout(() => {
            const response = {
                type: 'assistant' as const,
                content: `This is a simulated response for the ${context} context.`,
            }
            setMessages(prev => [...prev, response])
            setIsLoading(false)
        }, 1000)
    }

    const toggleRecording = () => setIsRecording(!isRecording)
    const toggleExpanded = () => setIsExpanded(!isExpanded)

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <motion.div
                initial={false}
                animate={{
                    height: isExpanded && messages?.length > 0 ? 'auto' : 'auto'
                }}
                style={{
                    backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                    border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`,
                    borderRadius: "12px",
                    boxShadow: theme === "dark"
                        ? "0 1px 3px rgba(0,0,0,0.3)"
                        : "0 1px 3px rgba(0,0,0,0.1)"
                }}
            >
                <div
                    className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors"
                    onClick={toggleExpanded}
                    style={{
                        backgroundColor: theme === "dark" ? "#111827" : "#f9fafb"
                    }}
                >
                    <div className="flex items-center space-x-2">
                        <span
                            className="text-sm font-medium"
                            style={{ color: theme === "dark" ? "#d1d5db" : "#374151" }}
                        >
                            {t("Ask AI everything about this page")}
                        </span>
                    </div>
                    <button
                        className="p-1 rounded-full hover:bg-gray-100"
                        style={{ backgroundColor: theme === "dark" ? "transparent" : undefined }}
                    >
                        {isExpanded ? (
                            <ChevronDown className="w-5 h-5" style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }} />
                        ) : (
                            <ChevronUp className="w-5 h-5" style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }} />
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
                                        className={`max-w-[80%] rounded-lg p-3`}
                                        style={{
                                            backgroundColor:
                                                message.type === 'user'
                                                    ? "#4338CA"
                                                    : theme === "dark"
                                                        ? "#374151"
                                                        : "#f3f4f6",
                                            color:
                                                message.type === 'user'
                                                    ? "#ffffff"
                                                    : theme === "dark"
                                                        ? "#f3f4f6"
                                                        : "#111827"
                                        }}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div
                                        className="rounded-lg p-3"
                                        style={{
                                            backgroundColor: theme === "dark" ? "#374151" : "#f3f4f6"
                                        }}
                                    >
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

                <form onSubmit={handleSubmit} className="border-t p-4"
                    style={{
                        borderTop: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`
                    }}
                >
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t("Ask anything about the data...")}
                            className="flex-1 px-1 outline-none bg-transparent"
                            style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}
                            disabled={isLoading || isRecording}
                        />
                        <button
                            type="submit"
                            onClick={input.trim() ? undefined : toggleRecording}
                            disabled={isLoading}
                            className="p-2 rounded-full bg-[#4338CA] text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
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
    )
}

export default SimpleAIChat
