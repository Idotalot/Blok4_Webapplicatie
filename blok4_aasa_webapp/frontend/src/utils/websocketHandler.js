// websocket.js

export const createWebSocketConnection = (url, onMessage, onOpen, onError, onClose) => {
    const socket = new WebSocket(url);
  
    socket.onopen = () => {
      console.log('WebSocket connected');
      if (onOpen) onOpen();
    };
  
    socket.onmessage = (event) => {
      if (onMessage) onMessage(event.data);
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
    } else {
      console.warn('WebSocket is not open');
    }
  };
  