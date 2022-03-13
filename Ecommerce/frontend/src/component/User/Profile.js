import React, { Fragment, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { Context } from "../../Context/Context";

const Profile = ({ history }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const {user} = useContext(Context);
  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated === false && !user) {
      history.push("/login");
    }
    console.log(user);
  }, [history, user]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0,10)}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
