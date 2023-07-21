const customError = require("../utils/customError");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// get a user
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// get all users (pagination)
const getAllUsers = async (req, res, next) => {
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);

  try {
    const usersList = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalDocuments = await User.countDocuments({});

    res.status(200).json({ usersList, totalDocuments });
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

//------------------ Auth -----------------------------------

// create (register) a new user
const register = async (req, res, next) => {
  try {
    const isUserAlreadyRegistered = await User.findOne({
      email: req.body.email,
    });

    if (isUserAlreadyRegistered)
      return next(
        customError(
          400,
          `Someone is already registered with  " ${req.body.email} "`
        )
      );

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    const savedUser = await newUser.save();

    const { role, password, ...other } = savedUser._doc;

    res.status(201).json(other);
  } catch (error) {
    next(error);
  }
};

// login a user
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(customError(404, "Incorrect Email."));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(customError(401, "Incorrect Password."));

    const { password, role, ...other } = user._doc;

    res.status(200).json(other);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
