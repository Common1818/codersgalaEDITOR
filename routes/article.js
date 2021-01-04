const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { isSignedIn, isAuthenticated, isAdmin } = require("../middleware/index");
const { getUserById } = require("../controllers/user");

const {
  addArticle,
  getAllArticles,
  updateArticle,
  getArticleById,
  removeArticle,
} = require("../controllers/article");

//all of params
router.param("userId", getUserById);
router.param("articleId", getArticleById);

//create bike route
router.get("/article/all", getAllArticles);

router.post(
  "/article/add/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  [
    check(
      "ArticleContent",
      "Article needs to have some content in it"
    ).notEmpty(),
  ],
  [check("ArticleName", "Article name can not be empty").notEmpty()],
  [check("SpecialityId", "SpecialityID can not be empty").notEmpty()],
  [check("TopicId", "TopicId can not be empty").notEmpty()],
  addArticle
);

router.put(
  "/article/update/:articleId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateArticle
);

router.delete(
  "/article/remove/:articleId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeArticle
);

module.exports = router;
