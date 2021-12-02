import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Leftside from '../Components/LeftSide';
import Rightside from '../Components/RightSide';
import { Context } from '../Context/ContextProvider';
import axios from 'axios';
import { API } from '../API';
import { format } from 'timeago.js';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    const getNot = async () => {
        await axios.get(`${API}/getNotifications`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((dl) => {
            if (dl.status === 201) {
                setNotifications(dl.data);
                console.log(dl.data);
            }
        })
    }

    const acceptRequest = async (userid, notificationid) => {
        await axios.post(`${API}/acceptRequest`, {
            userid,
            notificationid
        }, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((s) => {
            if (s.status === 201) {
                getNot();
            }
        })
    }

    const rejectRequest = async (id) => {
        await axios.post(`${API}/rejectRequest/${id}`, {
        }, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((s) => {
            if (s.status === 201) {
                getNot();
            }
        })
    }

    useEffect(() => {
        getNot();
    }, []);
    const { user } = useContext(Context);
    return (
        <Container>
            <Section>
                <h5>
                    <a href>Hiring in a hurry? - </a>
                </h5>
                <p>
                    Find talented pros in record time with Upwork and keep business
                    moving.
                </p>
            </Section>
            <Layout>
                <Leftside />
                <Rightside />
                <div>
                    {
                        notifications?.map((n) => (
                            <div>
                                {
                                    n.notificationType === "connection" ?
                                        <div style={{
                                            background: "white",
                                            height: "70px",
                                            padding: "20px",

                                        }}>
                                            <img src="/images/user.svg" style={{
                                                width: "50px",
                                                float: "left",
                                                marginRight: "10px",
                                                borderRadius: "50%"
                                            }} />
                                            <p>{n.notificationBy.name}  {n.notificationDescription} <p style={{
                                                float: "right",
                                                color: "gray",
                                                fontWeight: "200"
                                            }}>{format(n?.createdAt)}</p></p>
                                            <p style={{
                                                // float:"right"
                                                color: "black"
                                            }}></p>
                                            <button
                                                onClick={() => acceptRequest(n.notificationBy._id, n._id)}
                                                style={{
                                                    float: "left",
                                                    marginLeft: "60px",
                                                    marginBottom: "20px",
                                                    marginTop: "10px",
                                                    color: "white",
                                                    background: "#0073b1",
                                                    fontWeight: "300",
                                                    outline: "none",
                                                    padding: "5px 10px",
                                                    borderRadius: "10px",
                                                    border: "none",


                                                }}>
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => rejectRequest(n._id)}
                                                style={{
                                                    float: "left",
                                                    marginLeft: "60px",
                                                    marginBottom: "20px",
                                                    marginTop: "10px",
                                                    color: "white",
                                                    background: "gray",
                                                    fontWeight: "300",
                                                    outline: "none",
                                                    padding: "5px 10px",
                                                    borderRadius: "10px",
                                                    border: "none",


                                                }}>
                                                Reject
                                            </button>
                                        </div>
                                        :
                                        <div style={{
                                            background: "white",
                                            height: "70px",
                                            padding: "20px",

                                        }}>
                                            <img src="/images/user.svg" style={{
                                                width: "50px",
                                                float: "left",
                                                marginRight: "10px",
                                                borderRadius: "50%"
                                            }} />

                                            <p style={{
                                                margin: "10px"
                                            }}>{n.notificationBy.name}  {n.notificationDescription} <p style={{
                                                float: "right",
                                                color: "gray",
                                                fontWeight: "200"
                                            }}>{format(n?.createdAt)}</p></p>



                                        </div>

                                }


                            </div>
                        ))
                    }
                </div>
            </Layout>

        </Container>
    )
}

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;


export default Notification
