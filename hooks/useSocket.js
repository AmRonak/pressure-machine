import { useState, useEffect, useRef } from 'react';

function useWebSocket(url) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket(url);
    socketRef.current = socket;

    // Connection opened
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
    };

    // Listen for messages constantly
    socket.onmessage = (event) => {
      const {
        ActualPressure,
        DifferancePressure,
        EndPressure,
        HoldTime,
        SetPressure,
        StabilizationTime,
        StartPressure,
        TestResult,
        TestStatus,
      } = JSON.parse(event.data);
      console.log({
        ActualPressure,
        DifferancePressure,
        EndPressure,
        HoldTime,
        SetPressure,
        StabilizationTime,
        StartPressure,
        TestResult,
        TestStatus,
      });
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Handle connection close
    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    // Handle errors
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up the connection when the component unmounts
    return () => {
      socket.close();
    };
  }, [url]);

  // Function to send messages
  const sendMessage = (message) => {
    if (isConnected && socketRef.current) {
      socketRef.current.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  };

  return { messages, sendMessage, isConnected };
}

export default useWebSocket;
