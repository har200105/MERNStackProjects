const Video = require("../models/video");
const User = require("../models/user");
const Playlists = require("../models/playlists");
const shortid = require("shortid");
const formidable = require("formidable");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadVideo = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Video could not be uploaded",
      });
    }

    const { video } = files;

    if (!video) {
      return res.status(400).json({
        error: "Video is required",
      });
    } else {
      cloudinary.v2.uploader
        .upload(
          video.path,
          {
            resource_type: "video",
            public_id: `yt/videos/${Math.random()}`,
            chunk_size: 6000000,
            eager: [
              {
                width: 160,
                height: 100,
                crop: "crop",
                gravity: "south",
                audio_codec: "none",
              },
            ],
            eager_async: true,
          },
          function (error, result) {
            console.log(result, error);
          }
        )
        .then((d) => {
          console.log(d);
          return res.status(201).json({
            public_id: d.public_id,
            url: d.url,
          });
        });
    }
  });
};

exports.uploadVideoDetails = async (req, res) => {
  const { title, description, writer, filePath } = req.body;

  const videoId = shortid.generate();

  if (!title) {
    res.status(400).json({ error: "Title is required" });
  } else {
    const newVideo = await new Video({
      title,
      description,
      writer,
      videoId,
      filePath,
    });
    newVideo.save((err, v) => {
      if (err) {
        return res.status(400).json({
          success: false
        });
      }
      return res.status(201).json({
        success: true,
        video: v,
      });
    });
  }
};

exports.getSingleVideo = (req, res) => {
  const { id } = req.params;

  Video.findById(id).exec((err, video) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    res.status(201).json({ video });
  });
};

exports.list = async(req, res) => {
  await Video.find({}).then((data) => {
    res.json({ data });
  });
}

exports.increaseView = async (req, res) => {
  const { _id, videoId } = req.body;
  await Video.findByIdAndUpdate(_id, {
    $inc: {
      views: 1
    }
  }).then((v) => {
    return res.json({ views: v });
  });
}

exports.increaseSubscribe = async (req, res) => {
  const { username } = req.body;

  await User.findByIdAndUpdate(req.user._id, {
    $inc: {
      subscribers: 1
    }
  }).then((data) => {
    res.status(201).json(data)
  });
}

exports.getSubscribers = async (req, res) => {
  const { _id } = req.body;

  await User.findById(_id).then((data) =>
    res.status(201).json({ subscribers: data.subscribers })
  );
};

exports.searchVideo = async (req, res) => {
  const { searchTerm } = new RegExp("^" + req.body)

  await Video.find({ title: { $regex: searchTerm } }).then((data, err) => {
    if (err) {
      return res.status(400).json({ error: true, err: err });
    }
    res.status(201).json(data);
  });
};


exports.increaseLike = async (req, res) => {
  const { videoId } = req.body;
  const video = await Video.findById(videoId);

  if (!video.likes.includes(req.user._id)) {
    await Video.findByIdAndUpdate(videoId, {
      $push: {
        likes: req.user._id
      }
    }).then((s)=>{
      res.status(201).json({message:"Video Liked Successfully"})
    })
  }else{
    res.status(401).json({message:"You Already Like This Video"})
  }
}

exports.decreaseLike = async (req, res) => {
  const { videoId } = req.body;
  const video = await Video.findById(videoId);

  if (video.likes.includes(req.user._id)) {
    await Video.findByIdAndUpdate(videoId, {
      $pull: {
        likes: req.user._id
      }
    }).then((s)=>{
      res.status(201).json({message:"Video Liked Successfully"})
    })
  }else{
    res.status(401).json({message:"You Don't Like This Video"})
  }
}