import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../API";
import "./ChatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);


  const getFriends = async () => {
    const res = await axios.get(`${API}/getFriends`, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    });
    setFriends(res.data);
  }


  useEffect(() => {
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `${API}/findConversations/${user._id}`, {
        headers: {
          "Authorization": localStorage.getItem("jwt")
        }
      }
      );
      if (res.status === 201) {
        setCurrentChat(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? o.profilePicture
                  : ""
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}