// components/ConsoleComponent.js

import React, { useState, useEffect, useRef } from 'react';
import { createWebSocketConnection, sendMessage } from '../utils/websocketHandler';  // WebSocket functions
import { sendApiData } from '../utils/apiHandler';  // API POST function
import createMessage from '../utils/logsHandler';

const ConsoleComponent = () => {
  const [messages, setMessages] = useState([]);   // Store WebSocket and API messages
  const [inputValue, setInputValue] = useState(''); // Store input value
  const socketRef = useRef(null);                   // WebSocket reference

  // Initialize WebSocket connection when the component mounts
  useEffect(() => {
    // WebSocket connection
    const url = 'ws://145.49.127.248:1880/ws/groep10'
    socketRef.current = createWebSocketConnection(url, 
      (message) => {
        // Displayed Message
        setMessages((prevMessages) => [
          ...prevMessages, 
          createMessage(`LNDR >> ${message}`, "message")
        ]);
      }, 
      () => {
        console.log('WebSocket connected') 
      },
      (error) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          createMessage(`WebSocket : Could not connect with ${url}`, "error")
        ]);
      }, 
      () => {
        console.log('WebSocket disconnected')
      }
    );

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts


  const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
      // handleWebSocketSend();  // Send via WebSocket
          setMessages((prevMessages) => [
                ...prevMessages,
              createMessage(`HSTN >> ${inputValue}`, "message")
              ]);

          handleApiSend();        // Send via API

          setInputValue(''); // Clear input field
      }
  };

  // Handle user input changes
  const handleInputChange = (e) => {
    // Input veranderen per wijziging
    setInputValue(e.target.value);
  };

  const bottomRef = useRef(null);

  // Automatisch naarbeneden scrollen in console
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle sending data to the REST API (POST request)
  const handleApiSend = () => {
    if (inputValue.trim()) {
      // Input ophalen vanuit command prompt
      const url = `http://145.49.127.248:1880/groep10?${inputValue}`;

      // Prepare data for the POST request (empty as data is in the URL)
      const data = {};

      // Use the sendApiData function (which performs the POST request)
      sendApiData(url, data,
        (response) => {
          // On success, display message in UI and clear input field
          console.log(response)
          setMessages((prevMessages) => [
              ...prevMessages,
              createMessage(`LNDR >> ${response}`, "message")
          ]);
        },
        (error) => {
          console.error('Error sending POST request:', error) // Error handling
          setMessages((prevMessages) => [
            ...prevMessages,
            createMessage('API : Failed to fetch request', "error")
          ]);
        }
      );
    }
  };

  // HTML CODE
  return (
    <div id="console-container" className="flex flex-col h-full scrollbar w-full lg:w-[40rem]">
      <div id="console-panel" className="bg-black flex-1 p-4 rounded-t-2xl lg:rounded-2xl overflow-auto lg:opacity-80 font-sourcecode">
        {/* Display all messages */}
        {messages.map((message, index) => {
          const colorMap = {
            success: "text-green-500",
            warning: "text-yellow-500",
            error: "text-red-500",
          };
          return (
            <p key={index} className={`font-sourcecode  ${colorMap[message.type] || "text-white"}`}>
              {`[${message.time}] `}{message.response}
            </p>
          );
        })}
        {/* dummy div voor auto-scroll */}
        <div ref={bottomRef}></div>
        {/* Input field for user to enter message */}
        <div className="flex flex-row">
          <p className="text-white font-sourcecode w-24">{"HSTN >>"}</p>
          <input
            id="console-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}  // Handle key press (Enter key)
            className="bg-black pl-2 w-full rounded-xl text-white font-sourcecode focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default ConsoleComponent;
