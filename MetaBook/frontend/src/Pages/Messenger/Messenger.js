import "./Messenger.css";
import Topbar from "../../Component/Topbar";
import Conversation from "../../Component/Conversations/Conversation";
import Message from "../../Component/Message/Message";
import ChatOnline from "../../Component/ChatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { API } from "../../API";
import { useLocation } from "react-router";
import SendIcon from '@mui/icons-material/Send';
import {Link} from 'react-router-dom';

export default function Messenger() {

    const { search } = useLocation();
    console.log(search.replace("?", ""))
    const [Id, setId] = useState("");
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();
    const [onlines, setOnlines] = useState([]);
    const [nextusers, setnextUsers] = useState(null);

    const getOnlineUsers = async () => {

        await axios.get(`${API}/getOnlineUser`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((d) => {
            if (d.status === 201) {
                setOnlines(d.data);
            }
        })
    }

    useEffect(() => {
        getOnlineUsers();
    }, []);


    const checkAndSetConv = async () => {
        await axios.post(`${API}/addConversation/${search.replace("?", "")}`, {

        }, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((s) => {
            if (s.status === 201) {
                console.log(s.data)
                setCurrentChat(s.data);
                getConversations();
            }
        });
    }

    useEffect(() => {
        setId(search.replace("?", ""));
        checkAndSetConv();
        getConversations();
    }, [search]);

    const getConversations = async () => {
        try {
            const res = await axios.get(`${API}/getConversation`, {
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                }
            });
            if (res.status === 201) {
                console.log(res.data)
                setConversations(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // useEffect(()=>{
    //     getConversations();
    // },[id]);

    useEffect(() => {
        socket.current = io("ws://localhost:7000");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        const cmembers = currentChat?.members?.map(i => i._id)
        console.log(cmembers)
        arrivalMessage &&
            cmembers?.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
        console.log(arrivalMessage);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        console.log(user)
        socket.current.emit("addUser", user?._id);
        socket.current.on("getUsers", (users) => {
            // setOnlineUsers(
            //     user?.following?.filter((f) => users.some((u) => u.userId === f))
            // );
        });
    }, [user]);

    useEffect(() => {
        getConversations();
    }, [user, Id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${API}/getMessage/${currentChat?._id}`, {
                    headers: {
                        "Authorization": localStorage.getItem("jwt")
                    }
                });
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user?._id,
            text: newMessage,
            conversationId: currentChat?._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member._id !== user._id
        );

        console.log(receiverId);
        console.log(user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: receiverId._id,
            text: newMessage,
        });

        try {
            const msg = await axios.post(`${API}/addMessage`, message, {
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                }
            });
            if (msg.status === 201) {
                setMessages([...messages, msg.data]);
                setNewMessage("");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <h4 style={{
                            marginLeft: "20px"
                        }}>Chats</h4>
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={user} next={nextusers} setNext={setnextUsers}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    {
                        currentChat && 
                        <div style={{
                            width: "100%",
                            display:'flex',
                            backgroundColor: "teal",
                            borderRadius: "20px",
                            height: "50px",
                            padding:"10px"

                        }}>
                            <img src={ nextusers?.profilePicture ? nextusers?.profilePicture : "/assets/noAvatar.png"} alt="" style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%"
                            }} />
                            {
                                currentChat?.members?.map((c) => (
                                    c._id !== user._id &&
                                    <p style={{
                                        color: "white",
                                        padding: "5px"
                                    }}>{c.name}</p>
                                ))
                            }</div>  
                    }
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <input
                                        className="chatMessageInput"
                                        placeholder="Shiddat Sey Message Karoo ....!!!!!"
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    />
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        <SendIcon />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Click on a User To Chat
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}