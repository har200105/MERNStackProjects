import React, { useContext, useEffect, useState } from 'react';
import { Delete, MoreVert } from '@material-ui/icons';
import './Post.css';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../API';
import { AuthContext } from '../../context/AuthContext';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

const Post = ({ post }) => {

    console.log(post)

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const { user } = useContext(AuthContext);
    console.log(user?._id);
    const [showcmt, setShowCmt] = useState(false);
    const [cmt, setCmt] = useState("");


    useEffect(() => {
        setIsLiked(post?.likes?.includes(user?._id));
    }, [post, user, post?.likes]);

    const commentToPost = async (e) => {
        e.preventDefault();
        await axios.put(`${API}/comment/${post._id}`, {
            commentedText: cmt
        }, {
            headers: {
                Authorization: localStorage.getItem("jwt")
            }
        }).then((d) => {
            if (d.status === 201) {
                setCmt("");
                console.log(d.data);
            }
        })
    }


    const likeHandler = async () => {
        try {

            post &&
                isLiked ? await axios.put(`${API}/dislike/${post._id}`, {}, {
                    headers: {
                        "Authorization": localStorage.getItem("jwt")
                    }
                }).then((s) => {
                    if (s.status === 201) {
                        setIsLiked(!isLiked);
                        setLike(s?.likes.length);
                    }
                }) :
                await axios.put(`${API}/like/${post._id}`, {}, {
                    headers: {
                        "Authorization": localStorage.getItem("jwt")
                    }
                }).then((s) => {
                    if (s.status === 201) {
                        setIsLiked(!isLiked);
                        setLike(s?.likes.length);
                    }
                })
        } catch (e) {
            console.log(e);
        }
        setLike(isLiked ? like - 1 : like + 1);

    }

    // const DislikeHandler = async () => {
    //     console.log("Dislike")
    //     try {

    //     } catch (e) {

    //     }

    // }

    const deletePost = async () => {
        try {
            await axios.delete(`${API}/deletePost/${post._id}`, {
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                }
            }).then((s) => {
                if (s.status === 201) {
                    window.location.href = "/";
                }
            })
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link to={`/Profile/${post.postedBy._id}`}>
                                <img src={post.postedBy.profilePicture ? post.postedBy.profilePicture : "/assets/noAvatar.png"} alt="" className="postProfileImg" />
                            </Link>
                            <Link to={`/Profile/${post.postedBy._id}`} style={{ textDecoration: "none", color: "black" }}>
                                <span className="postUsername">{post.postedBy.name}</span>
                            </Link>
                            <span className="postDate">{format(post.createdAt)}</span>
                        </div>
                        <div className="postTopRight">
                            {/* <MoreVert onClick={()=>console.log("options")} style={{
                                cursor:"pointer"
                            }} /> */}
                            {
                                user?._id === post.postedBy._id &&

                                <Delete style={{ color: "red", cursor: "pointer" }} onClick={deletePost} />
                            }
                        </div>
                    </div>
                    <div className="postCenter">
                        <span className="postText">
                            {post?.caption}
                        </span>
                        {
                            post.image && <img src={post?.image} alt="" className="postImg" />
                        }
                    </div>
                    <div className="postBottom">
                        <div className="postBottomLeft">
                            {/* {
                                isLiked == false ? */}
                            <div style={{
                            }}>
                                <img src="/assets/like.png" alt="" className="likeIcon" onClick={likeHandler} />
                                <img src="/assets/heart.png" alt="" className="likeIcon" onClick={likeHandler} />

                            </div>
                            <span className="postLikeCounter">{like} People Likes This</span>
                            <CommentOutlinedIcon style={{ color: "blue", marginLeft: "10px" }} onClick={() => setShowCmt(true)} />

                        </div>
                        <div className="postBottomRight">
                            <span className="postCommentText" onClick={() => setShowCmt(true)}>
                                {post?.comments?.length} {post?.comments?.length > 1 ? "Comments" : "Comment"}
                            </span>
                        </div>
                    </div>
                </div>
                {
                    showcmt &&
                    <form onSubmit={commentToPost} style={{
                    }}>
                        <div style={{}}>
                            <div style={{
                                display: "flex",
                                paddingLeft: "20px",
                                paddingTop: "10px"
                            }}>
                                <img src={user?.profilePicture ? user?.profilePicture : "assets/noAvatar.png"} style={{
                                    height: "40px",
                                    width: "40px",
                                    borderRadius: "50%"
                                }} />
                                <input style={{
                                    marginLeft: "10px",
                                    width: "70%",
                                    justifyContent: "center",
                                    outline: "none",
                                    border: "1px solid rgb(0 0 0 / 60%)",
                                    borderRadius: "8px",
                                    marginBottom: "10px",
                                    background: "whitesmoke",
                                    height: "35px"
                                }}
                                    value={cmt}
                                    onChange={(e) => setCmt(e.target.value)}
                                    placeholder="Add a Comment...."
                                />
                                {
                                    cmt !== "" &&
                                    <button style={{
                                        marginRight: "20px",
                                        marginLeft: "20px",
                                        marginBottom: "10px",
                                        color: "white",
                                        background: "#0073b1",
                                        fontWeight: "300",
                                        outline: "none",
                                        padding: "5px 10px",
                                        borderRadius: "10px",
                                        border: "none",

                                    }}
                                        type="submit"
                                    >
                                        Comment
                                    </button>
                                }

                            </div>

                            <div>
                            </div>

                            <div style={{
                                float: "left",
                                paddingLeft: "20px",
                                marginTop: "20px"
                            }}>
                                {
                                    post.comments.map((c) => (

                                        <div style={{
                                            display: "flex",
                                            marginBottom: "10px"
                                        }}>
                                            <div>
                                                <Link to={`/Profile/${c.commentedBy._id}`}>
                                                    <img src={c.commentedBy.profilePicture ? c.commentedBy.profilePicture : "/assets/noAvatar.png"} className="postProfileImg" />
                                                </Link>
                                            </div>
                                            <div style={{
                                                marginLeft: "5px"
                                            }}>
                                                <Link to={`/Profile/${c.commentedBy._id}`} style={{
                                                    textDecoration: "none",
                                                    color: "black"
                                                }}>
                                                    <h4
                                                        style={{
                                                            marginTop: "-2px",
                                                            paddingLeft: "2px"
                                                        }}
                                                    >{c.commentedBy.name}</h4>
                                                </Link>

                                                <p style={{
                                                    marginTop: "2px",
                                                }}>{c.comment}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </form>
                }
            </div>

        </>
    )
}

export default Post
