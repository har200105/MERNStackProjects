import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./VideoRow.css";

const VideoRow = ({
  views,
  subs,
  desc,
  timestamp,
  channel,
  title,
  image,
  videoId,
}) => {
  return (
    <div className="videoRow">
      <Link to={`/video/watch/${videoId}`}>
        <img src={image} alt={channel} />
      </Link>
      <div className="videoRow__text">
        <Link to={`/video/watch/${videoId}`}>
          <h3>{title}</h3>
        </Link>
        <p className="videoRow__headline">
          {channel} • {subs} Subscribers • {views} views • 
          {moment(timestamp).fromNow()}
        </p>
        <p className="videoRow__desc">{desc}</p>
      </div>
    </div>
  );
};

export default VideoRow;
