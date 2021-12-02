import axios from "axios";
import fetch from "isomorphic-fetch";
import { API } from "../secrets";

export const videoFileUpload = (file, token) => {
  return axios.post(`${API}/video/upload`,file,{
    headers: {
      Accept: "application/json",
      Authorization: token
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const videoDetailsUpload = (data, token) => {
  return fetch(`${API}/video/uploadDetails`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const increaseSubscribers = (data, token) => {
  return axios.post(`${API}/subscribe`,data,{
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:token,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSubscribers = (data) => {
  return axios.post(`${API}/subscribers`,data,{
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSingleVideo = (data) => {
  return fetch(`${API}/video/single`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const increaseSingleVideoView = (data) => {
  return axios.post(`${API}/video/increaseView`,data,{
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listVideos = () => {
  return axios.get(`${API}/videos`, {
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
