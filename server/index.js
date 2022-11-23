const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())
let users = []

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)

    // receive message
    socket.on("newUser", data => {
        users.push(data)
        console.log('users ', users)
        socketIO.emit("newUserResponse", users)
    })
    socket.on("message", data => {
        socketIO.emit("messageResponse", data)
    })
    
    socket.on("media", data => {
        socketIO.emit("mediaResponse", data)
    })

    socket.on("typing", data => (
        socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("", data => (
        socket.emit("message", data)
    ))

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter(user => user.socketID !== socket.id)
        socketIO.emit("newUserResponse", users)
        socket.disconnect()
    });
    // socket.on('joined', () => {
    //     socketIO.emit("available", users);
    // })
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello" })
});


http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});