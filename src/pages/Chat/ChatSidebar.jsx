import React from 'react';
import localTime from '../../utils/localDateTime.js';

const ChatSidebar = ({ chats, currentChat, handleChatSelect, lastMessage, messageTime, unreadMessages }) => {
  return (
    <div className="chat-sidebar">
      <h3>Chats</h3>
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => handleChatSelect(chat)}
          className={`chat-list-item ${chat?._id === currentChat?._id ? 'chat-selected' : ''}`}
        >
          <div className='chat-name-container'>
            <span className='chat-recipient-name'>{chat?.recipientName}</span>
            <span>
              <span className='last-message-date'>
                {messageTime[chat._id] && <span>{localTime(messageTime[chat._id])}</span>}
                {!messageTime[chat._id] && <span>{localTime(chat?.lastMessage?.createdAt)}</span>}
              </span>
              {unreadMessages?.unreadChats[chat._id] && <span className="badge badge-pill badge-secondary">{unreadMessages.unreadChats[chat._id]}</span>}
            </span>
          </div>
          <div>
            {lastMessage[chat._id] ? 
              <span className='chat-last-message'>{lastMessage[chat._id]}</span> : 
              <span className='chat-last-message'>{chat.lastMessage.message}</span>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;