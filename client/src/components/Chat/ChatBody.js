// import React, { useState, useEffect, useRef } from 'react'
// // import { socket } from '../../services/socket';
// import { useNavigate } from "react-router-dom"
// import { socket } from '../../services/socket'

// const ChatBody = () => {
//     const navigate = useNavigate()
//     const [messages, setMessages] = useState([])
//     const [typingStatus, setTypingStatus] = useState("")
//     const lastMessageRef = useRef(null)

//     const handleLeaveChat = () => {
//         localStorage.removeItem("userName")
//         navigate("/")
//         window.location.reload()
//     }
    
//     useEffect(() => {
//         socket.on("messageResponse", data => setMessages([...messages, data]))
//     }, [messages])

//     useEffect(() => {
//         socket.on("typingResponse", data => setTypingStatus(data))
//     },[])

//     useEffect(() => {
//         lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//     },[messages])
//     return (
//         <>
//             <header className='chat__mainHeader'>
//                 <p>Message</p>
//                 <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
//             </header>


//             <div className='message__container'>
//                 {messages.map(message => (
//                     message.name === localStorage.getItem("userName") ? (
//                         <div className="message__chats" key={message.id}>
//                             <p className='sender__name'>You</p>
//                             <div className='message__sender'>
//                                 <p>{message.text}</p>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="message__chats" key={message.id}>
//                             <p>{message.name}</p>
//                             <div className='message__recipient'>
//                                 <p>{message.text}</p>
//                             </div>
//                         </div>
//                     )
//                 ))}

//                 <div className='message__status'>
//                     <p>{typingStatus ? typingStatus : ''}</p>
//                 </div>
//                 <div ref={lastMessageRef} />
//             </div>
//         </>
//     )
// }

// export default ChatBody