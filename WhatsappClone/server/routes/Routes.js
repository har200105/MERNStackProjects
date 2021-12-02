import express from 'express';


import { newConversation, getConversation } from '../controller/conversation-controller.js';
import { addUser, getUser } from '../controller/user-controller.js';
import { newMessage, getMessage }from '../controller/message-controller.js';
import User from '../modal/User.js'

const route = express.Router();

route.post('/add', addUser);
route.get('/users', getUser);

route.post('/conversation/add', newConversation);
route.post('/conversation/get', getConversation);

route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessage);


route.put('/addAbout',async(req,res)=>{
    console.log(req.body)
    await User.findOneAndUpdate({googleId:req.body.id},{
        about:req.body.about
    },{new:true}).then((s)=>{
        console.log(s)
        res.status(201).json(s)
    })
})


export default route;