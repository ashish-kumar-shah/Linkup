const cloudinary = require('../../Config/Cloudinary'); // ✅ no .v2 here
const fs = require('fs');
const User = require('../../Models/User');

const uploadProfileAvatar = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user;

    if (!file) {
      return res.json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'image',
      folder: 'avatars',
    });

    fs.existsSync(file.path) && fs.unlinkSync(file.path);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avtar: result.secure_url },
      { new: true }
    ).select('-password -secret')

    return res.json({
      success: true,
      avtarUrl: result.secure_url,
      user: updatedUser,
    });

  } catch (error) {
    console.error('Avatar Upload Error:', error);
    return res.json({
      success: false,
      message: 'Avatar upload failed.',
    });
  }
};

module.exports = uploadProfileAvatar;
