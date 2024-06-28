import React from 'react';
import localTime from '../../utils/localDateTime.js';

const MessageList = ({ messages, userId, titleMessages, fetchTitleMessages }) => {
  return (
    <div className="chat-history" style={{ height: '80%', overflowY: 'scroll' }}>
      {messages.map((msg, index) => {
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
          <div key={index} className={`chat-message ${msg.senderId === userId ? 'chat-message-sent' : 'chat-message-received'}`}>
            {msg.message}
            <span className="message-timestamp">{localTime(msg.createdAt)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;