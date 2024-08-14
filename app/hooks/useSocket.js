import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

export const useSocket = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      socketRef.current = io({
        query: {
          token: token,
        },
      });

      socketRef.current.on("load-messages", (loadedMessages) => {
        setMessages(loadedMessages);
      });

      socketRef.current.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    } else {
      console.error("Token not found in localStorage");
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("message");
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendMessage = (messageData) => {
    if (socketRef.current) {
      socketRef.current.emit("message", messageData);
    }
  };

  return { messages, sendMessage };
};
