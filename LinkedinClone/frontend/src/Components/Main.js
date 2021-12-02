import styled from 'styled-components';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import PostModal from './PostModal';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../Context/ContextProvider';
import axios from 'axios';
import { API } from '../API';
import { useDispatch, useSelector } from 'react-redux';
import { LikePostAction, TakeLikePostAction } from '../Redux/Actions/LikeAction.js';
import Posts from './Posts';

const Main = () => {
  const dispatch = useDispatch();
  const likestate = useSelector(state => state.LikePostReducer);
  const { loading, error, posts } = likestate;
  const dislikestate = useSelector(state => state.TakeLikePostReducer);
  const { user } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [postss, setPostss] = useState([]);
  const [comment,setComment] = useState("");


  const fetchPosts = async () => {
    const url = `${API}/getPosts`;
    const posts = await axios.get(url, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    });
    console.log(posts.data);
    setPostss(posts.data);
  }


  // useEffect(()=>{

  // },[showModal])

  const likePost = (id) => {
    dispatch(LikePostAction(id));
  }

  const disLikePost = (id) => {
    dispatch(TakeLikePostAction(id));
  }


  console.log(user._id)
  useEffect(() => {
    fetchPosts();
    console.log(user._id)
  }, [posts,postss]);

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

        <ShareBox>

          <div>
            {
              user.pic ? <img src={user.pic} alt="" /> :
                <img src="/images/user.svg" alt=""  />
            }
            <button onClick={(event) => handleClick(event)}>Start a Post</button>
          </div>

          <div>
            <button>
              <InsertPhotoIcon
                color="primary"
              />
              <span>Photo</span>
            </button>


          </div>
        </ShareBox>

        {
          postss.map(p => (
             <Posts p={p}/>
          ))}
      </Container>
      <PostModal showModal={showModal} handleClick={handleClick} />
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

export default Main;