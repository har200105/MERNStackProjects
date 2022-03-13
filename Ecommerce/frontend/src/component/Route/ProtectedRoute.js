import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { Context } from "../../Context/Context";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { user } = useContext(Context);
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (!user || user === null ) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
