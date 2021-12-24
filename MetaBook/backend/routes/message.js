const router = require('express').Router();
const Message = require('../models/Message');
const reqLogin = require('../middleware/reqLogin');

router.post('/addMessage',reqLogin,async(req,res)=>{
    const newMessage = new Message(req.body);
    try {
      const savedMessage = await newMessage.save();
      res.status(201).json(savedMessage);
    } catch (err) {
      res.status(422).json(err);
    }
});

router.get('/getMessage/:id',reqLogin,async(req,res)=>{
    try {
        const messages = await Message.find({
          conversationId: req.params.id,
        });
        res.status(201).json(messages);
      } catch (err) {
        res.status(422).json(err);
      }
})


module.exports = router;