import React from 'react'
import './ChatListItem.css'

const ChatListItem = ({ chat, isSelected, onSelect }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const formatMessage = (message) => {
    return message.length > 35 ? message.substring(0, 35) + '...' : message
  }

  return (
    <div 
      className={`chat-list-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(chat)}
    >
      <div className="chat-avatar">
        {chat.customer?.name?.charAt(0) || 'U'}
      </div>
      <div className="chat-info">
        <div className="chat-header">
          <span className="chat-name">
            {chat.customer?.name || `User ${chat.userId}`}
          </span>
          <span className="chat-time">
            {formatTime(chat.timestamp)}
          </span>
        </div>
        <div className="chat-preview">
          <span className="last-message">
            {formatMessage(chat.lastMessage)}
          </span>
          {chat.unread > 0 && (
            <span className="unread-badge">{chat.unread}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatListItem