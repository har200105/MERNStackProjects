import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Avatar, Button } from "@material-ui/core";
import { isAuth, getCookie } from "../../actions/auth";
import { getSingleUser } from "../../actions/username";
import { increaseSubscribers, listVideos } from "../../actions/video";
import SmallVideoPlayer from "../singleVideoComponents/SmallVideoPlayer";
import Alert from "@material-ui/lab/Alert";

const SingleUser = () => {
  const [loading, setLoading] = useState(false);
  const [gotData, setGotData] = useState({});
  const [allVideos, setAllVideos] = useState([]);
  const [subscribers, setSubscribers] = useState(0);
  const [error, setError] = useState("");

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const username = location.pathname.split("/")[2];
    getSingleUser({ username })
      .then((res) => {
        if (res.error) {
          setLoading(false);
          setError(res.msg);
        } else {
          console.log(res.data);
          setGotData(res.data);
          setSubscribers(res.data.subscribers);
          listVideos()
            .then((data) => {
              setAllVideos(data.data);
              setLoading(false);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, [location.pathname]);

  const handleSubscribe = () => {
    const username = location.pathname.split("/")[2];
    increaseSubscribers({ username }, getCookie("token")).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div className="singleVideo" style={{ flex: "0.85", marginLeft: "-100px" }}>
      {error && (
        <Alert
          style={{ width: "50%", marginLeft: "24%", marginTop: "5%" }}
          severity="error"
        >
          {error}. Please visit a valid page.
        </Alert>
      )}
      {loading && <CircularProgress color="inherit" />}
      {!loading && !error && (
        <>
          <div style={{ marginLeft: "20%", marginTop: "3%" }}>
            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{ display: "flex", marginLeft: "10px" }}>
                <Avatar src={gotData.image && gotData.image} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h6
                    style={{
                      marginLeft: "10px",
                      marginTop: "2px",
                      fontSize: "16px",
                    }}
                  >
                    {gotData.name}
                  </h6>
                  <p
                    style={{
                      marginLeft: "10px",
                      marginTop: "2px",
                    }}
                  >
                    {subscribers} subscribers
                  </p>
                </div>
              </div>
              <div style={{ marginLeft: "50%" }}>
                {isAuth() ? (
                  <Button className="btn__subscribe" onClick={handleSubscribe}>
                    Subscribe
                  </Button>
                ) : (
                  <Button
                    onClick={() => history.push("/signin")}
                    className="btn__noUserSubscribe"
                  >
                    Sign In to Subscribe
                  </Button>
                )}
              </div>
            </div>
            <br />
            <br />
            <h2>Videos</h2>
            <div
              style={{
                display: "flex",
                marginLeft: "-50px",
                flexDirection: "column",
                flexWrap: "nowrap",
              }}
            >
              {allVideos
                .filter((d) => {
                  return d.writer === location.pathname.split("/")[2];
                })
                .map((v) => {
                  return (
                    <>
                      <SmallVideoPlayer
                        key={v._id}
                        views={v.views}
                        title={v.title}
                        channel={v.writer}
                        timestamp={v.createdAt}
                        image={
                          v.thumbnail
                            ? v.thumbnail
                            : "http://shlokatech.in/blogImages/node-js-authentication.jpg"
                        }
                        channelImage={v.writerImg ? v.writerImg : null}
                        videoId={v.videoId}
                      />
                    </>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleUser;
