const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");
const axios = require("axios");
const cors = require("cors"); // Import the cors package

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);

  
  server.use(cors({
    origin: "http://192.168.18.12:3000", 
    methods: ["GET", "POST"],
  
  }));

  const io = new Server(httpServer, {
    cors: {
      origin: "http://192.168.18.12:3000", 
      methods: ["GET", "POST"],
    }
  });

  io.on("connection", async (socket) => {
    console.log("client-connected at:", socket.id);
    const token = socket.handshake.query.token;

    if (!token) {
      console.log('No token received!');
    }

    try {
      const res = await axios.get(
        "http://192.168.18.12:3000/api/message/getMessage",
        {
          headers: {
            "Content-Type": "application/json",
            "token": token,
          },
        }
      );
      console.log("A user connected");
      const messages = res.data.messages || [];
      socket.emit("load-messages", messages);
    } catch (error) {
      socket.emit("load-messages", []);
    }

    socket.on("message", (message) => {
      io.emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000");
  });
});
