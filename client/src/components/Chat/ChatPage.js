import React, { useState, useEffect } from 'react'
import ChatFooter from './ChatFooter'
import NewChatBody from './NewChatBody'
// import UserList from './UserList'
import { makeStyles } from '@mui/styles'
import { socket } from '../../services/socket'
import { Button } from '@mui/material'

const useStyles = makeStyles(() => ({
    container: {
        position: 'relative',
        width: '10vw',
        height: '100%',
        // backgroundImage: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
    },
    userlist: {
        position: 'absolute',
        backgroundColor: "#fff",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        color: "#0097FF",
        margin: "20px",
    },
    user: {
        padding: "5px",
    },
    yourname: {
        fontSize: "1.2em",
        color: "#75C8AE",
    },
}))
const ChatPage = () => {
    const styles = useStyles()
    const [users, setUsers] = useState([])
    const [receiver, setReceiver] = useState()
    const [refreshUser, setRefreshUser] = useState(false)

    useEffect(() => {
      socket.emit('refreshUser', {})
    }, [refreshUser])
    useEffect(() => {
      socket.on('refreshUserResponse', (data) => {
        console.log(data)
        setUsers(data)
        setReceiver(false)
      })
    }, [])

    useEffect(() => {
        socket.on("newUserResponse", data => setUsers(data))
        // eslint-disable-next-line
    }, [socket, users])

    return (
        <div className="chat">
            <div className='chat__main'>
                {console.log('Receiver chatpage', receiver)}
                {/* <ChatBody /> */}
                {receiver ? <NewChatBody receiver={receiver.socketID}/> : <NewChatBody />}
                {receiver ? <ChatFooter receiver={receiver.socketID}/> : <ChatFooter/>}
            </div>
            {/* <UserList /> */}
            <div className={styles.container}>
                <div className={styles.userlist}>
                    <h1 className={styles.title}>User List</h1>
                    <Button
                        onClick={() => setRefreshUser(true)}
                    > 
                    Refresh
                    </Button>
                    {users.map(user => user.username !== localStorage.getItem("userName") ?
                    <div
                        key={user.username}
                        className={styles.user}
                    >
                        {/* <Button  
                        onClick={() => setIsJoined(true)}
                        > */}
                        <Button onClick={() => setReceiver(user)}>{user.username}</Button>
                    </div> : <div className={styles.you}>
                        <p className={styles.yourname}>{user.username} (you)</p>
                    </div>
                    )}  
                </div>
            </div>
        </div>
    )
}

export default ChatPage