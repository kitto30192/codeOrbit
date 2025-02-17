// src/Chat.js
import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "./codeEditor"; // Import your SocketContext

function Chat() {
  const socket = useContext(SocketContext); // Access the socket instance
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Handle receiving messages
  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("roomData", (user) => {
      console.log(user);
      setMessages((prevMessages) => [...prevMessages, `join ${user.name}`]);
    });

    // Cleanup the listener on unmount
    return () => {
      socket.off("message");
    };
  }, [socket]);

  // Handle input change
  const handleInputChange = (e) => setMessage(e.target.value);

  // Handle sending messages
  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message); // Send the message to the server
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <div className="w-full mx-auto mt-8">
      <div className="bg-gray-600 border border-gray-300 rounded-lg shadow-lg">
        <div className="p-4 h-56 overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2 p-2 w-auto bg-white rounded-lg">
              {msg}
            </div>
          ))}
        </div>
        <div className="p-4 flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

