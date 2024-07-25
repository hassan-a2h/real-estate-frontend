import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { socket } from '../../App';

const ChatContent = ({ currentChat, userId, socket }) => {
  const [messages, setMessages] = useState([]);
  const [titleMessages, setTitleMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const id = localStorage.getItem('userId');
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
      setMessages([]);
      setHasMore(true);
      fetchMessages();
    }
  }, [currentChat]);

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

  const fetchMessages = async (lastMessageDate = null) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/api/c/chats/${currentChat._id}/messages`, {
        params: { 
          userId,
          lastMessageDate,
          limit: 20
        },
      });
      const newMessages = response.data;
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setHasMore(newMessages.length === 20);
      socket.emit('messagesRead', { userId });
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMessages = () => {
    if (messages.length > 0) {
      const oldestMessage = messages[messages.length - 1];
      fetchMessages(oldestMessage.createdAt);
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
            loadMoreMessages={loadMoreMessages}
            isLoading={isLoading}
            hasMore={hasMore}
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