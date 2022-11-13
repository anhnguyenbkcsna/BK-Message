import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, TextField, Box, Link } from '@mui/material'
import { socket } from '../../services/socket';


const Home = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if (userName.length > 0) {
            localStorage.setItem("userName", userName)
            socket.emit("newUser", { userName, socketID: socket.id })
            navigate("/chat")
        }
    }
    return (
        <Box
            component='form' noValidate container
            backgroundColor="#AEBDCA"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
            mt="20vh"
            sx={{
                '& > :not(style)': {
                    m: 1, width: '25ch',
                },
                flexDirection: 'column'
            }}
            onSubmit={handleSubmit}
        >
            <h1 > Sign In Chat App chua co cai password</h1>
            <TextField
                type="text"
                id="username"
                name="username"
                value={userName}
                label="Username"
                variant="outlined"
                onChange={e => setUserName(e.target.value)}
            />
            <TextField
                type="text"
                id="password"
                name="password"
                value={passWord}
                label="Password"
                variant="outlined"
                onChange={e => setPassWord(e.target.value)}
            />
            <Link > Not have an acount? </Link>
            <Link > Forgot password? </Link>
            <Button variant="contained" color="success" onClick={handleSubmit}>Enter</Button>
        </Box >

    )
}

export default Home