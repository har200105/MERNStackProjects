const router = require('express').Router();
const Conversation = require('../models/Conversation');
const reqLogin = require('../middleware/reqLogin');

router.post("/addConversation/:id",reqLogin,async(req,res)=>{
    const findConv = await Conversation.findOne({$and:[{members:{$in:[req.params.id]}},{members:{$in:[req.user._id]}}]})
    .populate("members","name email profilePicture");
    if(findConv){
      return res.status(201).json(findConv)
    }else{
    const newConversation = new Conversation({
        members: [req.params.id, req.user._id],
      });
         await newConversation.save().then(async(s)=>{
          await Conversation.findById(s._id)
          .populate("members","name email profilePicture").then((da)=>{
            console.log("daa")
            res.status(201).json(da);
          })
        });
        
  }
});

router.get("/getConversation", reqLogin,async (req, res) => {
    try {
      const conversation = await Conversation.find({members: { $in: [req.user._id]}})
      .populate("members","name email profilePicture");
      res.status(201).json(conversation);
    } catch (err) {
      res.status(422).json(err);
    }
});


router.get('/findConversation/:id',reqLogin,async(req,res)=>{
  await Conversation.findById(req.params.id).then((d)=>{
    res.status(201).json(d)
  })
})


  module.exports = router;
