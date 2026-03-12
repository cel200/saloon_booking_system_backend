console.log("Starting server.js...");
require("dotenv").config(); 
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
// const dotenv = require("dotenv");
const connectDb = require("./db/config");
const router = require("./routes");

// dotenv.config();
connectDb();

const app = express();

// ✅ Middlewares first
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinAdminRoom", () => {
    socket.join("adminRoom");
  });
  socket.on("joinUserRoom", (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User joined room user_${userId}`);
  });

  // Staff joins their own room
  socket.on("joinStaffRoom", (staffId) => {
    socket.join(`staff_${staffId}`);
    console.log(`Staff joined room staff_${staffId}`);
  });
});

server.listen(5000, () => {
  console.log("Server running");
});
// ✅ Routes after middleware
app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`>>> Server running on port ${PORT} <<<`);
});
