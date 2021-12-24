import { useContext, useEffect, useState } from 'react';
import './RightBar.css';
import axios from 'axios';
import { API } from '../../API';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const RightBar = ({ profile, id }) => {

    const [onlines, setOnlines] = useState([]);
    const { user } = useContext(AuthContext);

    const getOnlineUsers = async () => {

        await axios.get(`${API}/getOnlineUsers`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((d) => {
            if (d.status === 201) {
                // console.log(d.data)
                setOnlines(d.data);
            }
        })

    }

    useEffect(() => {
        getOnlineUsers();
    }, [onlines]);

    const [userFriends, setUserFriends] = useState([]);
    const getUserFriends = async () => {
        await axios.get(`${API}/getUserInfo/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((da) => {
            if (da.status === 201) {
                // console.log(da.data);
                setUserFriends(da.data);
            }
        })
    }

    useEffect(() => {
        profile && getUserFriends();
    }, [id]);

    const HomeRightBar = () => {
        return (
            <>
                <h4 className="rightBarTitle">Online Users</h4>
                <ul className="rightBarFriendList">

                    {
                        onlines?.map((o) => (
                            o._id !== user._id &&
                            <Link to={`/Messenger/?${o._id}`} style={{
                                textDecoration: "none",
                                color: "black"
                            }}>
                                <li className="rightBarFriend">
                                    <div className="rightBarProfileImgContainer">
                                        <img src={o.profilePicture ? o.profilePicture : "/assets/noAvatar.png"} alt="" className="rightBarProfileImg" />
                                        <span className="rightBarOnline"></span>
                                    </div>
                                    <span className="rightBarUserName">{o?.name}</span>
                                </li>
                            </Link>
                        ))
                    }

                </ul>
            </>
        );
    }


    const ProfileRightBar = () => {
        return (
            <>
                {/* <h4 className="rightbarTitle">User information</h4> */}
                {/* <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">New York</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Madrid</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Single</span>
                    </div>
                </div> */}
                <h4 className="rightbarTitle">User Following</h4>
                <div className="rightbarFollowings">
                    {
                        userFriends?.following?.map((u) => (



                            <div className="rightbarFollowing">
                                <Link to={`/Profile/${u?._id}`} style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    <img
                                        src={u?.profilePicture ? u.profilePicture : "/assets/noAvatar.png"}
                                        alt=""
                                        className="rightbarFollowingImg"
                                    />
                                </Link>
                                <Link to={`/Profile/${u?._id}`} style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    <span className="rightbarFollowingName">{u?.name}</span>
                                </Link>
                            </div>
                        ))
                    }
                </div>

                <h4 className="rightbarTitle">User Followers</h4>
                <div className="rightbarFollowings">
                    {
                        userFriends?.followers?.map((u) => (



                            <div className="rightbarFollowing">
                                <Link to={`/Profile/${u?._id}`} style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    <img
                                        src={u?.profilePicture ? u.profilePicture : "/assets/noAvatar.png"}
                                        alt=""
                                        className="rightbarFollowingImg"
                                    />
                                </Link>
                                <Link to={`/Profile/${u?._id}`} style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    <span className="rightbarFollowingName">{u?.name}</span>
                                </Link>
                            </div>

                        ))
                    }
                </div>
            </>
        );
    }


    return (
        <div className="rightbar">
            <div className="rightBarWrapper">
                {profile ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    );


}

export default RightBar
