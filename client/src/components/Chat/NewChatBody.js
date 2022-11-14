import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material'

const useStyles = makeStyles(() => ({
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
  messageSender: {
    backgroundColor: "#80c960",
    maxWidth: "300px",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "15px",
    marginLeft: "auto",
  },
  messageRecipient: {  
    backgroundColor: "#f5ccc2",
    width: "300px",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "15px",
  },
}))

const NewChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/")
    window.location.reload();
  }

  return (
    <>
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
        {messages.map((message) => (
          message.name === localStorage.getItem("userName") ? (
            <div className={styles.messageChat} key={message.id}>
              <p className={styles.sender}>You</p>
              <div className={styles.messageSender}>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className={styles.messageChat} key={message.id}>
              <p className={styles.recipient}>{message.name}</p>
              <div className={styles.messageRecipient}>
                <p>{message.text}</p>
              </div>  
            </div>
          )
        ))}
        <div className={styles.messageStatus}>
          <i>{typingStatus ? typingStatus : ''}</i>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  )
}

export default NewChatBody;