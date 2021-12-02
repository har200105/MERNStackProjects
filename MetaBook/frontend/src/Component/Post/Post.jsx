import React, { useContext, useEffect, useState } from 'react';
import { MoreVert } from '@material-ui/icons';
import './Post.css';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../API';
import { AuthContext } from '../../context/AuthContext';

const Post = ({ post }) => {

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const {user} = useContext(AuthContext);


    useEffect(()=>{
        setIsLiked(post.likes.includes(user._id));
    },[post,user,post.likes])

    const likeHandler = async() => {
        try{
            await axios.put(`${API}/like/${post._id}`,{},{
                headers:{
                    "Authorization":localStorage.getItem("jwt")
                }
            })
        }catch(e){

        }
        setLike(isLiked ? like - 1 : like + 1);

    }


    return (
        <>
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link>
                                <img src="/assets/image.jpg" alt="" className="postProfileImg" />
                            </Link>
                            <Link>
                                <span className="postUsername">Harshit Rathi</span>
                            </Link>
                            <span className="postDate">{format(post.createdAt)}</span>
                        </div>
                        <div className="postTopRight">
                            <MoreVert />
                        </div>
                    </div>
                    <div className="postCenter">
                        <span className="postText">
                            PRO Bhai PRO
                        </span>
                        <img src="/assets/image.jpg" alt="" className="postImg" />
                    </div>
                    <div className="postBottom">
                        <div className="postBottomLeft">
                            <img src="" alt="" className="likeIcon" onClick={likeHandler} />
                            <img src="" alt="" className="likeIcon" onClick={likeHandler} />
                            <span className="postLikeCounter">{like} People Likes This</span>
                        </div>
                        <div className="postBottomRight">
                            <span className="postCommentText">
                                9 Comments
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Post
