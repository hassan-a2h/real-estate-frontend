import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const socket = io('http://localhost:3000'); // Update with your server URL

const Chat = () => {
  const location = useLocation();
  const { userId } = location.state;
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      if (currentChat && data.listingId === currentChat.listingId) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    // Fetch user chats from the server (this is a placeholder)
    fetchChats();

    return () => {
      socket.off('receiveMessage');
    };
  }, [currentChat]);

  const fetchChats = () => {
    // Replace with your API call to fetch chats
    const dummyChats = [
      { listingId: '1', userId: '123', originalPosterId: '456', title: 'Chat 1' },
      { listingId: '2', userId: '123', originalPosterId: '789', title: 'Chat 2' },
    ];
    setChats(dummyChats);
  };

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
    // Fetch chat messages from the server (this is a placeholder)
    const dummyMessages = [
      { userId: chat.userId, message: 'Hello!', timestamp: new Date() },
      { userId: chat.originalPosterId, message: 'Hi!', timestamp: new Date() },
    ];
    setMessages(dummyMessages);
  };

  const sendMessage = () => {
    const newMessage = {
      listingId: currentChat.listingId,
      userId,
      originalPosterId: currentChat.originalPosterId,
      message,
      timestamp: new Date(),
    };
    socket.emit('sendMessage', newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h3>Chats</h3>
        {chats.map((chat) => (
          <div key={chat.listingId} onClick={() => handleChatSelect(chat)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
            {chat.title}
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
                  <strong>{msg.userId === userId ? 'You' : 'Seller'}:</strong> {msg.message}
                </div>
              ))}
            </div>
            <div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: '80%' }}
              />
              <button onClick={sendMessage} style={{ width: '20%' }}>Send</button>
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
