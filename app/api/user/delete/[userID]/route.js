// import jwt from "jsonwebtoken";
import dbConnection from "../../../../../lib/dbConnection.js";
import User from "../../../../../models/User.model.js";
import { NextResponse } from "next/server";
import Message from "@/models/Message.model.js";

export async function DELETE(req) {
  try {
    dbConnection();

    const userid = req.url.split("delete/")[1];

    const user = await User.findByIdAndDelete(userid);
    if (user) {
      await Message.deleteMany({ userID: user._id });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account deleted successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error, please try again later.",
      },
      { status: 500 }
    );
  }
}