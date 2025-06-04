// src/TelegramBot.js
import React, { useState } from 'react';

const TelegramBot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const response = await fetch('https://api.telegram.org/bot7420629811:AAG0DxKcgbVd08bFTwSny6obuQrqflan9nY/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: '1150418606',
          text: message
        })
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Telegram Bot Integration</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send Message</button>
      {response && <div>Response: {JSON.stringify(response)}</div>}
    </div>
  );
};

export default TelegramBot;
