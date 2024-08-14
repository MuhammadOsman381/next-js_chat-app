import dbConnection from "../../../../../lib/dbConnection.js";
import User from "../../../../../models/User.model.js";
import { NextResponse } from "next/server";
import Message from "../../../../../models/Message.model.js";

export async function DELETE(req) {
  try {
    dbConnection();
    const id = req.url.split("delete/")[1];
    const msg = await Message.findOne({ _id: id });
    await User.findOneAndUpdate(
      { messageID: id },
      { $pull: { messageID: id } },
      { new: true }
    );
    await msg.deleteOne();
    return NextResponse.json(
      {
        success: true,
        message: "Message deleted succesfully",
        msg:msg,
      },
      { status: 201 }
    );
  } catch (error) {
    // console.error("Error fetching messages:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error, please try again later.",
      },
      { status: 500 }
    );
  }
}
