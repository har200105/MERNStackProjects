import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../API';
import './Conversation.css';

const Conversation = ({conversation,currentUser}) => {

    const [u,setU] =  useState();


    
    useEffect(()=>{
        
        const id = conversation.members.find((m)=>m._id!==currentUser._id);
        console.log("ID : " + id);
        const getUser = async () => {
            try {
              const res = await axios.get(`${API}/getUser/${id._id}`,{
                  headers:{
                      "Authorization":localStorage.getItem("jwt")
                  }
              });
              console.log(res);
              setU(res.data);
            } catch (err) {
              console.log(err);
            }
          };
          getUser();

      
    },[conversation,currentUser]);


    return (
        <div className="conversation">
            <img src={ u?.profilePicture ? u?.profilePicture :
                 "/assets/noAvatar.png"} className="conversationImg" alt=""/>
            <span className="conversationName">
               {u?.name}
            </span>
        </div>
    )
}

export default Conversation
