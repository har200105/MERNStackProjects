import { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import axios from 'axios';
import { API } from "../../API";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ id }) => {

    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchTimeLinePosts = async () => {
        const posts = id ? await axios.get(`${API}/getUserPosts/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }) : await axios.get(`${API}/getTimeLinePosts`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        })

        if (posts.status === 201) {
            console.log(posts);
            setPosts(posts.data);
        }
    }

    useEffect(() => {
        fetchTimeLinePosts();
    }, [id]);

    return (
        <div className="feed">
            <div className="feedWrapper">

                {
                    !id &&
                    <Share />
                }

                {
                    id === user?._id && <Share />
                }

                {
                    posts?.map((p) => (
                        <Post post={p} />
                    ))
                }
                
            </div>
        </div>
    )
}

export default Feed
