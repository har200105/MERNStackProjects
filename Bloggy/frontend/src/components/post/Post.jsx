import { Link } from "react-router-dom";
import "./post.css";
import { format } from 'timeago.js'

export default function Post({ img, post }) {
  console.log(post)
  return (
    <div className="post">
      <img
        className="postImg"
        src={post?.photo ?  post?.photo : img}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to={`/getCatPost/${post?.category?._id}`}>
              {post?.category?.name}
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to={`/post/${post?._id}`} className="link">
            {post?.title}
          </Link>
        </span>
        <span className="postTitle">
          <Link to={`/userProfile/${post?.postedBy?._id}`} className="link">
            Posted By: {post?.postedBy.name}
          </Link>
        </span>
        <hr />
        <span className="postDate">{format(post?.createdAt)}</span>
      </div>
      <p className="postDesc">
        {post?.desc}
      </p>
    </div>
  );
}


