import React from "react";
import "./SmallVideoPlayer.css";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import moment from "moment";

const SmallVideoPlayer = ({
  image,
  title,
  channel,
  views,
  timestamp,
  channelImage,
  videoId,
}) => {
  return (
    <div>
      <div className="smallVideoPlayer">
        <Link to={`/video/watch/${videoId}`}>
          <img
            className="smallVideoPlayer__thumbnail"
            src={image}
            alt={channel}
          />
        </Link>
        <div className="smallVideoPlayer__info">
          <Avatar
            className="smallVideoPlayer__avatar"
            alt={channel}
            src={channelImage}
          />
          <div className="smallVideoPlayer__text">
            <h4>{title}</h4>
            <p>{channel}</p>
            <p>
              {views} views • {moment(timestamp).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallVideoPlayer;
