const express = require("express"); //import express
const router = express.Router(); //routes request to the correct API(like a sign board). It is an express package
const {
  createUserHandler,
  getUsersHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler
} = require("../../controllers/v1/userController");

const { validateToken } = require("../../middleware/auth");

router.get('/', getUsersHandler);

router.get('/:id', getUserHandler);

router.post('/', createUserHandler);

router.put('/:id', validateToken, updateUserHandler);

router.delete('/:id', deleteUserHandler);

router.post('/:login', loginUserHandler);

module.exports = router;
