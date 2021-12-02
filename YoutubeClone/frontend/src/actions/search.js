import axios from "axios";
import { API } from "../secrets";

export const videoSearch = (data) => {
  return axios.post(`${API}/video/search`,data,{
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const userSearch = (data) => {
  return axios.post(`${API}/user/search`,data,{
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
