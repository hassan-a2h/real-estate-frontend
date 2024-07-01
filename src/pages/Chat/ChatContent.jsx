import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const ChatContent = ({ currentChat, userId, socket }) => {
  const [messages, setMessages] = useState([]);
  const [titleMessages, setTitleMessages] = useState({});
  const id = localStorage.getItem('userId');
  const messagesEndRef = useRef(null);
  const currentChatRef = useRef(currentChat);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  useEffect(() => {
    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReceiveMessage = async (data) => {
    if (data.chatId === currentChatRef.current?._id) {
      if (data.receiverId === id) {
        setMessages((prevMessages) => [data, ...prevMessages]);
        const savedMsg = await axios.post(`/api/c/messages/read`, 
          {
            id: data._id
          }
        );
      }
      socket.emit('messagesRead', { userId: id });
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/c/chats/${currentChat._id}/messages`, {
        params: { userId },
      });
      setMessages(response.data);
      socket.emit('messagesRead', { userId });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchTitleMessages = async (id) => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      setTitleMessages(prev => ({ ...prev, [id]: response.data }));
    } catch (error) {
      console.error('Error fetching title messages:', error);
    }
  };

  const sendMessage = (message) => {
    const receiverId = currentChat.userId === userId ? currentChat.agentId : currentChat.userId;
    const newMessage = {
      chatId: currentChat._id,
      senderId: userId,
      receiverId,
      message,
    };
    socket.emit('sendMessage', newMessage);
    setMessages(prev => [newMessage, ...prev]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat-content">
      {currentChat ? (
        <>
          <h3>Messages</h3>
          <MessageList 
            messages={messages}
            userId={userId}
            titleMessages={titleMessages}
            fetchTitleMessages={fetchTitleMessages}
            messagesEndRef={messagesEndRef}
          />
          <MessageForm sendMessage={sendMessage} />
        </>
      ) : (
        <div>Select a chat to start messaging</div>
      )}
    </div>
  );
};

export default ChatContent;