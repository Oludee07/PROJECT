const express = require("express"); //import express
const router = express.Router(); //routes request to the correct API(like a sign board). It is an express package
const {
  createUserHandler,
  getUsersHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../../controllers/v1/userController");

//const users = []; //simulated database

router.get("/", getUsersHandler);


router.get("/:id", getUserHandler);

//we need HTTP client to test(insomnia,postman)
router.post("/", createUserHandler);

router.put("/:id", updateUserHandler);

router.delete("/:id", deleteUserHandler);

module.exports = router;
