const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema(
  {
    ArticleContent: {
      type: String,
      required: true,
    },
    ArticleName: {
      type: String,
      unique: true,
      required: true,
    },
    SpecialityId: {
      type: String,
      required: true,
    },
    TopicId: {
      type: String,
      required: true,
    },
    keywords: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
