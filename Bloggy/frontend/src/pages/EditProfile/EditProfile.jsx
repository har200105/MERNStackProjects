import "./EditProfile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { API } from "../../API";
import Posts from "../../components/posts/Posts";

export default function EditProfile() {

  const [userPosts, setUserPosts] = useState([]);

  const getUserPosts = async () => {
    const d = await axios.get(`${API}/getUserPosts`, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    });

    if (d.status === 201) {
      setUserPosts(d.data);
    }
  }

  useEffect(() => {

    getUserPosts();

  }, []);

  const { user, dispatch } = useContext(Context);
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
        </div>
        <div className="settingsForm">
          <div className="settingsPP">
            <img
              src={user.profilePicture}
              alt=""
            />

          </div>
          <div>
            <h3>User Details</h3>
            Name : {user.name}
            <br />
            Email : {user.email}
          </div>
          <div>
            <span style={{
              textAlign: "center",
              justifyContent: "center",
              display: "flex"
            }}>Blogs Posted</span>
          </div>
          <div>
            {<Posts posts={userPosts} />}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
