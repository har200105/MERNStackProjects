import "./Topbar.css";
import { Search, Person, Chat, Notifications, Message, Home } from "@material-ui/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import { API } from "../API";
export default function Topbar() {
  const [toggle, setToggle] = useState(false);
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isSearching, setIsSearching] = useState("");

  const logout = async() => {
    
    await axios.put(`${API}/makeUserOffline`,{},{
      headers:{
        "Authorization":localStorage.getItem("jwt")
      }
    }).then((s)=>{
      if(s.status===201){
        
      }
    });

    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    localStorage.clear();
    window.location.reload();
  }

  const getUser = async (name) => {
    setIsSearching(name);
    await axios.post(`${API}/searchuser`, {
      query: name
    }, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    }).then((s) => {
      if (s.status === 201) {
        setUsers(s.data);
        console.log(s.data);
      }
    })
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{
          textDecoration: "none",
          color: "white"
        }}>
          <span className="logo">MetaBook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for Users"
            className="searchInput"
            onChange={(e) => getUser(e.target.value)}
          />
          {
            isSearching != "" &&

            <div style={{
              marginTop: "5px",
              background: "whitesmoke",
              padding: "10px"
            }}>

              {
                users ?
                  users?.map((u) => (
                    <div>

                      <Link to={`/Profile/${u._id}`} style={{
                         textDecoration: "none",
                         color: "black"
                      }}>
                        <div style={{ display: "flex" }}>
                          <img src={u?.profilePicture ? u?.profilePicture : "/assets/noAvatar.png"} alt=""
                            className="topbarImg" />
                          <li style={{
                            listStyle: "none",
                            padding: "20px"
                          }}>{u.name}

                          </li>

                        </div>
                      </Link>
                      <hr style={{ opacity: "0.4" }} />
                    </div>
                  )) : <h5>Nothing Found !!</h5>
              }
            </div>
          }
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{
            textDecoration: "none",
            color: "white"
          }}>
            <span className="topbarLink">
              <Home/>
            </span>
          </Link>
        </div>
        <div className="topbarLinks">
          <Link to="/Messenger" style={{
            textDecoration: "none",
            color: "white"
          }}>
            <span className="topbarLink">
              <Message/>
            </span>
          </Link>
        </div>
        <div className="topbarIcons">
          <span><LogoutIcon
            onClick={logout}
          /></span>
        </div>

        <Link to={`/Profile/${user?._id}`} >
          <img src={user.profilePicture ? user.profilePicture : "/assets/noAvatar.png"} alt=""
            className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}