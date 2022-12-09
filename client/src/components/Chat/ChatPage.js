import React, { useState, useEffect } from 'react'
import ChatFooter from './ChatFooter'
import NewChatBody from './NewChatBody'
// import UserList from './UserList'
import UserAvatar from './UserAvatar'
import { makeStyles } from '@mui/styles'
import { socket } from '../../services/socket'
import { Button } from '@mui/material'


const useStyles = makeStyles(() => ({
    userlistcontainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: 0.2,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        textAlign: "center",
        backgroundColor: "#0087fa",
        borderRadius: "25px",
        margin: "0 auto",
        // backgroundImage: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
    },
    title: {
        color: "white",
        margin: "20px",
    },
    user: {
        padding: "5px",
        fontSize: "1.2em",
        width: "90%",
        margin: "5px",
    },
    yourname: {
        fontSize: "1.5em",
        margin: "auto"
    },
    chooseUserButton: {
        width: "100%",
        height: "75px",
        borderRadius: "50px"
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
            <div className='chat__main' style={{backgroundColor: "rgba(0,0,0,0.05)"}}>
                {console.log('Receiver chatpage', receiver)}
                {/* <ChatBody /> */}
                {receiver ? <NewChatBody username={receiver.username} receiver={receiver.socketID}/> : <NewChatBody />}
                {receiver ? <ChatFooter receiver={receiver.socketID}/> : <ChatFooter/>}
            </div>

            {/* <UserList /> */}
            <div className={styles.userlistcontainer}>
                <h1 className={styles.title}>User List</h1>
                {/* <Button
                    onClick={() => {
                        setRefreshUser(true)
                    }}
                > 
                    Refresh
                </Button> */}
                {users.map(user => user.username !== localStorage.getItem("userName") ?
                <div
                    key={user.username}
                    className={styles.user}
                >
                    <Button
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#white",
                            color: "#FFFFFF",
                            border: "1px solid white"
                        }}
                        color="warning"
                        // color={receiver.username === user.username ? "warning" : "error"}
                        className={styles.chooseUserButton}
                        onClick={() => setReceiver(user)}
                        variant={receiver.username === user.username ? "contained" : "outlined"}
                        // color={receiver.username === user.username ? "success" : "danger"}
                    >
                        {/* <div className={styles.contentInsideButton}> */}
                            <UserAvatar name={user.username} className={styles.avatar}/>
                            <p style={{fontSize: "1.5em", margin: "auto"}}>{user.username}</p>

                        {/* </div> */}
                    </Button>
                </div> 
                : <div className={styles.user}>
                    <Button 
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#white",
                            color: "#FFFFFF",
                        }}
                        className={styles.chooseUserButton}
                        disabled 
                        variant="contained"
                        >
                            <UserAvatar name={user.username} className={styles.avatar}/>
                            <p className={styles.yourname}>{user.username} (you)</p>
                    </Button>
                </div>
                )}  
            </div>
        </div>
    )
}

export default ChatPage