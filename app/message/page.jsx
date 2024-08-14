"use client";
import InputBox from "@/components/InputBox";
import { useSocket } from "../hooks/useSocket.js";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader.jsx";
import { RiDeleteBinFill } from "react-icons/ri";
import axios from "axios";

export default function Home() {
  const { messages } = useSocket();
  const [messageArray, setMessageArray] = useState(messages);
  const endOfMessagesRef = useRef(null);
  const userID = localStorage.getItem("userID");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setMessageArray(messages);
  }, [messages]);

  useEffect(() => {
    setLoader(false);
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageArray]);

  const deleteMessage = async (id) => {
    let msgID = await id;
    axios
      .delete(`/api/message/delete/${msgID}`)
      .then((response) => {
        console.log(response);
        // toast.success(response.data.message);
        removeMessageLocally(msgID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeMessageLocally = (id) => {
    const updatedMessages = messageArray.filter(
      (message) => message._id !== id
    );
    setMessageArray(updatedMessages);
    setLoader(false);
  };

  return (
    <div className="w-full h-full mt-20 flex flex-col items-center justify-center gap-2">
      <div className="shadow-lg shadow-gray-300 bg-white border-gray-400 border-t-[4px] custom-scrollbar rounded-xl overflow-auto flex flex-col items-center justify-center mt-10 max-sm:mt-5 h-[65vh] ">
        <div className="w-[60vw] overflow-auto flex flex-col bg-white border-none rounded-lg  max-sm:w-[94vw]">
          {messageArray?.length === 0 ? (
            loader ? (
              <Loader />
            ) : (
              <div className="text-black text-center">No messages found</div>
            )
          ) : (
            messageArray?.map((items, index) => (
              <div
                key={index}
                className="flex bg-white  flex-col px-6 py-5 space-y-4"
              >
                {userID == items?.userID ? (
                  <>
                    <div className="  flex flex-row     items-end justify-end w-auto h-auto">
                      <div className=" w-auto h-[14vh] flex items-center justify-center">
                        <button
                          onClick={() => deleteMessage(items._id)}
                          className="bg-red-500 hover:bg-red-600 shadow-xl h-8 w-8 mr-2 rounded-full text-white flex items-center justify-center "
                        >
                          <RiDeleteBinFill />
                        </button>
                      </div>
                      <div className="flex flex-row items-end justify-end">
                        <div className=" mr-3 w-auto h-auto">
                          <div className=" bg-indigo-100 h-auto text-gray-800 p-3 rounded-lg shadow-md">
                            <span className="font-normal text-[12px]">
                              {items.userName}
                            </span>
                            <div className="font-bold">{items.content}</div>
                            <span className="font-normal text-[12px]">
                              {new Date(items.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <img
                          className="rounded-full w-10 h-10 object-cover"
                          src={items?.userImage}
                          alt="User"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start w-auto h-auto">
                    <img
                      className="rounded-full w-10 h-10 object-cover"
                      src={items?.userImage}
                      alt="User"
                    />
                    <div className="ml-3 w-auto h-auto">
                      <div className="bg-indigo-500 text-white p-3 rounded-lg shadow-md">
                        <span className="font-normal text-[12px]">
                          {items?.userName}
                        </span>
                        <div className="font-bold">{items?.content}</div>
                        <span className="font-normal text-[12px]">
                          {new Date(items.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
      <InputBox />
    </div>
  );
}
