import jwt from "jsonwebtoken";
import dbConnection from "../../../../lib/dbConnection.js";
import User from "../../../../models/User.model.js";
import { NextResponse } from "next/server";
import Message from "@/models/Message.model.js";

export async function POST(req) {
  try {

    // Parse the JSON body of the request
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required!",
        },
        { status: 401 }
      );
    }

    // Establish a database connection
    dbConnection();

    // Get and parse cookies from the request headers
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No token provided.",
        },
        { status: 401 }
      );
    }

    // Decode the JWT token
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.user || !decoded.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token.",
        },
        { status: 401 }
      );
    }

    // Fetch the user from the database
    const user = await User.findOne({ _id: decoded.user.id });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // Create a new message
    const newMessage = await Message.create({
      content: message,
      userID: user._id,
    });

    // Update the user's message list
    user.messageID.push(newMessage._id);
    await user.save();

    // Construct the response data
    const responseData = {
      _id: newMessage._id,
      content: newMessage.content,
      userID: newMessage.userID,
      createdAt: newMessage.createdAt,
      __v: newMessage.__v,
      isLoggedInUser: true,
      userName: user.name,
      userImage: user.profileImage, 
    };

    // console.log(responseData);



    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
        data: responseData,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error, please try again later.",
      },
      { status: 500 }
    );
  }
}
