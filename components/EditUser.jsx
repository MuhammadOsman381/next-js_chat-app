import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";

const EditUser = (props) => {
  const router = useRouter();
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(props.image);
  const [userID, setUserID] = useState(props.id);

  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const saveUserData = () => {
    console.log(userID);
    router.push("/message");
  };

  return (
    <div className="font-[sans-serif] min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6">
        <div className="bg-white rounded-lg p-10 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] mx-auto">
          <form className="space-y-4">
            {/* <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-extrabold text-center">Edit User</h3>
            </div> */}

            <div className="flex flex-col items-center">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Uploaded"
                    className="w-20 h-20 rounded-full cursor-pointer object-cover border border-gray-300"
                    onClick={handleIconClick}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              ) : (
                <div className="flex items-center justify-center w-20 h-20 border border-gray-300 rounded-full">
                  <FaUser
                    className="text-gray-400 w-10 h-10 cursor-pointer"
                    onClick={handleIconClick}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <div className="relative flex items-center">
                <input
                  name="text"
                  type="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm text-gray-800 border focus:outline   focus:outline-blue-700 bg-white border-gray-300 px-4 py-3 rounded-lg "
                  placeholder="Enter user name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
                </svg>
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm text-gray-800 border focus:outline   focus:outline-blue-700 bg-white border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter user email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
                </svg>
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm text-gray-800 border bg-white border-gray-300 px-4 py-3 rounded-lg  focus:outline   focus:outline-blue-700"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                </svg>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={saveUserData}
                type="button"
                className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline   focus:outline-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
