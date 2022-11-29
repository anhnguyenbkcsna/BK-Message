const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 4000

var Server  = require('http').createServer(app);
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())
const users = [
    {username: "admin", password: "admin", socketID: "none"},
    {username: "user1", password: "1", socketID: "user1id"},
    {username: "user2", password: "2", socketID: "user2id"},
]

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)
    socket.on('refreshUser', (data) => {
        socketIO.emit('refreshUserResponse', users)
    })

    socket.on("signUp", data => {
        users.push(data)
        console.log('users', users)
        socketIO.emit("newUserResponse", users)
    })
    // check if user is exist
    socket.on("signIn", data => {
        // users.map(user => console.log(user))
        console.log(data)
        const getUser = users.find((user) => user.username == data.userName && user.password == data.passWord)
        console.log(getUser)
        // if(data.username === user.username) socket.emit('signIn',true)
        // else socket.emit('signedIn', {type: 'wrongPassword'})
        getUser ? socket.emit('signedIn', true) : socket.emit('signedIn', false)
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
        // const users = users.filter(user => user.socketID !== socket.id)  
        socketIO.emit("newUserResponse", users)
        socket.disconnect()
    });
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello" })
});


http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});