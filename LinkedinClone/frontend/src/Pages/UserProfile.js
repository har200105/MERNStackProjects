import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context/ContextProvider';
import axios from 'axios';
import { API } from '../API';
import { useDispatch, useSelector } from 'react-redux';
import { LikePostAction, TakeLikePostAction } from '../Redux/Actions/LikeAction.js';
import './user.css';
import Rightside from '../Components/RightSide';
import { useParams } from 'react-router';
import Posts from '../Components/Posts';
import UserPosts from '../Components/UserPosts';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const likestate = useSelector(state => state.LikePostReducer);
  const { loading, error, posts } = likestate;
  const dislikestate = useSelector(state => state.TakeLikePostReducer);
  const { user } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [postss, setPostss] = useState([]);
  const [comment, setComment] = useState("");
  const [userdata, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [name,setName] = useState("");
  const [bio,setBio] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    editProfile();
  };

  const sendConnectionReq = async () => {
    await axios.put(`${API}/sendConnectionReq/${id}`, {
    }, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    });
  }

  const editProfile = async() =>{
    await axios.put(`${API}/editProfile`,{
      name,
      bio
    },{
      headers:{
        "Authorization":localStorage.getItem("jwt")
      }
    }).then((d)=>{
      if(d.status===201){
        setUserData(d.data);
      }
    })
  }


  const fetchPosts = async () => {
    await axios.get(`${API}/getUserPosts/${id}`, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    }).then((ds) => {
      if (ds.status === 201) {
        setUserPosts(ds.data);
      }
    });
  }

  const getUserData = async () => {
    await axios.get(`${API}/getUserData/${id}`, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    }).then((ds) => {
      if (ds.status === 201) {
        setUserData(ds.data);
      }
    });

   

  }

  useEffect(() => {
    getUserData();
  }, []);



  useEffect(() => {
    fetchPosts();
  }, [posts, postss]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case true:
        setShowModal(false);
        break;

      case false:
        setShowModal(true);
        break;

      default:
        setShowModal(false);
        break;
    }
  }
  return (
    <div>
      <Container>
        <div className="box_profile" >
          <img src="/images/card-bg.svg"
            alt=""
            height="100px"
            width="fit-content"
            style={{
              borderTopRightRadius: "20px",
              borderTopLeftRadius: "20px"
            }}
          />
          <img src="/images/user.svg"
            height="100px"
            width="100px"
            style={{
              borderRadius: "50%",
              marginTop: "-50px",
              marginLeft: "20px"
            }}
            alt="" />
          <p style={{
            marginLeft: "20px",
            marginTop: "10px",
            fontWeight: "500"
          }}>{userdata?.name}</p>
          <p style={{
            marginLeft: "20px",
            marginTop: "3px",
            fontWeight: "300"
          }}>{userdata?.bio ? userdata?.bio : ""}</p>
          {
            user._id === id &&
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                <Edit />
              </Button>
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
                    onChange={(e)=>setName(e.target.value)}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Bio"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e)=>setBio(e.target.value)}
                  />

                  {/* <input
                    type="file"
                    id="pp"
                    style={{
                      display: "none"
                    }}
                  />
                  <label htmlFor="pp">
                    <AddPhotoText>
                      Add a photo
                    </AddPhotoText>
                  </label> */}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Edit</Button>
                </DialogActions>
              </Dialog>
            </div>
          }
          <p style={{
            marginLeft: "20px"
          }}>{userdata?.connections?.length} Connections</p>


          {
            user?._id !== id &&

            <button
              onClick={sendConnectionReq}
              style={{
                width: "fit-content",
                marginTop: "20px",
                marginLeft: "20px",
                background: "#0073b1",
                color: "white",
                padding: "5px 10px",
                borderRadius: "10px",
              }}
            >Connect</button>
          }

        </div>
        <Layout>

          {
            userPosts?.map((ps) => (
              <UserPosts p={ps} />
            ))
          }

        </Layout>

      </Container>
    </div>
  );
}


const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
text-align:center;
overflow: hidden;
margin-bottom: 8px;
background-color:#fff;
border-radius: 5px;
position:relative;
border: none;
box-shadow:0 0 0 1px rgb(0 0 0 / 0.15), 0 0 0 rgb(0 0 0 /0.20);
`;

const ShareBox = styled(CommonCard)`
display:flex;
flex-direction:column;
color:#958b7b;
margin:0 0 8px;
background:white;

div{
  button{
    outline:none;
    color:rgba(0,0,0,0.6);
    font-size:14px;
    line-height:1.5;
    min-height:40px;
    background:transparent;
    border:none;
    display:flex;
    align-items:center;
    font-weight:600;
  }
  &:first-child{
    display:flex;
    align-items:center;
    padding:8px 16px 0px 16px;
    img{
      width:40px;
      border-radius:50%;
      margin-right:8px;
    }
    button{
      margin:4px 0px;
      flex-grow:1;
      border-radius:35px;
      padding-left:16px;
      border:1px solid #bd9a9a26;
      background-color:white;
      text-align:left;
    }

    &:nth-child(2){
      display:flex;
      flex-wrap:wrap;
      justify-content:space-around;
      padding-bottom:4px;

      button{
        img{
          margin:0 4px 0 -2px;
        }
        span{
          color:#70b5f9;
        }
      }
    }

  }
}

`;

const Article = styled(CommonCard)`
padding:0px;
margin:0 0 8px;
overflow:none;
`;


const SharedActor = styled.div`
padding-right:40px;
flex-wrap:nowrap;
padding:12px 16px 0;
margin-bottom:8px;
align-items:center;
display:flex;
a{
  margin-right:12px;
  flex-grow:1;
  overflow:hidden;
  display:flex;
  text-decoration:none;

img{
  height:40px;
  width:50px;
}

&>div{
  display:flex;
  flex-direction:column;
  flex-grow:1;
  flex-basis:0;
  margin-left:8px;
  overflow:hidden;
  span{
    text-align:left;
    &:first-child{
      font-size:14px;
      font-weight:700;
      color:rgba(0,0,0,1);
    }
    &:nth-child(n+1){
      font-size:12px;
      color:rgba(0,0,0,0.6);
    }
  }
}
}

button{
  position:absolute;
  right:12px;
  top:0;
  background:transparent;
  border:none;
  outline:none;
}
`;

const Description = styled.div`
margin-top:8px;
width:100%;
display:block;
position:relative;
/* background-color:#f9fafb; */
text-align:start;
margin-left:20px;
img{
  object-fit:contain;
  width:100%;
  height:100%;
}
`;

const SharedImg = styled.div`
display:block;
position:relative;
margin-top:8px;
width:100%;
background-color: #f9fafb;
img{
  object-fit:contain;
  width:100%;
  height:100%; 
}
`;


const SocialCounts = styled.ul`
line-height:1.3;
display:flex;
align-items:flex-start;
overflow:auto;
margin:0 16px;
padding:8px 0px;
border-bottom:1px solid #e9e5df;
list-style:none;
li{
  margin-right:5px;
  font-size:12px;
  button{
    display:flex;
  }
}
`;

const SocialActions = styled.div`

align-items: center;
display:flex;
margin: 0;
min-height:40px;
padding:8px;
button{
  display:inline-flex;
  align-items:center;
  outline:none;
  border:none;
  border-radius:12px; 
  padding:8px;
  margin-left:10px;
  color:#0a66c2;
  @media(min-width:768px){
    span{
      margin-left:8px;
    }
  }
}
`;


const Layout = styled.div`
  margin: 50px auto;
  width:600px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    
  }
`;

const AddPhotoText = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
  margin-top:20px;
`;



export default UserProfile;