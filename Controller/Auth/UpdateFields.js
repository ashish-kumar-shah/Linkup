const User = require('../../Models/User');

const UpdateUserFields = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user, // assuming auth middleware sets req.user = user ID
      { name },
      { new: true }
    ).select('-password -secret');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User fields updated successfully.",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Error updating user fields:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = UpdateUserFields;
