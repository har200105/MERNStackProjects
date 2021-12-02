import React from "react";
import "./ChannelRow.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";

const ChannelRow = ({ image, channel, verified, subs }) => {
  return (
    <div className="channelRow">
      <Link to={`/c/${channel}`}>
        <Avatar alt={channel} className="channelRow__logo" src={image} />
      </Link>
      <div className="channelRow__text">
        <Link to={`/c/${channel}`}>
          <h4>
            {channel}
            {verified && (
              <CheckCircleOutlinedIcon className="channelRow__textIcon" />
            )}
          </h4>
          <p>{subs} subscribers</p>
        </Link>
      </div>
    </div>
  );
};

export default ChannelRow;
