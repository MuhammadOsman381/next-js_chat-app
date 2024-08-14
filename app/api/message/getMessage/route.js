import dbConnection from "../../../../lib/dbConnection.js";
import User from "../../../../models/User.model.js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Message from "../../../../models/Message.model.js";

export async function GET(req) {
  try {
    dbConnection();

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

    const decoded = jwt.decode(token);
    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token.",
        },
        { status: 401 }
      );
    }

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

    const isLoggedInUserMessages = await Message.find({ userID: user._id });

    const otherUsersMessages = await Message.find({
      userID: { $ne: user._id },
    });

    const loggedInUserMessages = isLoggedInUserMessages.map((msg) => ({
      ...msg.toObject(),
      isLoggedInUser: true,
      userName: user.name,
      userImage: user.profileImage || "",
    }));

    const otherUsersMessagesWithDetails = await Promise.all(
      otherUsersMessages.map(async (msg) => {
        const messageUser = await User.findById(msg.userID);
        return {
          ...msg.toObject(),
          isLoggedInUser: false,
          userName: messageUser?.name || "Unknown",
          userImage: messageUser?.profileImage || "",
        };
      })
    );

    const messages = [
      ...loggedInUserMessages,
      ...otherUsersMessagesWithDetails,
    ];

    messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return NextResponse.json(
      {
        success: true,
        messages,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error, please try again later.",
      },
      { status: 500 }
    );
  }
}
