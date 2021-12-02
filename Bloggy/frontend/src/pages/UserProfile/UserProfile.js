import "./UserProfile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { API } from "../../API";
import Posts from "../../components/posts/Posts";
import { useParams } from "react-router";

export default function UserProfile() {
  const {id} = useParams();
  console.log(id);
  const [userPosts,setUserPosts] = useState([]);
  const [user,setUser] = useState({});

  const getUserPosts = async()=>{

   const d =  await axios.get(`${API}/getUser?id=${id}`);

    if(d.status===201){
      setUser(d.data);
    }

    await axios.get(`${API}/otherPosts/${id}`).then((ds)=>{
        if(ds.status===201){
        setUserPosts(ds.data);
    }
    });

  }
  
  useEffect(()=>{
    getUserPosts();
  },[id]);

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
            Name : {user?.name}
            <br/>
            Email : {user?.email}
          </div>
          <div>
            <span style={{
              textAlign:"center",
              justifyContent:"center",
              display:"flex"
            }}>Blogs Posted</span>
          </div>
          <div>
            { userPosts && <Posts posts={userPosts} />}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
