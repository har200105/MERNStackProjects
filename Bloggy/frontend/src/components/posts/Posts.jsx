import Post from "../post/Post";
import "./posts.css";

export default function Posts({posts}) {
  return (
    <div className="posts">
      {

       posts && posts.map((s)=>(  
      <Post post={s} img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
      ))
      
    }
    </div>
  );
}
