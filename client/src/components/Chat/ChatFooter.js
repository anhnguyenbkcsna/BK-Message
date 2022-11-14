import { socket } from '../../services/socket';
import React, { useEffect, useState } from 'react'

const ChatFooter = () => {
    const [message, setMessage] = useState("")
    // const handleTyping = () => (message) ? socket.emit("typing", `${localStorage.getItem("userName")} is typing`) : null;

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message.trim() && localStorage.getItem("userName")) {
            socket.emit("message",
                {
                    text: message,
                    name: localStorage.getItem("userName"),
                    id: `${socket.id}${Math.random()}`,
                    socketID: socket.id
                }
            )
        }
        setMessage("")
    }
    useEffect(() => {
        if(message)
            socket.emit("typing", `${localStorage.getItem("userName")} is typing`);
        else socket.emit("typing", "");
        socket.off("typing");
    },[message])
    return (
        <div className='chat__footer'>
            <form className='form' onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder='Write message'
                    className='message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    // onKeyDown={handleTyping}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    )
}

export default ChatFooter