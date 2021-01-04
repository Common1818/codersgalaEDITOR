const Topic = require("../models/Topic");
const Article = require("../models/Article");
const Speciality = require("../models/Speciality");
const { validationResult } = require("express-validator");

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find({}).sort([["createdAt", -1]]);
    res.json({
      topics,
      messages: [{ msg: `topics fetched successfully !!!` }],
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      messages: [{ msg: `Error fetching topics` }],
    });
  }
};

exports.addTopic = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { SpecialityId } = req.body;
    if ((await Speciality.findById(SpecialityId)) == null) {
      return res.json({
        messages: [{ msg: `Error addding topic, speciality was not found` }],
      });
    }
    const topic = new Topic(req.body);
    await topic.save();
    return res.json({
      topic,
      messages: [{ msg: `Topic was added Successfully !!!` }],
    });
  } catch (err) {
    console.log(err);
    res.json({
      messages: [{ msg: `Error addding Topic` }],
    });
  }
};

exports.updateTopic = async (req, res) => {
  const { topicId } = req.params;
  try {
    const topic = await Topic.findByIdAndUpdate(topicId, req.body);
    res.json({
      topic,
      messages: [{ msg: `topic updated successfully` }],
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      messages: [{ msg: `Error Updating topic` }],
    });
  }
};

exports.deleteTopic = async (req, res) => {
  const { topicId } = req.params;
  //deleting articles first
  try {
    const articles = await Article.find({ TopicId: topicId });
    articles.forEach(async (article) => {
      await article.remove();
    });
    //deleteing topic
    const topic = await Topic.findById(topicId);
    await topic.remove();
    res.json({
      messages: [{ msg: `topic and its articles were deleted successfully` }],
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      messages: [{ msg: `Error Deleting topic` }],
    });
  }
};
