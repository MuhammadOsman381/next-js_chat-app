import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnection from "../../../../lib/dbConnection.js";
import User from "../../../../models/User.model.js";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log(email, password)

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message: "JWT secret is not defined.",
        },
        { status: 500 }
      );
    }

    await dbConnection();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email",
        },
        { status: 404 }
      );
    }

    const decryptedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!decryptedPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 404 }
      );
    }

    const token = sign(
      {
        user: {
          id: existingUser._id,
          user: existingUser,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // const headers = new Headers();
    // headers.append(
    //   "Set-Cookie",
    //   `token=${token}; HttpOnly;   Max-Age=3600; Path=/`
    // );
    return NextResponse.json(
      {
        success: true,
        message: `Welcome back ${existingUser.name}`,
        token:token,
        user: { 
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
      }
      
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
