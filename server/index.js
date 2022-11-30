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
let users = [
    {username: "admin", socketID: "none"},
    {username: "user1", socketID: "none"},
    {username: "user2", socketID: "none"},
    {username: "user3", socketID: "none"},
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
    socket.on("signIn", (data) => {
        let user = users.find((user) => {
            return (user.username === data.username)
        })
        user.socketID = data.socketID
        const index = users.indexOf(user)
        console.log('  index : ' + index)
        if(index > -1){
            users = users.filter((e) => e !== user)
            users.push(user)
            console.log('update users: ', users)
        }
        socketIO.emit("newUserResponse", users)
        socket.emit('signedIn', user)
    })
    socket.on("message", data => {
        console.log(data)
        console.log("data receiver", data.to)
        // socketIO.to(data.to).to(data.socketID).emit("messageResponse", data)
        socketIO.to(data.to).emit("messageResponse", data)
        socketIO.to(data.socketID).emit("messageResponse", data)
    })

    socket.on("media", data => {
        console.log(data)
        console.log("data receiver", data.to)
        // socketIO.to(data.to).to(data.socketID).emit("messageResponse", data)
        socketIO.to(data.to).emit("mediaResponse", data)
        socketIO.to(data.socketID).emit("mediaResponse", data)
    })

    socket.on("typing", data => (
        socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("", data => (
        socket.emit("message", data)
    ))

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        // users = users.filter(user => user.socketID !== socket.id)
        // remove user
        // const index = users.indexOf((user) => user.socketID !== socket.id)
        // if(index > -1){
        //     users.splice(index, 1)
        // }
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