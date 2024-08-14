import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import dbConnection from "../../../../lib/dbConnection.js";
import User from "../../../../models/User.model.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { success: false, message: "JWT secret is not defined." },
        { status: 500 }
      );
    }

    console.log(name,email,password,image)

    await dbConnection();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImagePath = null;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const fileName = `${Date.now()}-${image.name}`;
      profileImagePath = `http://192.168.18.12:3000/uploads/${fileName}`;
      const filePath = path.join(uploadDir, fileName);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(filePath, buffer);
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImage: profileImagePath,
    });

    
    const token = sign(
      {
        user: {
          id: newUser._id,
          user: newUser,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profileImage: profileImagePath,
      },
    },
    { status: 201 }
  );
 
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
