import React, { useState, useRef, useEffect } from 'react'
import Message from '../Message/Message'
import './ChatArea.css'

const ChatArea = ({ selectedChat, messages, onSendMessage, mySentMessages }) => {
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedChat])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() && selectedChat) {
      onSendMessage(newMessage.trim())
      setNewMessage('')
    }
  }

  if (!selectedChat) {
    return (
      <div className="chat-area empty">
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>Select a chat to start messaging</h3>
          <p>Choose a conversation from the list to begin chatting</p>
        </div>
      </div>
    )
  }

  
  const chatMessages = messages
    .filter(msg => msg.userId === selectedChat.userId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="user-avatar">
            {selectedChat.customer?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-details">
            <span className="user-name">
              {selectedChat.customer?.name || `User ${selectedChat.userId}`}
            </span>
            <span className="user-status">Online</span>
          </div>
        </div>
        <div className="chat-actions">
          <button className="action-btn">📹</button>
          <button className="action-btn">📞</button>
          <button className="action-btn">⋯</button>
        </div>
      </div>

      <div className="messages-container">
        {chatMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isOwn={!message.customer || mySentMessages.has(message.id)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input-container" onSubmit={handleSendMessage}>
        <div className="input-actions">
          <button type="button" className="input-action-btn">😊</button>
          <button type="button" className="input-action-btn">📎</button>
        </div>
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!newMessage.trim()}
        >
          ➤
        </button>
      </form>
    </div>
  )
}

export default ChatArea