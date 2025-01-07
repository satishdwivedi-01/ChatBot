import { useState } from 'react';
import React from 'react';

function App() {
  const [messages, setMessages] = useState([]); // To store the conversation
  const [input, setInput] = useState(""); // To store the user's current input

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (input.trim() === "") return; // Prevent sending empty messages

    // Add the user's message to the chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      // Send the user's message to the backend
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botReply = data.reply;

      // Add the bot's reply to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botReply },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }

 
    setInput("");
  };

  return (
    <div className="flex flex-col  mx-auto mt-10 border rounded-lg shadow-lg p-4 bg-white w-[50vw]">
      
      <h1 className='m-auto mb-4 font-semibold text-gray-700'>Ask anything</h1>

     
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-l-lg p-2 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>

    
      <div className="flex-1 overflow-y-auto border-b p-2 mb-2 mt-3 h-64">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 mt-2 p-2 rounded-lg ${message.sender === "user"
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-200 text-black self-start"
              }`}
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

