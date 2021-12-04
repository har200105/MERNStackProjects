const io = require("socket.io")(7000, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  


  const addUser = (userId, socketId) => {
    console.log('hi', userId, socketId)
    !users.some(user => user.userId === userId) && users.push({ userId, socketId });
}
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  
  const getUser = (userId) => {
    console.log(users);
    return users.find(user => user.userId === userId);
}

  io.on("connection", (socket) => {
    //when connect
    console.log("a user connected");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        console.log(userId  + "Added")
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        console.log(senderId)
        console.log(receiverId)
        console.log(text)
      const user = getUser(receiverId);
      console.log(user)
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });