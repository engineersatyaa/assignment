const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
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
      default: "",
    },

    // role: {
    //   type: String,
    //   enum: ["user", "admin"],
    // },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
