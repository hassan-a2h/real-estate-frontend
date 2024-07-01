import React, { useEffect, useRef, useCallback } from 'react';
import localTime from '../../utils/localDateTime.js';

const MessageList = ({ messages, userId, titleMessages, fetchTitleMessages, messagesEndRef, loadMoreMessages, isLoading, hasMore }) => {
  const listRef = useRef(null);
  const observerRef = useRef(null);

  const topMessageRef = useCallback(node => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[entries.length - 1].isIntersecting && hasMore) {
        loadMoreMessages();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore, loadMoreMessages]);

  return (
    <div ref={listRef} className='chat-history-wrapper' style={{ height: '80%', overflowY: 'scroll' }}>
      {isLoading && <div>Loading...</div>}
      <div className="chat-history">
        {messages.map((msg, index) => {
          if (index === messages.length - 1) {
            {console.log('messge index:', index, 'messages length:', messages.length - 1)}
            return (
              <div ref={topMessageRef} key={msg._id || index}>
                {renderMessage(msg, index, userId, titleMessages, fetchTitleMessages)}
              </div>
            );
          }
          return renderMessage(msg, index, userId, titleMessages, fetchTitleMessages);
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

const renderMessage = (msg, index, userId, titleMessages, fetchTitleMessages) => {
  if (msg.isPropertyTitle) {
    if (!titleMessages?.[msg.message]) {
      fetchTitleMessages(msg.message);
    }

    return (
      <React.Fragment key={index}>
        {titleMessages[msg.message] !== undefined ? (
          <div className="property-details">
            <h2 className="property-title">{titleMessages[msg.message].title}</h2>
            <p className="property-description">{titleMessages[msg.message].description}</p>
            <div className="property-info">
              <span className="property-price">{titleMessages[msg.message].price}</span> - 
              <span className="property-location">{titleMessages[msg.message].location}</span>
            </div>
          </div>
        ) : (
          <div className="property-details placeholder">
            <h2>Loading...</h2>
            <p>&nbsp;</p>
            <div className="property-info">
              <span>&nbsp;</span> - <span>&nbsp;</span>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
  return (
    <div key={msg._id || index} className={`chat-message ${msg.senderId === userId ? 'chat-message-sent' : 'chat-message-received'}`}>
      {msg.message}
      <span className="message-timestamp">{localTime(msg.createdAt)}</span>
    </div>
  );
};

export default MessageList;