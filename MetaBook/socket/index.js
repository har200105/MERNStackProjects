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
    console.log("a user connected");
    socket.on("addUser", (userId) => {
        console.log(userId  + "Added")
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
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
  
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });