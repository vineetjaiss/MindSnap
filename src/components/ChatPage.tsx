import { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Send, Bot, User, Lightbulb, Sparkles, ThumbsUp, Copy, Volume2, Cpu, Zap } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'sonner'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  liked?: boolean
}

interface ChatPageProps {
  onProgressUpdate: (type: 'question' | 'image') => void
  userProgress: {
    questionsAsked: number
    imagesAnalyzed: number
    level: number
    points: number
  }
}

export function ChatPage({ onProgressUpdate, userProgress }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Neural connection established! 🤖 Your neural level is ${userProgress.level} - impressive cognitive capacity detected! I'm your AI companion, ready to decode any information into simple neural patterns. What cosmic mystery shall we unravel today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    'How do black holes work?',
    'Why do atoms spin?',
    'What makes stars shine?',
    'How do neural networks learn?',
    'What is AI computing?',
    'How do rockets reach space?'
  ]

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (messageText?: string) => {
    const text = messageText || inputValue
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    }

    // Add user message
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    setShowSuggestions(false)
    
    // Update progress
    onProgressUpdate('question')

    // Simulate AI response with typing delay
    setTimeout(() => {
      const responses = [
        `AI analysis complete! "${text}" operates through fascinating molecular interactions... 🌟`,
        `Neural pathways activated! Let me decode "${text}" into simple cognitive patterns... 🧠`,
        `Digital data processed! "${text}" functions through incredible scientific principles... 🚀`,
        `AI core engaged! "${text}" is absolutely fascinating - here's the simplified neural decode... ✨`,
        `Knowledge unlocked! "${text}" works through amazing universal principles... 🌌`
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `${randomResponse} (Demo response - in the full AI system, I would provide detailed molecular-level explanations optimized for your neural level ${userProgress.level}!)`,
        sender: 'ai',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
      
      // Show celebration for milestone questions
      if (userProgress.questionsAsked % 5 === 0) {
        toast.success('⚡ Neural pathway optimization detected! Cognitive enhancement achieved!', {
          duration: 3000,
          position: 'top-center'
        })
      }
    }, 1500 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  const handleLike = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, liked: !msg.liked } : msg
    ))
    toast.success('Neural feedback processed! 💖')
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Data copied to digital clipboard! 📋')
  }

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1.1
      speechSynthesis.speak(utterance)
      toast.success('Neural audio synthesis activated! 🔊')
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Header */}
      <motion.div 
        className="p-4 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white border-b border-cyan-400/30 relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Matrix effect */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              style={{ left: `${i * 10}%` }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-3 relative z-10">
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-cyan-400/30 backdrop-blur-sm"
            animate={{ 
              rotate: [0, 360],
              boxShadow: [
                '0 0 10px rgba(34, 211, 238, 0.3)',
                '0 0 20px rgba(34, 211, 238, 0.5)',
                '0 0 10px rgba(34, 211, 238, 0.3)'
              ]
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Bot className="w-6 h-6 text-cyan-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-mono text-cyan-300">Neural AI Core</h2>
            <p className="text-cyan-200/70 text-sm font-mono">
              AI processing active 🌟 
              <span className="ml-2 text-purple-300">Level {userProgress.level}</span>
            </p>
          </div>
          <motion.div
            className="ml-auto"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cpu className="w-5 h-5 text-cyan-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 bg-slate-900/20 backdrop-blur-sm" ref={scrollAreaRef}>
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div 
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                    message.sender === 'ai' 
                      ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/30' 
                      : 'bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border-emerald-400/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  animate={message.sender === 'ai' ? {
                    boxShadow: [
                      '0 0 10px rgba(34, 211, 238, 0.3)',
                      '0 0 20px rgba(34, 211, 238, 0.5)',
                      '0 0 10px rgba(34, 211, 238, 0.3)'
                    ]
                  } : {}}
                >
                  {message.sender === 'ai' ? 
                    <Bot className="w-4 h-4 text-cyan-400" /> : 
                    <User className="w-4 h-4 text-emerald-400" />
                  }
                </motion.div>
                
                <div className={`max-w-xs ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className={`p-4 backdrop-blur-sm border relative overflow-hidden ${
                      message.sender === 'ai' 
                        ? 'bg-slate-900/60 border-cyan-400/30' 
                        : 'bg-slate-900/60 border-emerald-400/30'
                    }`}>
                      {/* Holographic effect */}
                      <motion.div
                        className="absolute inset-0 opacity-30"
                        animate={{
                          background: message.sender === 'ai' ? [
                            'linear-gradient(45deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                            'linear-gradient(135deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                            'linear-gradient(225deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                            'linear-gradient(315deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                          ] : [
                            'linear-gradient(45deg, transparent, rgba(34, 197, 94, 0.1), transparent)',
                            'linear-gradient(135deg, transparent, rgba(34, 197, 94, 0.1), transparent)',
                            'linear-gradient(225deg, transparent, rgba(34, 197, 94, 0.1), transparent)',
                            'linear-gradient(315deg, transparent, rgba(34, 197, 94, 0.1), transparent)',
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                      
                      <p className="text-slate-200 font-mono text-sm relative z-10">{message.text}</p>
                      <span className="text-xs text-slate-500 mt-2 block font-mono relative z-10">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </Card>
                  </motion.div>
                  
                  {/* Message actions */}
                  {message.sender === 'ai' && (
                    <motion.div 
                      className="flex items-center gap-2 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(message.id)}
                        className={`p-1 rounded-full border ${
                          message.liked 
                            ? 'bg-pink-500/20 border-pink-400/30 text-pink-400' 
                            : 'bg-slate-800/50 border-slate-600/30 text-slate-500 hover:border-pink-400/30 hover:text-pink-400'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopy(message.text)}
                        className="p-1 rounded-full bg-slate-800/50 border border-slate-600/30 text-slate-500 hover:border-cyan-400/30 hover:text-cyan-400"
                      >
                        <Copy className="w-3 h-3" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSpeak(message.text)}
                        className="p-1 rounded-full bg-slate-800/50 border border-slate-600/30 text-slate-500 hover:border-cyan-400/30 hover:text-cyan-400"
                      >
                        <Volume2 className="w-3 h-3" />
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
                <Card className="p-4 bg-slate-900/60 border border-cyan-400/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <motion.div
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                    <span className="text-sm text-cyan-400 font-mono">Processing digital data...</span>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div 
            className="p-4 bg-slate-900/60 border-t border-yellow-400/30 backdrop-blur-sm relative overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Scan line */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Lightbulb className="w-4 h-4 text-yellow-400" />
              </motion.div>
              <span className="text-sm text-yellow-300 font-mono">Suggested AI queries:</span>
            </div>
            <div className="flex flex-wrap gap-2 relative z-10">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSend(suggestion)}
                    className="text-xs bg-slate-800/50 border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/10 font-mono"
                  >
                    {suggestion}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <motion.div 
        className="p-4 bg-slate-900/80 border-t border-cyan-400/30 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter AI query... like 'How do stars form?'"
              className="bg-slate-800/50 border-cyan-400/30 text-slate-200 placeholder:text-slate-500 font-mono focus:border-cyan-400/50"
              disabled={isTyping}
            />
            <motion.div
              className="absolute inset-0 rounded-md pointer-events-none"
              animate={{
                boxShadow: inputValue ? [
                  '0 0 10px rgba(34, 211, 238, 0.2)',
                  '0 0 20px rgba(34, 211, 238, 0.4)',
                  '0 0 10px rgba(34, 211, 238, 0.2)'
                ] : 'none'
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border border-cyan-400/30 font-mono"
            >
              {isTyping ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}