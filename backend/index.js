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
  // setInterval(()=>console.log(onlineUsers),3000);
  socket.on("newClient", (user) => {
    // console.log("inside new client ");
    // console.log("new client : "+user);
    activeUser=user;
    !onlineUsers.find((u) => u.username === user) &&
      onlineUsers.push({ username: user, socketid: socket.id });
  });
  // socket.join(roomid);
  var temp;
   socket.on('joinRoom', (roomID) => {
    socket.join(roomID); // Join the room using the roomID as the room name
    temp=roomID;
    console.log(`User joined room: ${roomID}`);
  });
  socket.on("chatmessage", (samplemsg) => {
    console.log("inside chatmessage");
    console.log("temp : " + temp);

    io.to(temp).emit("recieveroom", {samplemsg,activeUser});
    
    // console.log("After emitting recieveroom event");
  });
  socket.on("disconnect", () => {
    console.log("socketio disconnected");
  });
});

httpServer.listen(3000, console.log("listening to port 3000"));
