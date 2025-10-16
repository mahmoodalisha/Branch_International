import React from 'react'
import './Message.css'

const Message = ({ message, isOwn }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  return (
    <div className={`message ${isOwn ? 'own-message' : 'other-message'}`}>
      <div className="message-bubble">
        <div className="message-text">{message.messageBody}</div>
        <div className="message-time">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  )
}

export default Message