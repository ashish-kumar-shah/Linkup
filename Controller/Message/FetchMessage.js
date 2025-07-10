const Message = require("../../Models/Message");

const fetchMessages = async (req, res) => {
  try {
    const userId = req.user; // your auth middleware should set this
    const { to } = req.params;

    if (!to) {
      return res.status(400).json({ success: false, message: "Receiver ID is required" });
    }

    const messages = await Message.find({
      $or: [
        { from: userId, to: to },
        { from: to, to: userId },
      ],
    })
      .sort({ createdAt: 1 }) // oldest first
      .populate("from", "_id name avtar") // optional: populate user info
      .populate("to", "_id name avtar");

    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = fetchMessages;
