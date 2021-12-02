import axios from "axios";
import { API } from "../secrets";

export const getSingleUser = (data) => {
  return axios.post(`${API}/user/single`,data,{
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
