const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  uniqueNo: {
    type: String,
    required: [true, "Unique Number is required"],
    unique: true,
    validate: [
      {
        validator: function (v) {
          return /^\d+$/.test(v);
        },
        message: "Unique Number must contain only digits",
      },
      {
        validator: function (v) {
          return v.length >= 10 && v.length <= 15;
        },
        message: "Unique Number must be between 10 and 15 digits",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    
  },
  secret: {
    type: String,
    // Not required now
  },
  name: {
    type: String,
    default:'NewUser'
  },
  avtar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
},{timestamps:true});

const User = model("User", userSchema);
module.exports = User;
