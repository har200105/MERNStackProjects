import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./singlePost.css";
import axios from 'axios';
import { API } from '../../API';
import { format } from "timeago.js";
import { useParams } from 'react-router-dom';
import { Context } from "../../context/Context";

export default function SinglePost() {

  const [curpost, setCurPost] = useState({});
  const [cmt,setCmt] = useState("");
  const[liked,setLiked] = useState(true);

  const deleteBlog = async () => {
    console.log(curpost._id);
    await axios.delete(`${API}/deletePost/${curpost._id}`, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    }).then((s) => {

      if (s.status === 201) {
        console.log(s);
        console.log("Blog Deleted Successfully !!......");
        window.location.replace("/");
      }
    })
  }

  const likePost = async () => {
    console.log("Like");
    setLiked(false);
    await axios.put(`${API}/likePost/${curpost._id}`, {}, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    }).then((w) => {
      if (w.status === 201) {
        console.log(w.data);
        setCurPost(w.data);
      }
    })
  }

  const DislikePost = async () => {
    console.log("Dislike");
    setLiked(true);
    await axios.put(`${API}/dislikePost/${curpost._id}`, {}, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    }).then((w) => {
      if (w.status === 201) {
        console.log(w.data);
        setCurPost(w.data);
      }
    })
  }

  const { id } = useParams();

  const { user, dispatch } = useContext(Context);

  const getSinglePostData = async () => {
    const postdata = await axios.get(`${API}/getPostById/${id}`);

    if (postdata.status === 201) {
      setCurPost(postdata.data);
    }

  }

  const comment = async(e)=>{
    e.preventDefault();
    setCmt("");
    await axios.post(`${API}/comment/${curpost._id}`, {
      commentText:cmt
    }, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    }).then((c) => {
      if (c.status === 201) {
        console.log(c.data);
        setCurPost(c.data);
      }
    })

  }

  useEffect(() => {
    getSinglePostData();
  }, [id]);

  useEffect(() => {
    getSinglePostData();
  }, []);


  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={curpost?.photo ? curpost?.photo : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
          alt=""
        />
        <h1 className="singlePostTitle">
          {curpost?.title}
          <div className="singlePostEdit">
            {
              curpost?.postedBy?._id === user._id &&
              <i className="singlePostIcon far fa-trash-alt" onClick={deleteBlog}></i>
            }
          </div>
        </h1>
        {
          curpost?.likes?.includes(user._id) || !liked  ? <i class="fas fa-thumbs-up" style={{
            color: "blue"
          }} onClick={DislikePost}> &nbsp; {curpost?.likes?.length}</i>
            : liked && 
            <i class="fas fa-thumbs-up" onClick={likePost}> &nbsp; {curpost?.likes?.length}</i>

        }


        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/userProfile/${curpost?.postedBy?._id}`}>
                {curpost?.postedBy?.name}
              </Link>
            </b>
          </span>
          <span>{format(curpost?.createdAt)}</span>
        </div>
        <p className="singlePostDesc">
          {curpost?.desc}
        </p>
        
        <form onSubmit={comment}>
          <div className="commentbox">
            <input name="comments" 
             onChange={(e)=>setCmt(e.target.value)}
             value={cmt}
            id="comments" 
            style={{outline:"none",
        width:"700px",
        height:"50px"
          }}/>
          </div>
          <input 
         
         
          className="comment_btn" type="submit" value="Comment"/>
        </form>
        <div>
          <h1>Comments</h1>
          {
            curpost?.comments?.map((cm)=>(
              <div className="comments">
              <Link className="user" to={`/userProfile/${cm?.commentedBy?._id}`}>
              <h3 className="name">{cm?.commentedBy.name}</h3>
              </Link>
              <p> &nbsp; &nbsp;{cm?.commentedText}</p>
              </div>
                
            ))
          }
        </div>
      </div>
    </div>
  );
}
