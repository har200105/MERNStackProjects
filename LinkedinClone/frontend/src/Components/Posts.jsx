import React from 'react';
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { LikePostAction, TakeLikePostAction } from '../Redux/Actions/LikeAction.js';
import { Context } from '../Context/ContextProvider';
import axios from 'axios';
import { API } from '../API.js';
import {Link} from 'react-router-dom';

const Posts = ({ p }) => {

    const dispatch = useDispatch();
    const { user } = useContext(Context);
    const [showcmt, setShowCmt] = useState(false);
    const [cmt, setCmt] = useState("");


    const likePost = (id) => {
        dispatch(LikePostAction(id));
    }

    const disLikePost = (id) => {
        dispatch(TakeLikePostAction(id));
    }

    const commentToPost = async (e) => {
        e.preventDefault();
        await axios.post(`${API}/comment/${p._id}`, {
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

    return (
        <div>
            <Article>
                <SharedActor>
                    <a>
                        {
                            p.postedBy.pic ? <img src={p.postedPic} alt="" /> :
                                <img src="/images/user.svg" alt="" />
                        }
                        <div>
                            <Link to={ `userprofile/${p.postedBy._id}`}>
                            <span>{p.postedBy.name}</span>
                            </Link>
                        </div>
                    </a>
                    <button>
                        <img src="/images/ellipsis.png" height="10px" alt="" />
                    </button>
                </SharedActor>
                <Description>{p.caption}</Description>
                <SharedImg>
                    <a>
                        {
                            p.pic &&
                            <img src={p.pic} alt="" />
                        }
                    </a>
                </SharedImg>
                <SocialCounts>
                    <li>
                        <p>
                            <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
                        </p>
                        <span>{p.likes.length} {parseInt(p.likes.length) <= 1 ? "Like" : "Likes"}</span>
                    </li>
                    <li>
                        <p style={{
                            margin: "10px"
                        }}>
                            {p.comments.length} Comments
                        </p>
                    </li>
                </SocialCounts>
                <SocialActions>
                    {
                        p?.likes?.includes(user._id) ?
                            <button onClick={() => disLikePost(p._id)} style={{
                                color: "blue"
                            }}>
                                <ThumbUpOutlinedIcon style={{}} />
                                <span>Like</span>
                            </button> :

                            <button onClick={() => likePost(p._id)} style={{
                                background: "whitesmoke"
                            }}>
                                <ThumbUpOutlinedIcon style={{}} />
                                <span>Like</span>
                            </button>
                    }
                    <button onClick={() => setShowCmt(true)}>
                        <CommentOutlinedIcon />
                        <span>Comment</span>
                    </button>
                </SocialActions>
                {
                    showcmt &&

                    <form onSubmit={commentToPost}>
                        <div>
                            <div style={{
                                display: "flex",
                                paddingLeft: "20px",
                                paddingTop: "10px"
                            }}>
                                <img src="/images/user.svg" style={{
                                    height: "40px",
                                    width: "40px",
                                    borderRadius: "50%"
                                }} />
                                <input style={{
                                    marginLeft: "10px",
                                    width: "80%",
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
                                    placeholder="Add a Comment..."
                                />

                            </div>
                            <div style={{
                                width:"100%"
                            }}>
                                {
                                    cmt !== "" &&

                                    <button style={{
                                        float: "left",
                                        marginLeft: "60px",
                                        marginBottom: "20px",
                                        marginTop: "3px",
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
                                        Post
                                    </button>
                                }
                            </div>

                            <div style={{
                                float: "left",
                                paddingLeft: "20px",
                                marginTop:"20px"
                            }}>
                                {
                                    p.comments.map((c) => (

                                        <div style={{
                                            display: "flex",
                                            marginBottom:"10px"
                                        }}>
                                            <div>
                                                <img src="/images/user.svg" style={{
                                                    height: "40px",
                                                    width: "40px",
                                                    borderRadius: "50%"
                                                }} />
                                            </div>
                                            <div style={{
                                               marginLeft:"10px"
                                            }}>
                                                <h4
                                                  style={{
                                                    textAlign:"start"
                                                  }}
                                                >{c.commentedBy.name}</h4>
                                                  <p style={{
                                                      fontSize:"10px",
                                                      color:"gray",
                                                      textAlign:"start"
                                                  }}>Full Stack Developer Intern @ Arishti CyberTech</p>
                                                <p style={{
                                                    marginTop:"5px",
                                                    textAlign:"start"
                                                }}>{c.commentedText}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </form>
                }
            </Article>

        </div>
    )
}



const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
text-align:center;
overflow: hidden;
margin-bottom: 8px;
background-color:#fff;
border-radius: 5px;
position:relative;
border: none;
box-shadow:0 0 0 1px rgb(0 0 0 / 0.15), 0 0 0 rgb(0 0 0 /0.20);
`;

const ShareBox = styled(CommonCard)`
display:flex;
flex-direction:column;
color:#958b7b;
margin:0 0 8px;
background:white;

div{
  button{
    outline:none;
    color:rgba(0,0,0,0.6);
    font-size:14px;
    line-height:1.5;
    min-height:40px;
    background:transparent;
    border:none;
    display:flex;
    align-items:center;
    font-weight:600;
  }
  &:first-child{
    display:flex;
    align-items:center;
    padding:8px 16px 0px 16px;
    img{
      width:40px;
      border-radius:50%;
      margin-right:8px;
    }
    button{
      margin:4px 0px;
      flex-grow:1;
      border-radius:35px;
      padding-left:16px;
      border:1px solid #bd9a9a26;
      background-color:white;
      text-align:left;
    }

    &:nth-child(2){
      display:flex;
      flex-wrap:wrap;
      justify-content:space-around;
      padding-bottom:4px;

      button{
        img{
          margin:0 4px 0 -2px;
        }
        span{
          color:#70b5f9;
        }
      }
    }

  }
}

`;

const Article = styled(CommonCard)`
padding:0px;
margin:0 0 8px;
overflow:none;
`;


const SharedActor = styled.div`
padding-right:40px;
flex-wrap:nowrap;
padding:12px 16px 0;
margin-bottom:8px;
align-items:center;
display:flex;
a{
  margin-right:12px;
  flex-grow:1;
  overflow:hidden;
  display:flex;
  text-decoration:none;

img{
  height:40px;
  width:50px;
}

&>div{
  display:flex;
  flex-direction:column;
  flex-grow:1;
  flex-basis:0;
  margin-left:8px;
  overflow:hidden;
  span{
    text-align:left;
    &:first-child{
      font-size:14px;
      font-weight:700;
      color:rgba(0,0,0,1);
    }
    &:nth-child(n+1){
      font-size:12px;
      color:rgba(0,0,0,0.6);
    }
  }
}
}

button{
  position:absolute;
  right:12px;
  top:0;
  background:transparent;
  border:none;
  outline:none;
}
`;

const Description = styled.div`
margin-top:8px;
width:100%;
display:block;
position:relative;
/* background-color:#f9fafb; */
text-align:start;
margin-left:20px;
img{
  object-fit:contain;
  width:100%;
  height:100%;
}
`;

const SharedImg = styled.div`
display:block;
position:relative;
margin-top:8px;
width:100%;
background-color: #f9fafb;
img{
  object-fit:contain;
  width:100%;
  height:100%; 
}
`;


const SocialCounts = styled.ul`
line-height:1.3;
display:flex;
align-items:flex-start;
overflow:auto;
margin:0 16px;
padding:8px 0px;
border-bottom:1px solid #e9e5df;
list-style:none;
li{
  margin-right:5px;
  font-size:12px;
  button{
    display:flex;
  }
}
`;

const SocialActions = styled.div`

align-items: center;
display:flex;
margin: 0;
min-height:40px;
padding:8px;
button{
  display:inline-flex;
  align-items:center;
  outline:none;
  border:none;
  border-radius:12px; 
  padding:8px;
  margin-left:10px;
  color:#0a66c2;
  @media(min-width:768px){
    span{
      margin-left:8px;
    }
  }
}

`;

export default Posts
