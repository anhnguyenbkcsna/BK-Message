import { socket } from '../../services/socket';
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';

const ChatFooter = ({receiver}) => {
    const [message, setMessage] = useState("")
    const [media, setMedia] = useState(null)
    // const handleTyping = () => (message) ? socket.emit("typing", `${localStorage.getItem("userName")} is typing`) : null;

    const handleSendMessage = (e) => {
        e.preventDefault()
        if(media !== null){
            socket.emit("media", {
                type: media.type,
                name: localStorage.getItem("userName"),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
                content: media.content,
                filename: media.name,
                to: receiver,
            })
        }
        else if (message.trim() && localStorage.getItem("userName")) {
            socket.emit("message",
                {
                    type: "text",
                    text: message,
                    name: localStorage.getItem("userName"),
                    id: `${socket.id}${Math.random()}`,
                    socketID: socket.id,
                    to: receiver,
                }
            )
        }
        setMedia(null)
        setMessage("")
    }
    useEffect(() => {
        if(message)
            socket.emit("typing", `${localStorage.getItem("userName")} is typing`);
        else socket.emit("typing", "");
        socket.off("typing");
    },[message])
    return (
        <div className='chat__footer' style={{backgroundColor: "#FFF"}}>
            <form className='form' onSubmit={handleSendMessage}>
                <input
                    disabled={receiver ? false : true}
                    type="text"
                    variant={   receiver ? '' : "contained"}
                    placeholder={!receiver ? 'Please choose receiver' : 'Write message'}
                    className='message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    // onKeyDown={handleTyping}
                />
                <Button variant="contained" color="primary" component='label'>
                    Image
                    <input type="file" hidden
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                                setMedia({
                                    type: 'image',
                                    content: reader.result,
                                    name: file.name,
                                })
                                setMessage(file.name)
                                console.log(reader.result);
                            }
                            reader.onerror = (error) => console.log(error);
                        }}
                    />
                </Button>
                {/* <Button variant="contained" color="success">{receiver ? receiver : 'Send'}</Button> */}
            </form>
        </div>
    )
}

export default ChatFooter