import { useEffect, useState } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css"; 
import axios from 'axios';
import { API } from "../../API";

const Feed = ({userid}) => {
    
    const[posts,setPosts] = useState([]);
    
    const fetchTimeLinePosts = async()=>{
        const posts =  userid ? await axios.get(`${API}/getUserPosts/${userid}`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        }) : await axios.get(`${API}/getTimeLinePosts`,{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        })
        
        if(posts.status===201){
            setPosts(posts)
        }
    }

    useEffect(()=>{
        fetchTimeLinePosts();
    },[posts,userid]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {
                    posts.map((p)=>(
                    <Post post={p}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Feed
