import React, { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar/Navbar'
import ChatList from './components/ChatList/ChatList'
import ChatArea from './components/ChatArea/ChatArea'
import { getMessages, sendReply } from './services/api'
import { useWebSocket } from './hooks/useWebSocket'
import './index.css'

function App() {
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [mySentMessages, setMySentMessages] = useState(new Set()) // Track IDs of messages I sent
  const [loading, setLoading] = useState(true)

  const { lastMessage } = useWebSocket('ws://localhost:8000')

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getMessages()
        setMessages(data)

        const chatMap = {}
        data.forEach(msg => {
          if (!chatMap[msg.userId]) {
            chatMap[msg.userId] = {
              userId: msg.userId,
              lastMessage: msg.messageBody,
              timestamp: msg.timestamp,
              unread: 0,
              customer: msg.customer
            }
          }
        })

        setChats(Object.values(chatMap))
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    loadMessages()
  }, [])

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (!lastMessage) return

    const newMsg = lastMessage.data || lastMessage
    setMessages(prev => [newMsg, ...prev])

    setChats(prev => {
      const updatedChats = [...prev]
      const idx = updatedChats.findIndex(c => c.userId === newMsg.userId)
      if (idx !== -1) {
        updatedChats[idx] = {
          ...updatedChats[idx],
          lastMessage: newMsg.messageBody,
          timestamp: newMsg.timestamp,
          unread: selectedChat?.userId === newMsg.userId ? 0 : updatedChats[idx].unread + 1
        }
      } else {
        updatedChats.unshift({
          userId: newMsg.userId,
          lastMessage: newMsg.messageBody,
          timestamp: newMsg.timestamp,
          unread: 1,
          customer: { name: `User ${newMsg.userId}` }
        })
      }
      return updatedChats
    })
  }, [lastMessage, selectedChat])

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
    setChats(prev => prev.map(c => 
      c.userId === chat.userId ? { ...c, unread: 0 } : c
    ))
  }

  
  const handleSendMessage = useCallback(async (messageText) => {
    if (!selectedChat) return

    try {
      // Find the latest message from this user to reply to
      const userMessages = messages.filter(msg => msg.userId === selectedChat.userId)
      const latestMessage = userMessages[0] // Most recent message
      
      if (latestMessage) {
        // Create a temporary message ID for tracking
        const tempMessageId = `temp-${Date.now()}`
        
        
        const tempMessage = {
          id: tempMessageId,
          userId: selectedChat.userId,
          messageBody: messageText,
          timestamp: new Date().toISOString(),
          customer: null // This indicates it's MY message
        }
        setMessages(prev => [tempMessage, ...prev])
        setMySentMessages(prev => new Set([...prev, tempMessageId]))
        const response = await sendReply(latestMessage.id, messageText)
        console.log('Message sent successfully:', response)
      } else {
        console.error('No message found to reply to')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }, [selectedChat, messages])

  return (
    <div className="app">
      <Navbar />
      <div className="app-body">
        <div className="chat-list-container">
          <ChatList 
            chats={chats}
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
            loading={loading}
          />
        </div>
        <div className="chat-area-container">
          <ChatArea
            selectedChat={selectedChat}
            messages={messages}
            onSendMessage={handleSendMessage}
            mySentMessages={mySentMessages}
          />
        </div>
      </div>
    </div>
  )
}

export default App