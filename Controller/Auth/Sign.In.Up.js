// controllers/AuthController.js
const User = require('../../Models/User');
const { hashPassword, verifyPassword } = require('../../Utility/Paasword');
const { generateToken } = require('../../Utility/Token');


const handleSignInUp = async (req, res) => {
  try {
    const { uniqueNo, password } = req.body;

    if (!uniqueNo || !password) {
      return res.status(400).json({ message: "Unique Number and Password are required" });
    }

    let user = await User.findOne({ uniqueNo });

    if (user) {
      // Sign In
      const isMatch = await verifyPassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      // Sign Up
      const hashed = await hashPassword(password);
      user = new User({ uniqueNo, password: hashed });
      await user.save();
    }

    const token = generateToken({ id: user._id });

    // ✅ Set cookie securely
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Return only safe fields
    const safeUser = {
      _id: user._id,
      uniqueNo: user.uniqueNo,
      name: user.name || null,
      avtar: user.avtar || null,
    };

    return res.status(200).json({ message: "Auth successful", user: safeUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { handleSignInUp };
