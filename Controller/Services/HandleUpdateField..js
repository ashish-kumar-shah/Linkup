const User = require("../../Models/User");
const bcrypt = require("bcrypt");

const handleUpdateField = async (req, res) => {
  try {
    const userId = req.user; // From verified token
    const updates = {};

    const { name, password, secret } = req.body;

    if (name) updates.name = name;

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters.",
        });
      }

      if (!secret) {
        return res.status(403).json({
          success: false,
          message: "Secret is required to update password.",
        });
      }

      // Get user’s stored secret to verify
      const user = await User.findById(userId);

      if (!user || user.secret !== secret) {
        return res.status(403).json({
          success: false,
          message: "Invalid secret provided.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields to update." });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select('-password -secret');

    return res.json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = handleUpdateField;
