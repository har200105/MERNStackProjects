import { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import axios from 'axios';
import { API } from "../../API";
import { AuthContext } from "../../context/AuthContext";
import {useDispatch,useSelector} from 'react-redux';

const Feed = ({ id }) => {

    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const [newp,setNewp]=useState(false);

    const dispatch = useDispatch();

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


    // const poststate = useState(state=>state.getPostsReducer);


    useEffect(() => {
        fetchTimeLinePosts();
    }, [id,newp]);

    return (
        <div className="feed">
            <div className="feedWrapper">

                {
                    !id &&
                    <Share  change={setNewp} newp={newp}/>
                }

                {
                    id === user?._id && <Share change={setNewp} newp={newp}/>
                }
                {
                    posts?.map((p) => (
                        <Post post={p} fetchTimeLinePosts={fetchTimeLinePosts} />
                    ))
                }
                
            </div>
        </div>
    )
}

export default Feed
