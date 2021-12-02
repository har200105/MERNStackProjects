import React, { useContext, useEffect, useRef, useState } from 'react';
import Conversation from '../../Component/Conversations/Conversation';
import Message from '../../Component/Message/Message';
import Topbar from '../../Component/Topbar';
import { AuthContext } from '../../context/AuthContext';
import './Messenger.css';
import axios from 'axios';
import API from '../../API';
import {io} from 'socket.io-client';
import ChatOnline from '../../Component/ChatOnline/ChatOnline';

const Messenger = () => {
    const [conversation, setConversation] = useState([]);
    const { user } = useContext(AuthContext);
    const [currentChat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messg, setMsg] = useState("");
    const [newMessage,setnewMessage] =  useState();
    const [onlineUser,setOnlineUser]=useState([]);
    // const [socket,setSocket]=useState(null);
    const socket = useRef(io("ws://localhost:7000"));
    const scrollRef = useRef();

    // useEffect(()=>{
    //     setSocket(io("ws://localhost:7000"))
    // },[]);

    useEffect(()=>{
        socket.current = io("ws://localhost:7000");
        socket.current.on("getMessage",(data)=>{
            setnewMessage({
                sender:data.senderId,
                text:data.msg,
                createdAt:Date.now()
            })
        })
    },[]);

    useEffect(()=>{
        newMessage && currentChat?.members.includes(newMessage.sender) &&
        setMessages((oldMessage)=>[...oldMessage,newMessage]);
    },[newMessage,currentChat]);


    useEffect(()=>{
        socket.current.emit("addUser",user._id);
        socket.current.on("getUsers",(users)=>{
            setOnlineUser(users.followings.filter((f)=>users.some((u)=>u.userId === f)))
        })
    },[user]);


    useEffect(()=>{
        socket.on('Chat',(message)=>{
            console.log(message)
        })
    },[socket]);

    const sendMessage = (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: messg,
            conversationId: currentChat._id
        }
        const receiverId = currentChat.members.find(member=>member !== user._id);
        socket.current.emit('sendMessage',{
            senderId:user._id,
            receiverId:receiverId,
            msg:messg
        })

        try {
            const sendMsg = await axios.post(`${API}/sendMessage`, message, {
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                }
            });
            if (sendMsg.status === 201) {
                sendMessage([...messages, sendMsg.data]);
                setMsg("");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getConversation = async () => {
        try {
            const response = await axios.get(`${API}/getConversation`, {
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                }
            });

            if (response.status === 201) {
                setConversation(response.data);
                console.log(response);
            }

        } catch (e) {
            console.log(e)
        }
    }

    const getMessages = async () => {
        try {
            const response = await axios.get(`${API}/getMessage/${currentChat._id}`);
            if (response.status === 201) {
                setMessages(response.data);
            }
        }
        catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        getConversation();
    }, [user._id]);

    useEffect(() => {
        getMessages();
    }, [currentChat]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"}); // scrolling bar till the end of the latest message
    },[messages]);

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search" className="chatMenuInput" />
                        {
                            conversation.map((p) => (
                                <div onClick={() => setChat(p)}>
                                    <Conversation conversation={p} user={user} />
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <>
                                    <div className="chatBoxTop">
                                        {
                                            messages.map((s) => (
                                                <div ref={scrollRef}>
                                                    <Message message={s} own={s.sender === user._id} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="10"
                                            value={messg}
                                            onChange={(e) => setMsg(e.target.value)}
                                        >
                                        </textarea>
                                        <button className="chatSubmitButton" onClick={sendMessage}>
                                            Send
                                        </button>
                                    </div>
                                </> : <span className="noConversationText">Click on a Conversation</span>}

                    </div>
                </div>

                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUser} currentId={user._id} 
                        setCurrentChat={setChat} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Messenger;
