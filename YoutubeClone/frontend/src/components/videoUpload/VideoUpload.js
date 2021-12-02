import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../actions/auth";
import { videoDetailsUpload, videoFileUpload } from "../../actions/video";
import { getCookie } from "../../actions/auth";
import Alert from "@material-ui/lab/Alert";

const VideoUpload = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    formData: "",
    error: "",
    success: "",
  });

  const { title, description, formData, error, success } = values;

  const history = useHistory();

  useEffect(() => {
    if (!isAuth()) {
      history.push("/");
    }
    setValues({ ...values, formData: new FormData()});
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    videoFileUpload(formData, getCookie("token"))
      .then((res) => {
        if (res.error) {
          setValues({ ...values, error: res.error, success: "" });
        } else {
          setValues({
            ...values,
            error: "",
            success: "",
          });
          const filePath = res.url;
          console.log(res.url);
          const writer = isAuth().name;
          videoDetailsUpload(
            { title, description, filePath, writer },
            getCookie("token")
          )
            .then((res) => {
              if (res.error) {
                setValues({ ...values, error: res.error, success: "" });
              } else {
                setValues({
                  ...values,
                  error: "",
                  success: "Video uploaded successfully",
                  title: "",
                  description: "",
                  formData: "",
                });
                history.push(`/video/watch/${res.video.videoId}`);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (name) => (event) => {
    const value = name === "video" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <div
        style={{
          marginTop: "25px",
          marginLeft: "50px",
          width: "70%",
        }}
      >
        <h1>Upload your video</h1>
        <br />
        <br />
        <Alert severity="info">
          Make sure that the file is in <b>mp4</b> format otherwise your video
          will not work.
        </Alert>
        <br />
        <form onSubmit={handleSubmit}>
          <Button
            variant="contained"
            color="default"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload Video
            <input type="file" onChange={handleChange("video")} hidden />
          </Button>

          <br />
          <br />
          <br />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <br />
          <br />
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            helperText="Required"
            onChange={handleChange("title")}
            fullWidth
          />
          <br />
          <br />
          <br />
          <TextField
            label="Description"
            multiline
            rows={20}
            value={description}
            variant="outlined"
            onChange={handleChange("description")}
            fullWidth
          />
          <br />
          <br />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Publish
          </Button>
        </form>
      </div>
    </>
  );
};

export default VideoUpload;
