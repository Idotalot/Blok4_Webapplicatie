import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { sendApiData } from '../utils/apiHandler';
import createMessage from '../utils/logsHandler';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ConsoleComponent = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([]);   // Store WebSocket and API messages
  const [inputValue, setInputValue] = useState(''); // Store input value
  const socketRef = useRef(null);                   // WebSocket reference
  const [wsStatus, changeWsStatus] = useState('disconnected');

  useImperativeHandle(ref, () => ({
    addLog(sender, message, type) {
      handleNewLog(
        sender,
        message,
        type
      )
    },

    setWsStatus(status) {
      changeWsStatus(status)
    }
  }));

  const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          handleNewLog(`Houston`, `${inputValue}`, "message");

          if (inputValue.startsWith("run ")) {
            let program = inputValue.slice(4);

            // Programma lijst
            let memePrograms = ["django", "trumpet", "catscream", "focus"];
            let programList = ["cleanup", "slotmachine", "help", "plant-flag"];

            // Programma handling
            if (memePrograms.includes(program) || programList.includes(program)) {
              if (memePrograms.includes(program)) {
                handleNewLog("System", `Running ${program}`, "special");
                easterEgg(program);
              } else if (programList.includes(program)) {
                switch (program) {
                  case "slotmachine":
                    document.getElementById("slotmachine-modal").classList.remove("hidden");
                    document.getElementById("slotmachine").classList.remove("hidden");
                    break;
                  case "cleanup":
                    messages.length = 0
                    break;
                  case "help":
                    handleNewLog('', '', 'invalid')
                    handleNewLog('List Of Programs', '', 'invalid')
                    programList.forEach(program => {
                      handleNewLog('==', program, 'invalid' )
                    })
                    memePrograms.forEach(program => {
                      handleNewLog('==', program, 'invalid' )
                    });
                    break;
                  case "plant-flag":
                    handleNewLog('System', 'Sending POST request to http://145.49.127.248:1880/groep10', 'warning');
                    handleApiSend();
                    break;
                  default:
                    break;
                }
                
                handleNewLog("System", `Running ${program}`, "success");
              }
            } else {
              handleNewLog("System", `Unknown command "${inputValue}" type "run help" for more information`, "error");
            }
          } else if (inputValue.startsWith('post ')) {
            const postRequest = inputValue.slice(5);
            const url = `http://145.49.127.248:1880/groep10?${postRequest}`;
            handleApiSend(url)

          } else {
            handleNewLog("System", `Unknown command "${inputValue}" type "run help" for more information`, "error");
          }

          setInputValue(''); // Clear input field
      }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleApiSend = (url) => {
    if (inputValue.trim()) {
      const data = {}; // Data is passed via URL query parameters
      sendApiData(url, data,
        (response) => {
          console.log(response);
          handleNewLog(
            `Satelliet`,
            `${response.status}`, 
            "success"
          );
        },
        (error) => {
          console.error('Error sending POST request:', error);
          handleNewLog('API', 'Failed to send POST request', "error");
        }
      );
    }
  };

  const handleNewLog = (sender, message, type) => {
    const request = createMessage(sender, message, type);
    setMessages((prevMessages) => [...prevMessages, request]);

    if (type != "invalid") {
      sendApiData('http://localhost:8000/api/create_bericht/', request.info);
    }
  };

  const easterEgg = (program) => {
    const appContainer = document.getElementById("app-container");
    const image = new Image();

    image.onload = () => {
      appContainer.style.backgroundImage = `url("/images/${program}.jpg")`;
      console.log("Loaded JPG successfully");
    };

    image.onerror = () => {
      appContainer.style.backgroundImage = `url("/images/${program}.gif")`;
      console.log("JPG not found, loaded GIF instead");
    };

    const audio = new Audio(`/audio/${program}.mp3`);
    audio.play();

    audio.addEventListener('ended', () => {
      appContainer.style.backgroundImage = 'url("/images/background.png")';
    });

    image.src = `/images/${program}.jpg`;
  };

  return (
    <div id="console-container" className="flex flex-col h-full scrollbar w-full lg:w-[40rem]">
      <div className='flex flex-row p-4 rounded-t-2xl lg:rounded-2xl overflow-auto lg:bg-[rgba(6,12,28,0.85)] font-sourcecode mb-3'>
        <FontAwesomeIcon 
          icon={faCircle} 
          id='wsStatusBubble' 
          className={`text-3xl animate-pulse ${wsStatus === 'success' ? 'text-green-600' : wsStatus === 'error' ? 'text-red-600' : wsStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}
        />
        <p className='ml-3 text-white'>
          {wsStatus === 'success' ? 'Connected' : wsStatus === 'error' ? 'Not Connected' : 'Not Connected'}
        </p>
      </div>

      <div id="console-panel" className="bg-black flex-1 p-4 rounded-t-2xl lg:rounded-2xl overflow-auto lg:opacity-80 font-sourcecode" style={{scrollbarColor: "#ffffff00"}}>
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
        <div ref={bottomRef}></div>
        <div className="flex flex-row">
          <p className="text-white font-sourcecode w-24">{"HSTN >>"}</p>
          <input
            id="console-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="bg-black pl-2 w-full rounded-xl text-white font-sourcecode focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
});

export default ConsoleComponent;
