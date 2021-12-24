import "./Share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { API } from "../../API";
import { AuthContext } from "../../context/AuthContext";

export default function Share({change,newp}) {
  
  const description = useRef();
  const {user} = useContext(AuthContext);
  const [file,setFile] = useState("");
  
  const readImage = (e) => {
    console.log(e);
    const reader = new FileReader();
    reader.onload = () => {
        if (reader.readyState === 2) {
            setFile(reader.result);
        }
    }
    reader.readAsDataURL(e.target.files[0])
}

  const postSubmit = async(e) => {
    console.log("S");
    e.preventDefault();
   

      await axios.post(`${API}/addPost`, {
        caption: description.current.value,
        image:file
      }, {
        headers: {
          "Authorization": localStorage.getItem("jwt")
        }
      }).then((s)=>{
        if(s.status===201){
        description.current.value="";
        setFile("");
        console.log(s);
        window.location.reload();
        change(!newp);
    }
      })
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user?.profilePicture ? user?.profilePicture  : "/assets/noAvatar.png"} alt="" />
          <input
            placeholder="What's in your mind ?"
            className="shareInput"
            ref={description}
          />
        </div>
        <hr className="shareHr" />
        {
          
          file &&
          <div className="shareImgContainer">
            <img
              className="shareImg"
              src={file}
              alt=""
            />
          </div>

        }
        <form className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <label for="image" className="shareOption" >
              <PermMedia htmlColor="tomato" className="shareIcon"  />
              </label>
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="image"
                accept=".png,.jpeg,.jpg"
                onChange={readImage}
              />
            </div>
          
          </div>
          <button className="shareButton" onClick={postSubmit}>Post</button>
        </form>
      </div>
    </div>
  );
}