import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete,Reply } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost, replyOnComment } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../../Actions/User";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
  replies
}) => {
  console.log(comment);
  const [reply, setReply] = useState(false);
  const [comments, setComment] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandle = () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const replyComment = () => {
     dispatch(replyOnComment(postId, commentId,comments));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
}

  return (
    <>
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>

      {isAccount ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : null}
      <Button style={{
        color:"blue"
      }}
      onClick={()=>setReply(true)}
      >
        <Reply/>
      </Button>
      
      </div>
      {
        reply && <form className="replyForm" onSubmit={replyComment}>
            <input
            type="text"
            placeholder="Comment Here..."
            required
            value={comments}
            onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Reply
            </Button>
          </form>
      }
      {
        <>
          {
            replies.length !== 0 &&
            <p style={{
              fontSize: "15px",
              color: "gray",
              marginLeft: "30px"
            }}>Replies</p>
          }
          {
            replies.map((c) => (
              <div className="reply">
                <Link to={`/user/${c?.repliedBy?._id}`}>
                  <img src={c?.repliedBy?.avatar?.url} alt={c?.repliedBy?.name} />
                  <Typography style={{ minWidth: "6vmax" }}>{c?.repliedBy?.name}</Typography>
                </Link>
                <Typography>{c?.commentedText}</Typography>
              </div>
            ))
          }
        </>
      }
    </>
  );
};

export default CommentCard;
