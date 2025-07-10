const Message = require("../../Models/Message");
const { emitToUser } = require("../../Socket/SocketConnection");

const markMessagesAsRead = async (req, res) => {
  try {
    const { from } = req.body; // who sent the messages
    const to = req.user; // who is reading them — from auth middleware

    console.log(`You are in seen message and user ${to} seen the message from ${from}`);

    if (!from) {
      return res.status(400).json({ success: false, message: "Missing sender id" });
    }

    // ✅ Get latest unread message
    const latestMessage = await Message.findOne(
      { from, to, isRead: false }
    ).sort({ createdAt: -1 });

    // ✅ Update all unread ones
    const result = await Message.updateMany(
      { from, to, isRead: false },
      { $set: { isRead: true } }
    );

    emitToUser(from, "seen-message", { from, to });

    if (latestMessage) {
      emitToUser(from, "message-status-change", {
        status: true,
        id: latestMessage._id,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Messages marked as read",
      updatedCount: result.modifiedCount,
      latestMessageId: latestMessage ? latestMessage._id : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { markMessagesAsRead };
