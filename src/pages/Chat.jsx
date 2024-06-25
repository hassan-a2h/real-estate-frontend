import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const socket = io('http://localhost:3000'); // Update with your server URL

const Chat = () => {
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
      setChats(response.data);
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
  };

  const handleReceiveMessage = (data) => {
    if (data.chatId === currentChatRef.current?._id) {
      setMessages((prevMessages) => [...prevMessages, data]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h3>Chats</h3>
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => handleChatSelect(chat)}
            style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {chat._id}
          </div>
        ))}
      </div>
      <div style={{ width: '70%', padding: '10px' }}>
        {currentChat ? (
          <>
            <h3>Chat with {currentChat.title}</h3>
            <div style={{ height: '80%', overflowY: 'scroll' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <strong>{msg.senderId === userId ? 'You' : 'Received'}: </strong>{msg.message}
                </div>
              ))}
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
