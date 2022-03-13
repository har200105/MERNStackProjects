import axios from "axios";
import { API } from "../API";


export const likePost = (id) => async (dispatch) => {
  try {

    dispatch({
      type: "likeRequest",
    });
    const { data } =  await axios.put(`${API}/api/v1/post/like/${id}`,{},{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await axios.put(
      `${API}/api/v1/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("token")
        },
      }
    );
    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios.put(`${API}/api/v1/delete/comment/${id}`, {
      commentId ,
    },{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const replyOnComment = (id, commentId, reply) => async (dispatch) => {

  try {
    
    dispatch({
      type: "replyCommentRequest",
    });

    const { data } = await axios.put(`${API}/api/v1/reply/comment/${id}`, {
      commentId ,comment:reply,
    },{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    dispatch({
      type: "replyCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "replyCommentFailure",
      payload: error.response.data.message,
    });
  }
} 

export const createNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const { data } = await axios.post(
      `${API}/api/v1/post/upload`,
      {
        caption,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("token")
        },
      }
    );
    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: "newPostFailure",
      payload: err.response.data.message,
    });
  }
};

export const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios.put(
      `${API}/api/v1/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("token")
        },
      }
    );
    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`${API}/api/v1/post/${id}`,{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
