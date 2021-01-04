const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      unique: true,
      required: true,
    },
    SpecialityId: {
      type: String,
      required: true,
    },
    locked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", TopicSchema);
