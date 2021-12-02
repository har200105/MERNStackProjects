const router = require('express').Router();
const Conversation = require('../models/Conversation');
const reqLogin = require('../middleware/reqLogin');

router.post("/addConversation",reqLogin,async(req,res)=>{
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });
    
      try {
        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get("getConversation/:id", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.id] },
      });
      res.status(201).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  module.exports = router;
