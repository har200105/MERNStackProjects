import React, { useState, useEffect } from "react";
import "./LikeCommentSubscribeSystem.css";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  increaseSingleVideoView,
  increaseSubscribers,
  getSubscribers,
} from "../../actions/video";
import { isAuth, getCookie } from "../../actions/auth";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import DisqusThread from "./DisqusThread";
import ShareDialog from "./ShareDialog";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const LikeCommentSubscribeSystem = ({
  writer,
  videoId,
  _id,
  desc,
  likes,
  dislikes,
  views,
  title,
  timestamp,
}) => {
  const [finalLikes, setFinalLikes] = useState(0);
  const [finalDislikes, setFinalDislikes] = useState(0);
  const [subscribers, setSubscribers] = useState(0);

  const history = useHistory();

  useEffect(() => {
    increaseSingleVideoView({
      _id: _id,
      videoId: videoId,
    });
    getSubscribers({
      name: writer,
    }).then((d) => {
      setSubscribers(d.subscribers);
    });
    setFinalLikes(likes);
    setFinalDislikes(dislikes);
  }, [_id, videoId, likes, dislikes, subscribers, writer]);

  const handleSubscribe = () => {
    increaseSubscribers({ username: writer }, getCookie("token")).then((r) => {
      getSubscribers({
        name: writer,
      }).then((d) => {
        setSubscribers(d.subscribers);
      });
      console.log(r);
    });
  };

  return (
    <>
      <div className="likeCommentSubscribeSystem">
        <div className="likeCommentSubscribe__likeSubscribe">
          <div className="con">
            <div className="likeViewContainer">
              <h1>{title}</h1>
              <p className="videoViews">
                {views} views • {moment(timestamp).fromNow()}
              </p>
            </div>
            <div className="like">
              <IconButton
                className="iconOfLikeDislike"
                onClick={() => {
                  setFinalLikes(finalLikes + 1);
                  document.getElementById("like").style.color = "blue";
                  document.getElementById("dislike").style.color = "gray";
                }}
              >
                <ThumbUpAltIcon id="like" />
                <p className="pOfLikeDislike">{finalLikes} Likes</p>
              </IconButton>
              <IconButton
                className="iconOfLikeDislike"
                onClick={() => {
                  setFinalDislikes(finalDislikes + 1);
                  document.getElementById("like").style.color = "gray";
                  document.getElementById("dislike").style.color = "blue";
                }}
              >
                <ThumbDownAltIcon id="dislike" />
                <p className="pOfLikeDislike">{finalDislikes} Dislikes</p>
              </IconButton>
              <IconButton className="iconOfLikeDislike">
                <ShareDialog />
              </IconButton>
            </div>
            <hr />
            <div style={{ cursor: "pointer" }} className="flex">
              <Avatar />
              <div
                onClick={() => history.push(`/c/${writer}`)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                }}
              >
                <h4>{writer}</h4>
                <p>{subscribers} subscribers</p>
              </div>
              {isAuth() ? (
                <Button className="btn__subscribe" onClick={handleSubscribe}>
                  <NotificationsActiveIcon />
                  &nbsp;&nbsp;Subscribe
                </Button>
              ) : (
                <Button
                  className="btn__noUserSubscribe"
                  onClick={() => history.push("/signin")}
                >
                  Sign In to Subscribe
                </Button>
              )}
            </div>
            <div className="desc">
              <p>{desc}</p>
            </div>
            <hr />
          </div>
          <br/>
        </div>
      </div>
    </>
  );
};

export default LikeCommentSubscribeSystem;
