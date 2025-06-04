import React, { useState } from 'react';
import axios from 'axios';

const TelegramForm = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/api/telegram/webhook', {
        message: {
          text: message,
          chat: {
            id: '123456789'  // Replace with your chat ID
          }
        }
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default TelegramForm;