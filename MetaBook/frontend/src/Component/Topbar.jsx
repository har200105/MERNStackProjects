import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Topbar() {
  const {user} = useContext(AuthContext);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">MetaBook</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`Profile/${user._id}`}>
        <img src={user.profilepic ? user.profilepic :  "/assets/image.jpg"} alt="" 
        className="topbarImg"/>
        </Link>
      </div>
    </div>
  );
}