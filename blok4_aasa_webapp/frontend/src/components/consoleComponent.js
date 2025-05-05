// components/ConsoleComponent.js

import React, { useState, useEffect, useRef } from 'react';
import { createWebSocketConnection, sendMessage } from '../utils/websocketHandler';
import { sendApiData } from '../utils/apiHandler';
import createMessage from '../utils/logsHandler';
import { SlotmachineComponent, generateSlotmachine } from './slotmachineComponent';

const ConsoleComponent = () => {
  const [messages, setMessages] = useState([]);   // Store WebSocket and API messages
  const [inputValue, setInputValue] = useState(''); // Store input value
  const [showSlotMachine, setShowSlotMachine] = useState('')
  const socketRef = useRef(null);                   // WebSocket reference

  // Initialize WebSocket connection when the component mounts
  useEffect(() => {
    // WebSocket connection
    const url = 'ws://145.49.127.248:1880/ws/groep10'
    socketRef.current = createWebSocketConnection(url, 
      (message) => {       
        handleNewLog(
          `LNDR`, 
          `${message}`, 
          "message"
        )
      }, 
      () => {
        console.log('WebSocket connected') 
      },
      (error) => {
        // Handle new Log
        handleNewLog(
          `WebSocket`, 
          `Could not connect with ${url}`, 
          "error"
        )
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
          // const request = createMessage(`HSTN`, `${inputValue}`, "message")
          // console.log(request)
          // setMessages((prevMessages) => [
          //   ...prevMessages,
          //   request
          // ]);
          // sendApiData('http://localhost:8000/api/create_bericht/', request)
          handleNewLog(`HSTN`, `${inputValue}`, "message")


          if (inputValue.startsWith("run ") && inputValue.endsWith(".exe")) {
            let program = inputValue.slice(4, -4)

            let memePrograms = ["django", "trumpet", "catscream", "focus"]
            let programList = ["cleanup", "slotmachine"]
            
            if (memePrograms.includes(program) || programList.includes(program)) {
              let newMessage;
              if (memePrograms.includes(program)) {
                // newMessage = createMessage("SYSTM", `Running ${program}.exe...`, "special")
                handleNewLog("SYSTM", `Running ${program}.exe...`, "special")
                easterEgg(program);
              } else if (programList.includes(program)) {
                if (program === "slotmachine") {
                  // generateSlotmachine();
                  document.getElementById("slotmachine-modal").classList.remove("hidden");
                  document.getElementById("slotmachine").classList.remove("hidden");
                } else {
                  messages.length = 0;
                }
                // newMessage = createMessage("SYSTM", `Running ${program}.exe...`, "success")
                handleNewLog("SYSTM", `Running ${program}.exe...`, "success")
              }

              // setMessages(prevMessages => [
              //   ...prevMessages,
              //   newMessage
              // ]);
              // // ADD MESSAGE TO LOGS
              // sendApiData('http://localhost:8000/api/create_bericht/', newMessage)

            }
          } else {
            handleApiSend()
          }

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
          // setMessages((prevMessages) => [
          //     ...prevMessages,
          //     createMessage(`LNDR`, `${response}`, "message")
          // ]);

          handleNewLog(`LNDR`, `${response}`, "message")
        },
        (error) => {
          console.error('Error sending POST request:', error) // Error handling
          // setMessages((prevMessages) => [
          //   ...prevMessages,
          //   createMessage()
          // ]);

          handleNewLog('API', 'Failed to send POST request', "error")
        }
      );
    }
  };

  const handleNewLog = (sender, message, type) => {
    // Maak JSON op basis van verstuurder, bericht en type
    const request = createMessage(sender, message, type)

    // Voeg bericht toe aan berichten lijst om lijst te updaten
    setMessages((prevMessages) => [
      ...prevMessages,
      request
    ]);

    console.log(messages)

    // Voeg bericht toe aan database
    sendApiData('http://localhost:8000/api/create_bericht/', request.info)
  }

  const easterEgg = (program) => {
    const appContainer = document.getElementById("app-container");
    const image = new Image();

    image.onload = () => {
      // Image exists, use jpg
      appContainer.style.backgroundImage = `url("/images/${program}.jpg")`;
      console.log("Loaded JPG successfully");
    };
    
    image.onerror = () => {
      // JPG not found, try GIF
      appContainer.style.backgroundImage = `url("/images/${program}.gif")`;
      console.log("JPG not found, loaded GIF instead");
    };

    const audio = new Audio(`/audio/${program}.mp3`);
    audio.play();

    audio.addEventListener('ended', () => {
      appContainer.style.backgroundImage = 'url("/images/background.png")';
    });

    // Start loading the JPG
    image.src = `/images/${program}.jpg`;
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
            special: "text-purple-500"
          };
          return (
            <p key={index} className={`font-sourcecode  ${colorMap[message.type] || "text-white"}`}>
              {`[${message.info.verstuurTijd}] ${message.info.verstuurder} >> ${message.info.tekst}`}
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
