const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Chat");

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.status(201).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    console.log(newMessage);
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "avatar pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name avatar email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.status(201).json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}

module.exports = { allMessages, sendMessage };