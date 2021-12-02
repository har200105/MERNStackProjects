import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../API';
import './Conversation.css';

const Conversation = ({conversation,user}) => {

    const[user,setUser] = useState(null);

    
    useEffect(()=>{
        const id = conversation.members.find((m)=>m!==user._id);
        const getUser = async()=>{
            try{
                const response = await axios.get(`${API}/user?id=${id}`);
                console.log(response);
                setUser(response.data);
            }catch(e){
                console.log(e);
            }
        }
        getUser();
    },[conversation,user]);

    return (
        <div className="conversation">
            <img src={user?.profilePicture} className="conversationImg" alt=""/>
            <span className="conversationName">
               {user?.name}
            </span>
        </div>
    )
}

export default Conversation
