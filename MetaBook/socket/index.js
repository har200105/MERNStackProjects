const io = require('socket.io')(7000,{
    cors:{
        origin:'http://localhost:3000'
    }
});

const users=[];

const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId===userId) && 
    users.push({userId,socketId});
}

const removeUser = (socketId) =>{
    users = users.filter(user=>user.socketId !== socketId);
}

const getUser = (userId)=>{
    return users.find((user)=>user.userId === userId);
}

io.on("connection",(socket)=>{
    console.log("User Connected");
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users);
    })

socket.on('sendMessage',({senderId,receiverId,msg})=>{
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage",{
        senderId,
        msg,
    })
})


socket.on('disconnect',()=>{
    console.log("Users Disconnected");
    removeUser(socket.id);
    io.emit("getUsers",users);
});

});
