const router = require("express").Router();

const {
  newUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

// create a new user
router.post("/", newUser);

// get a user
router.get("/:userId", getUser);

// get all users
router.get("/", getAllUsers);

// update a user
router.put("/:userId", updateUser);

// delete a user
router.delete("/:userId", deleteUser);

module.exports = router;
