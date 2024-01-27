import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("message", (data) => {
    const value = JSON.parse(data);
    io.emit("message", `${value.sender} : ${value.message}`);
  });
});

httpServer.listen(3500, () => {
  console.log("listening on port 3500");
});
