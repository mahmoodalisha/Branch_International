import React from 'react'
import ChatListItem from './ChatListItem';
import './ChatList.css'

const ChatList = ({ chats, selectedChat, onChatSelect, loading }) => {
  if (loading) {
    return (
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chats</h2>
          <button className="new-chat-btn">+</button>
        </div>
        <div className="loading-chats">Loading chats...</div>
      </div>
    )
  }

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Chats</h2>
        <button className="new-chat-btn">+</button>
      </div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search chats..." 
          className="search-input"
        />
      </div>
      <div className="chats-container">
        {chats.map(chat => (
          <ChatListItem
            key={chat.userId}
            chat={chat}
            isSelected={selectedChat?.userId === chat.userId}
            onSelect={onChatSelect}
          />
        ))}
        {chats.length === 0 && (
          <div className="no-chats">No chats available</div>
        )}
      </div>
    </div>
  )
}

export default ChatList