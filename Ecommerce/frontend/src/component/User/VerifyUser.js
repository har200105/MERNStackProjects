import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './VerifyUser.css';
import { useAlert } from "react-alert";
import { API } from '../../API';

const VerifyUser = ({ history }) => {
    const alert = useAlert();
    
    const { token } = useParams();
    console.log(token);

    const verifyUser = async (req, res) => {
        await axios.post(`${API}/api/v1/verifyUser`, {
            token
        }).then((s) => {
            if (s.data.success) {
                alert.success("Email Verified Successfully");
                history.push("/login");
            } else {
                alert.error(s.data.error);
                history.push("/login");
            }
        });
    }

  return (
    <div className='verify_container'>
          <h1>Verify User</h1>  
          <div className='verify_texts'>
              <p>Please Verify your email by clicking Here</p>
          <button className='verify_button' onClick={verifyUser}>
              Verify Account
          </button>
          </div>
    </div>
  )
}

export default VerifyUser