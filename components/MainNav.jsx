"use client";
import { useState } from "react";
import Link from "next/link";
import logo from "../assets/WhatsApp Image 2024-08-13 at 2.19.02 AM.jpeg";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const MainNav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const logOutUser = async () => {
    setIsOpen(false);
    toast.success("user logged out succesfully! ");
    const daysToExpire = 0;
    const expires = new Date(
      Date.now() + daysToExpire * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `token=null; expires=${expires}; path=/; SameSite=Lax; Secure`;
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className=" z-10 absolute  -mt-2   max-sm:-mt-20 mx-auto w-full  border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-2  ">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src={logo}
                  width={40}
                  height={40}
                  className="mix-blend-multiply object-cover"
                  alt="Picture of the author"
                />
              </div>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen
                ? "flex flex-col max-h-screen opacity-100"
                : "max-sm:max-h-0 max-sm:opacity-0 max-lg:max-h-0 max-lg:opacity-0 "
            } absolute top-16 left-0 right-0 z-20 w-full bg-white py-4 md:static md:w-auto md:flex-row md:items-center md:justify-center md:gap-5 md:py-0 transition-all duration-300 ease-in-out overflow-hidden`}
          >
            <Link onClick={() => setIsOpen(false)} href="/message">
              <div className=" w-full py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 md:inline-block md:w-auto md:rounded-lg md:py-1 md:px-2 md:text-center  flex">
                Chat
              </div>
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/message/profile">
              <div className=" w-full py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 md:inline-block md:w-auto md:rounded-lg md:py-1 md:px-2 md:text-center flex">
                Profile
              </div>
            </Link>

            <div
              onClick={() => logOutUser()}
              className=" ml-2 w-[20vw] cursor-pointer py-2 px-4 text-sm font-semibold text-white bg-blue-600 shadow-sm hover:bg-blue-700 rounded-lg md:w-auto md:inline-flex md:justify-center md:items-center md:px-3 md:py-2 flex"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
