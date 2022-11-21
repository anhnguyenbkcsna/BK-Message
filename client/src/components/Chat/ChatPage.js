import React from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import NewChatBody from './NewChatBody'

const ChatPage = () => {
    // const [messages, setMessages] = useState([])
    // const [typingStatus, setTypingStatus] = useState("")
    // const lastMessageRef = useRef(null);

    // useEffect(() => {
    //     socket.on("messageResponse", data => setMessages([...messages, data]))
    // // eslint-disable-next-line
    // }, [socket, messages])

    // useEffect(() => {
    //     socket.on("typingResponse", data => setTypingStatus(data))
    // // eslint-disable-next-line
    // }, [socket])

    // useEffect(() => {
    //     // 👇️ scroll to bottom every time messages change
    //     lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);

    return (
        <div className="chat">
            <div className='chat__main'>
                {/* <ChatBody /> */}
                <NewChatBody />
                <ChatFooter />
            </div>
            <ChatBar />

        </div>
    )
}

export default ChatPage