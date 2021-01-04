const Speciality = require("../models/Speciality");
const Article = require("../models/Article");
const Topic = require("../models/Topic");
const { validationResult } = require("express-validator");

exports.getSpecialityById = async (req, res, next, specialityId) => {
  try {
    const speciality = await Speciality.findById(specialityId);
    req.speciality = speciality;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Speciality not found",
    });
  }
};

exports.getAllSpecialities = async (req, res) => {
  try {
    const specialities = await Speciality.find({}).sort([["Name", -1]]);
    res.json({
      specialities,
      messages: [{ msg: `Specialities fetched successfully !!!` }],
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      messages: [{ msg: `Error fetching specialities` }],
    });
  }
};

exports.addSpeciality = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const speciality = new Speciality(req.body);

    await speciality.save();

    return res.json({
      speciality,
      messages: [{ msg: `Speciality was added Successfully !!!` }],
    });
  } catch (err) {
    console.log(err);
    res.json({
      messages: [{ msg: `Error addding Speciality` }],
    });
  }
};

exports.updateSpeciality = async (req, res) => {
  const { specialityId } = req.params;

  try {
    const speciality = await Speciality.findByIdAndUpdate(
      specialityId,
      req.body
    );
    res.json({
      speciality,
      messages: [{ msg: `Speciality updated successfully` }],
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      messages: [{ msg: `Error Updating Speciality` }],
    });
  }
};

exports.removeSpeciality = async (req, res) => {
  const speciality = req.speciality;
  const { _id } = speciality;
  console.log(_id);
  try {
    const topics = await Topic.find({ SpecialityId: _id });
    topics.forEach(async (topic) => {
      const articles = await Article.find({ TopicId: topic._id });
      articles.forEach(async (article) => {
        await article.remove();
      });

      await topic.remove();
    });

    await speciality.remove();

    res.json({
      messages: [
        {
          msg: `Speciality its topics and its articles were deleted successfully`,
        },
      ],
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      messages: [{ msg: `Error Deleting Speciality` }],
    });
  }
};
