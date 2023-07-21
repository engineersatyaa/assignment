const User = require("../models/User");

// create a new user
const newUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

// get a user
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// update a user
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// delete a user
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({ msg: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { newUser, getUser, getAllUsers, updateUser, deleteUser };
