import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@mui/styles'
import { useNavigate } from "react-router-dom"
import { socket } from '../../services/socket'
import { Button } from '@mui/material'

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
  },
  header: {
    width: "100%",
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#3AB0FF",
  },
  leaveChatButton:{
    height: "50px",
  },
  messageContainer: {
    width: "100%",
    height: "80vh",
    padding: "20px",
    overflowY: "scroll",
    border: "1px solid #3ab0ff",
  },
  messageChat: {},
  sender: {  
    textAlign: "right"
  },
  imageMessage: {
    maxWidth: "60%",
  },
  messageSender: {
    fontSize: "15px",
    display: "flex",
    justifyContent: "flex-end",
    wordBreak: "break-all",
  },
  messageRecipient: {  
    fontSize: "15px",
    wordBreak: "break-all",
  },
  messageStatus: {
    position: "absolute",
    bottom: "10px",
    color: "#44B700",
  }
}))

const NewChatBody = ({username, receiver}) => {
  const styles = useStyles();
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null)

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/")
    window.location.reload();
  }

  useEffect(() => {
    socket.on("messageResponse", data => {
      console.log(data)
      setMessages([...messages, data])
    })
  }, [messages])

  useEffect(() => {
    socket.on("mediaResponse", data => {
      console.log(data)
      setMessages([...messages, data])
  })}, [messages])

  useEffect(() => {
      socket.on("typingResponse", data => setTypingStatus(data))
  },[])

  useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 style={{color: "white"}}>BK Message</h1>
        <Button
          className={styles.leaveChatButton} 
          onClick={handleLeaveChat} 
          variant="contained"
          color="error"
        >
          Leave Chat
        </Button>
      </div>

      <div className={styles.messageContainer}>
        {messages.map(message => console.log(message))}
        {messages.map((message) => (
          message.name === localStorage.getItem("userName") ? (
            <div className={styles.messageChat} key={message.id}>
              {console.log(receiver)}
              <p className={styles.sender}>You</p>
              <div className={styles.messageSender}>
                {message.type === "text" && <p style={{
                  backgroundColor: "#80c960",
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "18px",
                  maxWidth: "60%",
                }}>
                  {message.text}
                </p>}
                {message.type === "image" && 
                  <img 
                    className={styles.imageMessage}
                    src={message.content} 
                    alt={message.filename} 
                  />
                  // {message.content}
                }
                {/* {message.type === "file" && <div className={styles.file}>
                  
                </div>} */}
              </div>
            </div>
          ) : (
            <div className={styles.messageChat} key={message.id}>
              <p className={styles.recipient}>{message.name}</p>
              <div className={styles.messageRecipient}>
                {message.type === "text" && <p style={{
                      backgroundColor: "#f5ccc2",
                      display: "inline-block",
                      padding: "10px",
                      borderRadius: "18px",
                      maxWidth: "60%",
                    }}>{message.text}</p>}
                {message.type === "image" && 
                  <img 
                    className={styles.imageMessage}
                    src={message.content} 
                    alt={message.filename} 
                  />
                }
              </div>  
            </div>
          )
        ))} 
        {/* <div className={styles.messageStatus}>
          <i>{typingStatus ? typingStatus : ''}</i>
        </div> */}
        <div ref={lastMessageRef} />
      </div>
    </div>
  )
}

export default NewChatBody;