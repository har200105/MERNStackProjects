import "./Share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import { useRef } from "react";
import axios from "axios";
import { API } from "../../API";

export default function Share() {
  const description = useRef();

  const postSubmit = (e) => {
    e.preventDefault();
    const post = {
      description: description.current.value,
    }
    try {
      await axios.post(`${API}/addPost`, post, {
        headers: {
          "Authorization": localStorage.setItem("jwt")
        }
      })
    } catch (e) {

    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/image.jpg" alt="" />
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
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Cancel
              className="cancelShareImg"
              onClick={()=>setFile("")}
            />
          </div>

        }
        <form className="shareBottom" onSubmit={postSubmit}>
          <div className="shareOptions">
            <div className="shareOption">
              <label for="image" className="shareOption" />
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="image"
                accept=".png,.jpeg,.jpg"
              />
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}