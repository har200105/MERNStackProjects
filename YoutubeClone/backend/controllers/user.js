const User = require("../models/user");

exports.getSingleUser = async(req, res) => {
  
  const id = req.params.id;

 await User.findById(id).then((data) => {
    if (!data) {
      return res.status(400).json({ error: true, msg: "User not found" });
    }
    res.status(201).json(data);
  });
};

exports.searchUser = async(req, res) => {
  const { id } = req.params;

  await User.findById(id).then((data, err) => {
    if (err) {
      return res.status(400).json({ error: true, err: err });
    }
    res.status(201).json(data);
  });
};
