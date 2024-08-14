"use client";
import EditUser from "@/components/EditUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const profile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [userID, setUserID] = useState("");
  const [editUserDisplay, setEditUserDisplay] = useState(false);

  const getUserProfileData = () => {
    axios
      .get("/api/user/profile", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setImage(response.data.user.profileImage);
        setUserID(response.data.user._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  const deleteAccount = () => {
    if (!userID) {
      console.error("User ID is not defined");
      return;
    }

    axios
      .delete(`/api/user/delete/${userID}`)
      .then((response) => {
        console.log("Success:", response.data.message);
        toast.success(response.data.message);
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server error:", error.response.data.message);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error in setting up request:", error.message);
        }
      });
  };

  const editUser = () => {
    setEditUserDisplay(true);
  };

  return (
    <>
      {!editUserDisplay && (
        <div className="  w-full h-full flex items-center justify-center">
          <div className="card  mt-20 max-sm:mt-10  p-5 flex items-center justify-center  bg-white card-side  text-gray-500 shadow-xl">
            <div className="avatar online">
              <div className="w-32 h-32 max-sm:w-20 max-sm:h-20 rounded-full">
                <img src={image} />
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title  ">{name}</h2>
              <p>{email}</p>
              <div className="card-actions  justify-start">
                <button
                  onClick={editUser}
                  className="btn btn-outline btn-primary btn-sm hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={deleteAccount}
                  className="btn btn-outline btn-error btn-sm hover:text-white  "
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editUserDisplay && (
        <EditUser name={name} email={email} image={image} id={userID} />
      )}
    </>
  );
};

export default profile;
