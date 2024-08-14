const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const MessageModel =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
