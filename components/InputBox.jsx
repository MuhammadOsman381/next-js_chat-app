"use client";
import axios from "axios";
import React, { useState } from "react";
import { useSocket } from "@/app/hooks/useSocket";
import toast from "react-hot-toast";

const InputBox = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useSocket();

  const sendMessages = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/api/message/newMessage",
          { message },
          {
            headers: {
              "Content-Type": "application/json",
              token: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          sendMessage(response.data.data);
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-[63vw] border-gray-400 border-t-[4px] max-sm:w-[94vw] rounded-lg">
      <form
        onSubmit={sendMessages}
        className="flex items-center border-t p-4 bg-gray-200 rounded-lg"
      >
        <input
          className="flex-1 mx-3 rounded-lg bg-white text-gray-800 border-none p-2 px-4 outline-none"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="inline-flex hover:bg-gray-300   rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default InputBox;
