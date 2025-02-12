const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const messages = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on("connection", (socket) => {
  socket.emit("loadMessages", messages);

  socket.on("newMessage", ({ userId, username, text }) => {
    if (userId && username && text) {
      const newMessage = { userId, username, text };
      messages.push(newMessage);
      io.emit("message", newMessage);
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
