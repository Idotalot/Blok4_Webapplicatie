// websocket.js

export const createWebSocketConnection = (onMessage, onOpen, onError, onClose) => {
    const socket = new WebSocket('ws://145.49.127.248:1880/ws/groep10');
    
    socket.onopen = () => {
      console.log('WebSocket connected');
      if (onOpen) onOpen();
    };
  
    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        if (onMessage) onMessage(parsedData);
      } catch (e) {
        console.error('Failed to parse WebSocket message:', e);
      }
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) onError(error);
    };
  
    socket.onclose = () => {
      console.log('WebSocket disconnected');
      if (onClose) onClose();
    };
  
    return socket;
  };
  
  export const sendMessage = (socket, message) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      console.log("sdsad")
    } else {
      console.warn('WebSocket is not open');
    }
  };
  