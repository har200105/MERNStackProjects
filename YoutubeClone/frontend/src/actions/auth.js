import cookie from "js-cookie";
import { API } from "../secrets";
import axios from 'axios';

export const signin =async (data) => {
  const lo = await axios.post(`${API}/user/signin`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  console.log(lo.data)

  return lo;
}

export const signup = async(user) => {
 
  const sign =  await axios.post(`${API}/user/signup`, user, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  console.log(sign.data)

  return sign.data;



}

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
}

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
}

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
}

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
}

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return axios.get(`${API}/user/signout`)
    .then((response) => {
      console.log("Logout Success");
    })
    .catch((err) => console.log(err));
}
