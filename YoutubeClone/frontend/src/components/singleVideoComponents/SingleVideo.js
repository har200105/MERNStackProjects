import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSingleVideo } from "../../actions/video";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactWebMediaPlayer from "react-web-media-player";
import SmallVideoPlayer from "./SmallVideoPlayer";
import {useParams} from 'react-router-dom'
import { listVideos } from "../../actions/video";
import LikeCommentSubscribeSystem from "./LikeCommentSubscribeSystem";

const SingleVideo = () => {
  const [loading, setLoading] = useState(false);
  const [gotData, setGotData] = useState({});
  const [allVideos, setAllVideos] = useState([]);

  const location = useLocation();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
  
    getSingleVideo({ id })
      .then((res) => {
        setGotData(res.video[0]);
        listVideos()
          .then((data) => {
            setAllVideos(data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [location.pathname]);

  return (
    <div className="singleVideo">
      {loading && <CircularProgress color="inherit" />}
      {!loading && (
        <div style={{ display: "flex" }}>
          <div style={{ flexDirection: "column" }}>
            <ReactWebMediaPlayer
              title={`${gotData.title} | ${gotData.writer && gotData.writer}`}
              width="1050"
              height="500"
              video={gotData.filePath}
              type="video/mov"
            />
            <LikeCommentSubscribeSystem
              _id={gotData._id}
              desc={gotData.description}
              videoId={gotData.videoId}
              title={gotData.title}
              writer={gotData.writer}
              likes={gotData.likes}
              timestamp={gotData.createdAt}
              views={gotData.views}
              dislikes={gotData.dislikes}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {allVideos.map((v) => {
              return (
                <SmallVideoPlayer
                  key={v._id}
                  views={v.views}
                  title={v.title}
                  channel={v.writer}
                  timestamp={v.createdAt}
                  image={
                    v.thumbnail
                      ? v.thumbnail
                      : ""
                  }
                  channelImage={v.writerImg ? v.writerImg : null}
                  videoId={v.videoId}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleVideo;
