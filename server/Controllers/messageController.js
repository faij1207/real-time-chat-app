const messageModel = require("../Models/messageModel");

// Create a new message

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new messageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const response = await message.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get all messages

const getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { createMessage, getMessages };
