import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, TextField, Box } from '@mui/material'
const Home = ({ socket }) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("userName", userName)
        socket.emit("newUser", { userName, socketID: socket.id })
        navigate("/chat")
    }
    return (
        // <form className='home__container' onSubmit={handleSubmit}>
        // <h2 className='home__header'>Your name in the chat</h2>
        <Box component='form' noValidate
            sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            onSubmit={handleSubmit}>
            <TextField type="text"
                id="username" name="username" minLengt="1" value={userName}
                label="Username" variant="outlined"
                onChange={e => setUserName(e.target.value)} />
            <Button variant="contained" color="success" onclick={handleSubmit}>Enter </Button>
        </Box>
        /* <input type="text"
            minLengt="1"
            name="username"
            id='username'
            className='username__input'
            value={userName}
            onChange={e => setUserName(e.target.value)}
        /> */

        /* <button className='home__cta'>SIGN IN</button> */
        // </form>
    )
}

export default Home