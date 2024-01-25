import React, { useState, useEffect } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    handleBotResponse("Ask for Options. I am bot. I am currently talk on limited options only.");
  }, []);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessage = {
      text: userInput,
      fromUser: true,
    };

    setMessages([...messages, newMessage]);
    setUserInput('');

    handleBotResponse(userInput);
  };

  const handleBotResponse = (userInput) => {
    const botResponse = generateBotResponse(userInput);
    setMessages([...messages, botResponse]);
  };

  const generateBotResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();

    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi') || lowerCaseInput.includes('hlo')) {
      return { text: 'Hello! I am your chatbot. How can I assist you?', fromUser: false };
    } else if (lowerCaseInput.includes('how are you')) {
      return { text: 'I am just a bot, but thanks for asking!', fromUser: false };
    } else if (lowerCaseInput.includes('contact details')) {
      return { text: 'Our company contact details are here you contact us any time. Phone Number :- 9310725157, Email Id :- xxxxx@gmail.com', fromUser: false };
    } else if (lowerCaseInput.includes('facing issue')) {
      return { text: 'Conatct using our Email Id :- xxxxx@gmail.com', fromUser: false };
    } else if (lowerCaseInput.includes('return product')) {
      return { text: 'Product return in 10 days', fromUser: false };
    } else if (lowerCaseInput.includes('options')) {
      return { text: 'For Contact details :- Contact Details, For issue in product :- Facing Issue, For return product :- Return Product', fromUser: false };
    }
    else {
      return { text: 'If you query not resolve ask for contact details from our bot', fromUser: false };
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <div
        style={{
          height: '300px',
          border: '1px solid #ccc',
          overflowY: 'auto',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#f7f7f7',
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              padding: '8px',
              borderRadius: '5px',
              marginBottom: '8px',
              textAlign: 'left',
              backgroundColor: '#d9f0ff',
            }}
          >
            {message.text}
          </div>
        ))}
        {userInput && (
        <div
          style={{
            padding: '8px',
            borderRadius: '5px',
            marginBottom: '8px',
            textAlign: 'right',
            backgroundColor: '#e6f7ff',
          }}
        >
          {userInput}
        </div>
      )}
      </div>
      <div style={{ marginTop: '10px', display: 'flex' }}>
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button
          onClick={handleSendMessage}
          style={{ marginLeft: '10px', padding: '8px', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
