import React, { useContext, useEffect, useState } from 'react';
import Topbar from '../../Component/Topbar';
import Sidebar from '../../Component/Sidebar/SideBar';
import Feed from '../../Component/Feed/Feed';
import RightBar from '../../Component/RightBar/RightBar';
import './Profile.css';
import { useParams } from 'react-router';
import axios from 'axios';
import { API } from '../../API';
import { AuthContext } from '../../context/AuthContext';
import ChatIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Profile = () => {

    const [userdata, setUserData] = useState({});
    const [Isfollowing, setIsFollowing] = useState(false);
    const [userFollowing, setUserFollowing] = useState([]);
    const [profilepic, setProfilepic] = useState();
    const [cover, setcoverpic] = useState();
    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const readImage = (e) => {
        console.log(e);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfilepic(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }


    const readCoverImage = (e) => {
        console.log(e);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setcoverpic(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const EditProfile = async () => {
        setOpen(false);
        await axios.put(`${API}/editProfile`, {
            profilePicture: profilepic,
            coverPicture: cover,
            name,
            bio
        },{
            headers:{
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((s)=>{
            if(s.status===201){
                getUserData();
                window.location.reload();
            }
        })
    }


    useEffect(() => {
        console.log("sd")
        setIsFollowing(userdata?.followers?.includes(user?._id))
    }, [userdata, id]);

    const getUserData = async () => {
        await axios.get(`${API}/getUserData/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((s) => {
            if (s.status === 201) {
                setUserData(s.data);
                setIsFollowing(!Isfollowing);
            }
        });
    }
    // await axios.get(`${API}/getUserFollowers/${id}`,{
    //     headers:{
    //         "Authorization":localStorage.getItem("jwt")
    //     }
    // }).then((u)=>{
    //     if(u.status===201){
    //         setUserFollowing(u.data);
    //     }
    // })

    const followUser = async (e) => {
        await axios.put(`${API}/followUser/${id}`, {

        }, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((u) => {
            if (u.status === 201) {
                console.log("User Followed")
                getUserData();
                setIsFollowing(!Isfollowing);
            }
        })
    }

    const unFollowUser = async (e) => {
        await axios.put(`${API}/unfollowUser/${id}`, {

        }, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((u) => {
            if (u.status === 201) {
                getUserData();
                console.log("User Unfollowed")
            }
        })
    }

    useEffect(() => {
        getUserData();
    }, [id]);

    return (
        <>
            <Topbar />
            <div className="profile">
                {/* <Sidebar /> */}
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={userdata?.coverPicture ? userdata?.coverPicture : ""}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={userdata?.profilePicture ? userdata?.profilePicture : ""}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{userdata?.name}</h4>
                            <span className="profileInfoDesc">
                               {userdata?.bio ? userdata.bio : ""}
                            </span>
                            <button className="shareButton" onClick={handleClickOpen}>
                                Edit Profile
                            </button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogContent>

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="Bio"
                                        label="Bio"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setBio(e.target.value)}
                                    />

                                    <label htmlFor="profilepic">
                                        <AddAPhotoIcon style={{ marginTop: "15px", marginLeft: "5px" }} />
                                    </label>
                                    <label style={{ marginLeft: "5px" }} htmlFor="coverpic">
                                        <AddPhotoAlternateIcon />
                                    </label>
                                    <input type="file" id="profilepic" style={{ display: "none" }} onChange={readImage} />
                                    <input type="file" id="coverpic" style={{ display: "none" }} onChange={readCoverImage} />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={EditProfile}>Done</Button>
                                </DialogActions>
                            </Dialog>
                            {
                                (user?._id !== id) &&

                                <div>
                                    {

                                        Isfollowing ? <button className="followButton" onClick={unFollowUser}>Following</button> :

                                            <button className="followButton" onClick={followUser}>Follow</button>
                                    }
                                    <Link to={`/Messenger/?${id}`}>
                                        <ChatIcon style={{
                                            color: "blue",
                                            marginLeft: "20px"
                                        }} />
                                    </Link>
                                </div>
                            }
                            <div style={{ display: "flex" }}>
                                <p>{userdata?.followers?.length} Followers</p>
                                <p style={{ marginLeft: "10px" }}>{userdata?.following?.length} Following</p>
                            </div>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed id={id} />
                        <RightBar profile id={id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
