import React, { useEffect, useState,useContext } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CommentIcon from '@material-ui/icons/Comment';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {Context} from '../Context/ContextProvider.js'
import { API } from '../API.js';
// import {useHistory} from 'react-router-dom';
// import ReactPlayer from 'react'


const PostModal = (props) => {

    const {user} = useContext(Context);
    const history = useHistory();
    const[text,setText]=useState("");
    const[shareImage,setShareImage] =  useState("");
    const[pic,setPic]= useState("");

    
    // const [showingModal,setshowingModal]=useState(true);

    // useEffect(()=>{
        // setshowingModal(true);
    // },[])


    const uploadPost=async(e)=>{
        e.preventDefault();
        if(e.target!==e.currentTarget){
            return;
        }
        reset(e);
        const url = `${API}/createpost`;
       await axios.post(url,{
            caption:text,
            pic,
        },{
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        });
            setShareImage("");
            setPic("");
            setText("");
            console.log(e);
    }


    
    const uploadingPic = async()=>{
        const data = new FormData();
        await data.append("file",shareImage);
         data.append("upload_preset","mern_insta");
         data.append("cloud_name","harshit111");
         fetch("https://api.cloudinary.com/v1_1/harshit111/image/upload",{
           method:"post",
           body:data
         }
         ).then(res=>res.json()).then(data=>{
           console.log(data);
           setPic(data.url);
        //    window.alert("Pic Uploaded");
        //    post.picture =  imageUrl || data.url; 
         });
        //  setShareImage("");
    }


    
    const reset=(e)=>{
        console.log(e);
        setText("");
        setShareImage("");
        setPic("");
        props.handleClick(e);
    }






    useEffect(()=>{
        if(shareImage!==""){
            uploadingPic();
        }
    },[pic,shareImage])

    const handleChange = (e)=>{
        const images =  e.target.files[0];
        if(images==="" || images===undefined){}
        setShareImage(images);
    }

    
    
   
   
    return (
        <React.Fragment>
        { props.showModal  && 
        <Container>
            <Content>
               <Header>
               <h2>Create a Post</h2>
                  <button onClick={(e)=>reset(e)}>
                     <CloseIcon/>
                  </button>
               </Header>
               <SharedContent>
                  <UserInfo>
                  {
                      user.pic ? <img src={user.pic} alt=""/> :
                      <img src="images/user.svg" alt=""/>
                  }
                      <span>{user.name}</span>
                  </UserInfo>
                  <Editor>

                  <textarea 
                  val={text}
                  onChange={(e)=>setText(e.target.value)}
                  placeholder="What's Going on"
                  autoFocus={true}
                  style={{
                      outline:"none",
                      border:"none"
                  }}
                  >
                  
                  </textarea>
                  </Editor>
               </SharedContent>
               <SharedCreation>
                  <AttachAssets>
                      <AssetButton>
                    <UploadImage> 
                      <input
                      type="file"
                      id="image"
                      style={{
                          display:"none"
                      }}
                      onChange={(e)=>handleChange(e)}
                      />
                      <label  htmlFor="image">
                        <InsertPhotoIcon
                        />
                        </label>
                       {shareImage && <img src = {pic} alt=""/>} 
                       </UploadImage> 
                      </AssetButton>
                     
                  </AttachAssets>
                  <ShareComment>
                  <AssetButton>
                    <CommentIcon/>
                    Anyone
                  </AssetButton>
                  </ShareComment>

                  <PostButton 
                  disabled={!text ? true : false}
                  onClick={(e)=>uploadPost(e)}
                  >
                     Post
                  </PostButton>
               </SharedCreation>
            </Content>
        </Container>
        }
        </React.Fragment>
    );
}

const Container =  styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
z-index:9999;
color:black;
background-color:rgba(0,0,0,0.8);
animation:fadeIn 0.5s;
`;


const Content = styled.div`
width:100%;
max-width: 552px;
background-color:white;
max-height:90%;
overflow:initial;
border-radius: 5px;
position:relative;
display:flex;
flex-direction:column;
top:32px;
margin:0 auto;
/* font-weight:400;
display:flex;
justify-content: space-between;
align-items: center;
button{
    height:40px;
    width:40px;
    min-width: auto;
    color:rgba(0,0,0,0.15);
    svg{
        pointer-events:none;
    } */
/* } */
`;

const Header = styled.div`
display: block;
padding:16px 20px;
border-bottom: 1px solid rgba(0,0,0,0.15);
font-size: 16px;
line-height: 1.5;
color:rgba(0,0,0,0.6);
font-weight:400;
display:flex;
justify-content: space-between;
align-items: center;
button{
    height:40px;
    width:40px;
    min-width:auto;
    color:rgba(0,0,0,0.15);
    svg{
        pointer-events: none;
    }
}
`;

const SharedContent =  styled.div`
display:flex;
flex-direction:column;
flex-grow:1;
overflow-y:auto;
vertical-align:baseline;
background:transparent;
padding:8px 12px;
`;

const UserInfo = styled.div`
display:flex;
align-items: center;
padding:12px 24px;
svg,img{
    width:48px;
    height: 48px;
    background-clip:content-box ;
    border: 2px solid transparent;
    border-radius: 50%;
}
span{
    font-weight:600;
    font-size:16px;
    line-height: 1.5;
    margin-left: 5px;
}
`;

const  SharedCreation =  styled.div`
display:flex;
justify-content:space-between;
padding:12px 24px 12px 16px;
`;


const AssetButton = styled.div`
display: flex;
align-items: center;
height: 40px;
min-width: auto;
color: rgba(0,0,0,0.5);
`;


const AttachAssets = styled.div`
align-items: center;
display: flex;
padding-right: 10px;
${AssetButton}{
    width: 40px;
}
`;

const ShareComment = styled.div`
padding-left: 10px;
border-left: 1px solid rgba(0,0,0,0.15);
margin-right: auto;
`;


const PostButton = styled.div`
min-width: 60px;
border-radius: 20px;
padding-left: 10px;
padding-right: 10px;
text-align:center;
align-items: center;
margin-top: 7px;
background:#0a66c2;
color:white;
&:hover{
    background:#004182;
    cursor:pointer;
}
`;


const Editor =  styled.div`
padding:12px 24px;
textarea{
    width:100%;
    min-height:100px;
    resize:none;
}

input{
    width:100%;
    height:35px;
    font-size:15px;
    margin-bottom:20px;
}
`;

const UploadImage = styled.div`
text-align:center;
img{
    width:100%;
    height:100%;
}
`;


export default PostModal;

