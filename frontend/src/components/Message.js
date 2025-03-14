import React from 'react';

const Message = ({ message, messageType }) => {
  if (!message) return null; // Hide when no message

  return (
    <div className={`message ${messageType}`}>
      {message}
    </div>
  );
};

export default Message;
