import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import SidebarRow from "./SidebarRow";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import FaceIcon from "@material-ui/icons/Face";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import SportsIcon from "@material-ui/icons/Sports";
import SettingsIcon from "@material-ui/icons/Settings";
import FlagIcon from "@material-ui/icons/Flag";
import HelpIcon from "@material-ui/icons/Help";
import FeedbackIcon from "@material-ui/icons/Feedback";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">
        <SidebarRow selected Icon={HomeIcon} title="Home" />
      </Link>
      <SidebarRow Icon={WhatshotIcon} title="Trending" />
      <SidebarRow Icon={SubscriptionsIcon} title="Subscriptions" />
      <hr />
      <SidebarRow Icon={VideoLibraryIcon} title="Library" />
      <SidebarRow Icon={HistoryIcon} title="History" />
      <SidebarRow Icon={OndemandVideoIcon} title="Your videos" />
      <SidebarRow Icon={WatchLaterIcon} title="Watch Later" />
      <SidebarRow Icon={ThumbUpAltOutlinedIcon} title="Liked Videos" />
      <SidebarRow Icon={ExpandMoreOutlinedIcon} title="Show more" />
      <hr />
      <SidebarRow title="MORE FROM YOUTUBE" />
      <SidebarRow Icon={YouTubeIcon} title="Youtube Premium" />
      <SidebarRow Icon={LocalMoviesIcon} title="Movies" />
      <SidebarRow Icon={SportsEsportsIcon} title="Gaming" />
      <SidebarRow Icon={LiveTvIcon} title="Live" />
      <SidebarRow Icon={FaceIcon} title="Fashion & Beauty" />
      <SidebarRow Icon={WbIncandescentIcon} title="Learning" />
      <SidebarRow Icon={SportsIcon} title="Sports" />
      <hr />
      <SidebarRow Icon={SettingsIcon} title="Settings" />
      <SidebarRow Icon={FlagIcon} title="Report History" />
      <SidebarRow Icon={HelpIcon} title="Help" />
      <SidebarRow Icon={FeedbackIcon} title="Send feedback" />
      <hr />
      <SidebarRow style={{ color: "#717171" }} title="© 2021 Google LLC" />
    </div>
  );
}

export default Sidebar;
