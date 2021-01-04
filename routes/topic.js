const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

module.exports = router;
const {
  addTopic,
  updateTopic,
  getAllTopics,
  deleteTopic,
} = require("../controllers/topic");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../middleware/index");

router.param("userId", getUserById);

router.post(
  "/topic/add/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  [check("Name", "Topic name can not be empty").notEmpty()],
  addTopic
);

router.put(
  "/topic/update/:topicId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateTopic
);

router.get("/topic/all", getAllTopics);

router.delete(
  "/topic/remove/:topicId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteTopic
);

module.exports = router;
