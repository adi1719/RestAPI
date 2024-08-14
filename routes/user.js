const express = require("express");
const User = require("../models/user");
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
  getUsersForFrontEnd,
} = require("../controllers/user");

const router = express.Router();

//For Frontend
router.get("/users", getUsersForFrontEnd);

//APIs    //Make a route if multiple endpoints are same

router
  .route("/api/users")

  .get(getAllUsers)
  .post(createNewUser);

router
  .route("/api/users/:id")

  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
