import React, { useState } from 'react';

const MessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-light message-form">
      <div className="input-group">
        <input
          type="text"
          placeholder="Type a message"
          aria-describedby="button-addon2"
          className="form-control rounded-0 border-0 py-4 bg-light"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="input-group-append">
          <button id="button-addon2" type="submit" className="btn btn-link">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;