const httpServer = require("http").createServer();
const cors = require("cors");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});
let activeUser;
const onlineUsers = [];
io.on("connection", (socket) => {
  console.log("Connected to socketio");
  socket.on("newClient", (user) => {
    activeUser = user;
    !onlineUsers.find((u) => u.username === user) &&
      onlineUsers.push({ username: user, socketid: socket.id });
  });
  console.log(onlineUsers);
  var temp;
  socket.on("joinRoom", (roomID) => {
    socket.join(roomID); // Join the room using the roomID as the room name
    temp = roomID;
    console.log(`User joined room: ${roomID}`);
  });
  socket.on("chatmessage", (samplemsg) => {
    console.log("inside chatmessage");
    const index = onlineUsers.findIndex(
      (user) => user.socketid === socket.id
    );
    activeUser = onlineUsers[index].username;
    console.log(activeUser);
    io.to(temp).emit("recieveroom", { samplemsg, activeUser });
  });
  socket.on("disconnect", () => {
    console.log("socketio disconnected");
  });
});

httpServer.listen(3000, console.log("listening to port 3000"));
