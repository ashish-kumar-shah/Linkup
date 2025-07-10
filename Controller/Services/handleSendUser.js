const User = require('../../Models/User');
const Message = require('../../Models/Message');

const handleFetchUser = async (req, res) => {
  try {
    const myId = req.user;

    const users = await User.find({ _id: { $ne: myId } }).select('_id name avtar');

    const result = await Promise.all(
      users.map(async (user) => {
        const latestMessage = await Message.findOne({
          from: user._id,   // 📌 ONLY what they sent to me
          to: myId
        })
          .sort({ createdAt: -1 })
          .limit(1)
          .lean();

        const unreadCount = await Message.countDocuments({
          from: user._id,
          to: myId,
          isRead: false,
        });

        return {
          _id: user._id,
          name: user.name,
          avtar: user.avtar,
          latestMessage: latestMessage ? {
            from: latestMessage.from,
            to: latestMessage.to,
            message: latestMessage.message,
            createdAt: latestMessage.createdAt,
          } : null,
          unreadCount,
        };
      })
    );

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch users with chats' });
  }
};

module.exports = handleFetchUser;
