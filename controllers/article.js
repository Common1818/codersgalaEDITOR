const Article = require("../models/Article");
const { validationResult } = require("express-validator");

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).sort([["createdAt", -1]]);
    res.json({
      articles,
      messages: [{ msg: `Articles fetched successfully !!!` }],
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      messages: [{ msg: `Error fetching Articles` }],
    });
  }
};

exports.getArticleById = async (req, res, next, articleId) => {
  try {
    const article = await Article.findById(articleId);
    console.log(article);
    req.article = article;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "ERR..article not found",
    });
  }
};

exports.addArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const article = req.body;
  const { SpecialityId, TopicId } = req.body;

  try {
    if (!SpecialityId || !TopicId) {
      return res.json({
        article,
        messages: [
          { msg: `Can not add article SpecialityId or TopicId is missing` },
        ],
      });
    }

    const newArticle = new Article(article);

    // req.body.specifications = spec._id;

    // const bike = new Product(req.body);

    await newArticle.save();

    return res.json({
      article,
      messages: [{ msg: `Article was added Successfully !!!` }],
    });
  } catch (err) {
    console.log(err);

    res.json({
      messages: [{ msg: `Error addding Bike` }],
    });
  }
};

exports.updateArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findByIdAndUpdate(articleId, req.body);
    res.json({
      article,
      messages: [{ msg: `Article updated successfully` }],
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      messages: [{ msg: `Error Updating Article` }],
    });
  }
};

exports.removeArticle = async (req, res) => {
  const article = req.article;
  try {
    await article.remove();
    res.json({
      article,
      messages: [{ msg: `article deleted successfully` }],
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      messages: [{ msg: `Error Deleting article` }],
    });
  }
};
