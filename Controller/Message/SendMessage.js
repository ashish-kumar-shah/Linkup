const { emitToUser } = require("../../Socket/SocketConnection");
const Message = require("../../Models/Message"); // make sure path is correct

const handleSendMessage = async (req, res) => {
  try {
    const from = req.user; // you must ensure this is populated by auth middleware
    let { to, message } = req.body;

    console.log('to:', to);
    console.log('from:', from);

    // 1️⃣ Save to DB
    to = to._id
    const savedMessage = await Message.create({
      from: from._id || from, // depends on your req.user shape
      to,
      message,
       // or set correctly depending on context
    });

    // 2️⃣ Emit to receiver
    emitToUser(String(to), "send-message", {
      from: from._id || from,
      to,
      message,
  
      _id: savedMessage._id,
      createdAt: savedMessage.createdAt,
    });


    emitToUser(String(from),"message-status",{
      status:false,
      id:savedMessage._id,
    }

    )

    emitToUser(String(to), "latest-message", {
      from: from._id || from,
      to,
      message,
  
      _id: savedMessage._id,
      createdAt: savedMessage.createdAt,
    });

    return res.status(200).json({ success: true, data: savedMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = handleSendMessage;
