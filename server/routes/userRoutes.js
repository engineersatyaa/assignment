const router = require("express").Router();

const {
  register,
  login,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

// get a user
router.get("/:userId", getUser);

// get all users
router.get("/", getAllUsers);

// update a user
router.put("/:userId", updateUser);

// delete a user
router.delete("/:userId", deleteUser);

//-------------- auth ----------------------------

// create (register) a new user
router.post("/", register);

// login a user
router.post("/login", login);

module.exports = router;
