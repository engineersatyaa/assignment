const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    address: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      maxLength: 200,
      default: "",
    },

    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dqy9nudgb/image/upload/v1678469764/Millennials/igzjzbncjrc0cbsqot5a.webp",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
