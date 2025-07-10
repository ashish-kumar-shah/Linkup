const User = require('../../Models/User');

const authUser = async (req, res) => {
  try {
    const  id = req.user; // req.user is set by your verifyToken middleware
console.log(id);

    // Find user by ID, exclude password
    const user = await User.findById(id).select('-password -secret');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = authUser;
