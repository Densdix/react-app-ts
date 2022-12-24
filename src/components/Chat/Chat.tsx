import React, {useEffect, useState} from "react";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Chat = () => {
    //const messages = [1,2,3,4,5,6,7,8,9]
    const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        wsChannel.send(message)
        setMessage('')
    }

    useEffect(()=> {
        wsChannel.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
            console.log("123")
        })
    },[])

    return (
        <div>
            <div style={{height: '400px', overflowY: "auto"}}>
                {messages.map(m => <Message message={m}/>)}
            </div>
            <div>
                <textarea onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
                <div><button onClick={sendMessage}>Send</button></div>
            </div>
        </div>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
        return (
        <div>
            <img className="w-6 inline-block" src={message.photo} alt=""/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

export default Chat
