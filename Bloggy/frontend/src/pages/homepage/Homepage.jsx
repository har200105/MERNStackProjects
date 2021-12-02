import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { getAllPosts } from "../../redux/actions/postAction";
import { useDispatch, useSelector } from 'react-redux';
import "./homepage.css";
import { useParams } from "react-router";

export default function Homepage() {
  const dispatch = useDispatch();
  const poststate = useSelector(state => state.getPostReducer);
  const { loading, error, posts } = poststate;
  console.log(posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return (
    <>
      <Header />
      <div className="home">
        {loading && <div></div>}
        {error && <div style={{
          color: "red"
        }}>Something Went Wrong !!</div>}
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
