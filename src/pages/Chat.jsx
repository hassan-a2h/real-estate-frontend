import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const socket = io('http://localhost:3000');

const Chat = ({ unreadMessages }) => {
  const id = localStorage.getItem('userId');
  const location = useLocation();
  const { userId } = location.state || { userId: id };
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const currentChatRef = useRef(currentChat);

  useEffect(() => {
    fetchChats();
    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`/api/c/chats/${userId}`);
      const chatsWithNames = await Promise.all(
        response.data.map(async (chat) => {
          const recipient = chat.userId === userId ? chat.agentId : chat.userId;
          const recipientData = await axios.get(`/api/users/${recipient}`); // Fetch user data
          return { ...chat, recipientName: recipientData.data.name }; // Combine chat and name
        })
      );
      setChats(chatsWithNames);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleChatSelect = async (chat) => {
    setCurrentChat(chat);
    try {
      const response = await axios.get(`/api/c/chats/${chat._id}/messages`, {
        params: { userId: id },
      });
      setMessages(response.data);
      socket.emit('messagesRead', { userId: id });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const receiverId = currentChat.userId === userId ? currentChat.agentId : currentChat.userId;

    const newMessage = {
      chatId: currentChat._id,
      senderId: userId,
      receiverId,
      message,
    };
    // Emit the message to the server
    socket.emit('sendMessage', newMessage);
    setMessage('');
    scrollToBottom();
  };

  const handleReceiveMessage = (data) => {
    if (data.chatId === currentChatRef.current?._id) {
      setMessages((prevMessages) => [...prevMessages, data]);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatHistory = messagesEndRef.current.parentElement; // Get parent element (chat history)
      const scrollHeight = chatHistory.scrollHeight; // Get total scroll height
  
      chatHistory.scrollTo({ top: scrollHeight, behavior: 'smooth' });
    }
  };

  console.log('Chat page, unreadMessages:', unreadMessages);

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Chats</h3>
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => handleChatSelect(chat)}
            className="chat-list-item"
          >
            {console.log('current chat id:', chat._id)}
            {chat.recipientName}
            {unreadMessages?.unreadChats[chat._id] && <span>({unreadMessages.unreadChats[chat._id]})</span>}
          </div>
        ))}
      </div>
      <div className="chat-content">
        {currentChat ? (
          <>
            <h3>Chat History</h3>
            
            <div className="chat-history" style={{ height: '80%', overflowY: 'scroll' }}>
              {messages.map((msg, index) => {
                return msg.senderId === userId ? (
                  <div key={index} className="chat-message chat-message-sent"> {/* Sent message styling */}
                    {msg.message}
                  </div>
                ) : (
                  <div key={index} className="chat-message chat-message-received"> {/* Received message styling */}
                    {msg.message}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <div>
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: '80%' }}
                />
                <button style={{ width: '20%' }}>Send</button>
              </form>
            </div>
          </>
        ) : (
          <div>Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
