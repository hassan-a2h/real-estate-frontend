import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../App';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ChatSidebar from './ChatSidebar';
import ChatContent from './ChatContent';

const Chat = ({ unreadMessages }) => {
  const id = localStorage.getItem('userId');
  const location = useLocation();
  const { userId, chatFromListing } = location.state || { userId: id };
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [lastMessage, setLastMessage] = useState({});
  const [messageTime, setMessageTime] = useState({});

  const currentChatRef = useRef(currentChat);

  useEffect(() => {
    fetchChats();
    
    if (chatFromListing) {
      handleChatSelect(chatFromListing);
    }

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`/api/c/chats/${userId}`);
      const chatsWithNames = await Promise.all(
        response.data.map(async (chat) => {
          const recipient = chat.userId === userId ? chat.agentId : chat.userId;
          const recipientData = await axios.get(`/api/users/${recipient}`);
          return { ...chat, recipientName: recipientData.data.name };
        })
      );
      setChats(chatsWithNames);
      
      if (chatsWithNames.length > 0) {
        setCurrentChat(chatsWithNames[0]);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleChatSelect = async (chat) => {
    setCurrentChat(() => chat);
  };

  const handleReceiveMessage = async (data) => {
    if (data.chatId === currentChatRef.current?._id) {
      if (data.receiverId === id) {
        const savedMsg = await axios.post(`/api/c/messages/read`, 
          {
            id: data._id
          }
        );
      }
      socket.emit('messagesRead', { userId: id });
    }

    setLastMessage(prev => ({
      ...prev,
      [data.chatId]: data.message
    }));

    setMessageTime(prev => ({
      ...prev,
      [data.chatId]: data.createdAt
    }));
  };

  return (
    <div className="chat-container">
      <ChatSidebar 
        chats={chats}
        currentChat={currentChat}
        handleChatSelect={handleChatSelect}
        lastMessage={lastMessage}
        messageTime={messageTime}
        unreadMessages={unreadMessages}
      />
      <ChatContent 
        currentChat={currentChat}
        userId={userId}
        socket={socket}
      />
    </div>
  );
};

export default Chat;