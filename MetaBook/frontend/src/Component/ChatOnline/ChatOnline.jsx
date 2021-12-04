import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { API } from "../../API";
import "./ChatOnline.css";
import {AuthContext} from '../../context/AuthContext';
import {Link} from 'react-router-dom';

export default function ChatOnline({ setCurrentChat }) {
  // console.log(onlineUsers)
  const [onlines, setOnlines] = useState([]);
  const { user } = useContext(AuthContext);

  const getOnlineUsers = async () => {

      await axios.get(`${API}/getOnlineUsers`, {
          headers: {
              "Authorization": localStorage.getItem("jwt")
          }
      }).then((d) => {
          if (d.status === 201) {
              console.log(d.data)
              setOnlines(d.data);
          }
      })

  }

  useEffect(() => {
      getOnlineUsers();
  }, [onlines]);


  // const getFriends = async () => {
  //   const res = await axios.get(`${API}/`, {
  //     headers: {
  //       "Authorization": localStorage.getItem("jwt")
  //     }
  //   });
  //   setFriends(res.data);
  // }


  // useEffect(() => {
  //   getFriends();
  // }, [currentId]);

  // useEffect(() => {
  //   setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  // }, [friends, onlineUsers]);

  // const handleClick = async (user) => {
  //   try {
  //     const res = await axios.get(
  //       `${API}/findConversations/${user._id}`, {
  //       headers: {
  //         "Authorization": localStorage.getItem("jwt")
  //       }
  //     }
  //     );
  //     if (res.status === 201) {
  //       setCurrentChat(res.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="chatOnline">
      {onlines.map((o) => (
        user?._id !== o._id &&
        <Link to={`/Messenger/?${o._id}`} style={{
          textDecoration:"none",
          color:"black"
        }}>
        <div className="chatOnlineFriend" >
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
          <span className="chatOnlineName">{o?.name}</span>
        </div>
        </Link>
      ))}
    </div>
  );
}