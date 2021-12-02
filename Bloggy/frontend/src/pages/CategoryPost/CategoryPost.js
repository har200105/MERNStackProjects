import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { getPostsByCat } from "../../redux/actions/postAction";
import { useDispatch, useSelector } from 'react-redux';
import "./CategoryPost.css";
import { useParams } from "react-router";

export default function CategoryPost() {
  
  const dispatch = useDispatch();
  const poststate = useSelector(state => state.getPostCatReducer);
  const { loading, error, posts } = poststate;
  console.log(posts);

  const {category} = useParams();
  console.log(category)

  useEffect(() => {
    dispatch(getPostsByCat(category));
  }, [category]);


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
