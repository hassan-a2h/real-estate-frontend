import React, { useEffect, useRef, useCallback } from 'react';
import localTime from '../../utils/localDateTime.js';

const MessageList = ({ messages, userId, titleMessages, fetchTitleMessages, loadMoreMessages, isLoading, hasMore }) => {
  const listRef = useRef(null);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);
  const containerRef = useRef(null);

  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !isLoading) {
      loadMoreMessages();
    }
  }, [hasMore, isLoading, loadMoreMessages]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(handleObserver, { threshold: 0 });
    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (event) => {
      event.preventDefault();
      // Invert the scroll direction
      container.scrollTop -= event.deltaY;
    };
    container.addEventListener('wheel', handleWheel);

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div ref={listRef} className='chat-history-wrapper' style={{ height: '80%', overflowY: 'scroll', position: 'relative' }}>
      {isLoading && <div>Loading...</div>}
      <div className="chat-history" ref={containerRef}>
        {messages.map((msg, index) => {
          if (index === messages.length - 1) {
            return (
              <React.Fragment key={msg._id || index}>
                {renderMessage(msg, index, userId, titleMessages, fetchTitleMessages, true, sentinelRef)}
                
              </React.Fragment>
            )
          }

          return (
            <React.Fragment key={msg._id || index}>
              {renderMessage(msg, index, userId, titleMessages, fetchTitleMessages)}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const renderMessage = (msg, index, userId, titleMessages, fetchTitleMessages, isLast, sentinelRef) => {
  if (msg.isPropertyTitle) {
    if (!titleMessages?.[msg.message]) {
      fetchTitleMessages(msg.message);
    }

    return (
      <React.Fragment key={index}>
        {titleMessages[msg.message] !== undefined ? (
          <div className="property-details chat-message">
            <h2 className="property-title">{titleMessages[msg.message].title}</h2>
            <p className="property-description">{titleMessages[msg.message].description}</p>
            <div className="property-info">
              <span className="property-price">{titleMessages[msg.message].price}</span> - 
              <span className="property-location">{titleMessages[msg.message].location}</span>
            </div>
            {isLast && <div style={{ height: '1px', width: '100%', position: 'absolute', bottom: 0 }}><div ref={sentinelRef} style={{ height: '1px' }} /></div>}
          </div>
        ) : (
          <div className="property-details placeholder">
            <h2>Loading...</h2>
            <p>&nbsp;</p>
            <div className="property-info">
              <span>&nbsp;</span> - <span>&nbsp;</span>
            </div>
            {isLast && <div style={{ height: '1px', width: '100%', position: 'absolute', bottom: 0 }}><div ref={sentinelRef} style={{ height: '1px' }} /></div>}
          </div>
        )}
      </React.Fragment>
    );
  }
  return (
    <div key={msg._id || index} className={`chat-message ${msg.senderId === userId ? 'chat-message-sent' : 'chat-message-received'}`}>
      {msg.message}
      <span className="message-timestamp">{localTime(msg.createdAt)}</span>
      {isLast && <div style={{ height: '1px', width: '100%', position: 'absolute', bottom: 0 }}><div ref={sentinelRef} style={{ height: '1px' }} /></div>}
    </div>
  );
};

export default MessageList;
