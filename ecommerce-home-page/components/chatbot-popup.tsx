'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Xin chào! 👋 Tôi có thể giúp bạn gì hôm nay?',
    sender: 'bot',
    timestamp: new Date(),
  },
]

const BOT_RESPONSES = [
  'Bạn có thể xem các danh mục sản phẩm ở bên trái.',
  'Hãy thêm sản phẩm yêu thích vào giỏ hàng.',
  'Có gì khác tôi có thể giúp bạn không?',
  'Chúng tôi cung cấp giao hàng miễn phí cho đơn hàng trên 100.000đ.',
  'Liên hệ với chúng tôi qua email: support@ecommerce.com',
]

export function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: BOT_RESPONSES[
          Math.floor(Math.random() * BOT_RESPONSES.length)
        ],
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 500)
  }

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 rounded-full shadow-lg transition-all duration-300 z-40 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        style={{
          backgroundColor: 'rgb(99, 107, 47)',
          padding: '16px',
        }}
      >
        <MessageCircle size={24} className="text-white" />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-96 flex flex-col shadow-2xl z-50 border-2 border-primary">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Trợ lý cửa hàng</h3>
              <p className="text-xs text-secondary/70">Luôn sẵn sàng giúp bạn</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary/80 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-xs px-4 py-2 rounded-lg text-sm',
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-foreground'
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary px-4 py-2 rounded-lg text-sm text-foreground">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-border p-4 bg-card"
          >
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 text-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-primary/90 text-white"
                size="sm"
              >
                <Send size={16} />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  )
}
