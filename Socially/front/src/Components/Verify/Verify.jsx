import React from 'react';
import axios from 'axios';
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {API} from '../../API'
import { useAlert } from 'react-alert';

const Verify = () => {

  const { search } = useLocation();
  const s = new URLSearchParams(search);
  console.log(s.get("token"));
  const alert = useAlert();
  const navigate = useNavigate();
  

  const verifyUser = async () => {
    const verify = await axios.post(`${API}/api/v1/verifyUser/${s.get("token")}`);
    verify.data.success &&   alert.success("User Verified Successfully");
    verify.data.success===false && alert.error(verify.data.message);
      navigate("/");
  }

    return (
        <>
          <div className="newPost">
            <form className="newPostForm">
                <Typography variant="h3" style={{color:"white"}}>Verify Your Account</Typography>
                <Button style={{color: "black"}} onClick={verifyUser}>
                    Verify
                </Button>
            </form>
          </div>
        </>
  )
}

export default Verify