import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../API';
import './Conversation.css';

const Conversation = ({conversation,currentUser,next,setNext}) => {

    // const[users,setUsers] = useState(null);

    
    useEffect(()=>{
        const id = conversation.members.find((m)=>m._id!==currentUser._id);
       
        // const getUser = async()=>{
        //     console.log(id)
        //     try{
        //         const response = await axios.get(`${API}/getUserData/${id._id}`,{
        //             headers:{
        //                 "Authorization":localStorage.getItem("jwt")
        //             }
        //         });
        //         console.log(response);
        //         setUsers(response.data);
        //     }catch(e){
        //         console.log(e);
        //     }
        // }
        // getUser();

        setNext(id);
    },[conversation,currentUser]);


    useEffect(()=>{
        const id = conversation.members.find((m)=>m._id!==currentUser._id);
       
        // const getUser = async()=>{
        //     console.log(id)
        //     try{
        //         const response = await axios.get(`${API}/getUserData/${id._id}`,{
        //             headers:{
        //                 "Authorization":localStorage.getItem("jwt")
        //             }
        //         });
        //         console.log(response);
        //         setUsers(response.data);
        //     }catch(e){
        //         console.log(e);
        //     }
        // }
        // getUser();

        setNext(id);
    },[]);

    return (
        <div className="conversation">
            <img src={ next?.profilePicture ? next?.profilePicture : "/assets/noAvatar.png"} className="conversationImg" alt=""/>
            <span className="conversationName">
               {next?.name}
            </span>
        </div>
    )
}

export default Conversation
