const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");

const sever = http.createServer(app);

const io = new Server(sever, { cors: { origin: "http://localhost:3000/" } });

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome" });
});

module.exports = sever;
