import dbConnection from "../../../../lib/dbConnection.js";
import User from "../../../../models/User.model.js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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

    if (!decoded || !decoded.user || !decoded.user.id) {
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


    return NextResponse.json({
      success: true,
      message: "user profile found succesfully!",
      user: user,
    });
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
