const mongoose = require("mongoose");

const NewsLetterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  additionalData: { type: String },
  tag: { type: String },
  coverImage: {
    imagePublicId: {
      type: String,
      required: [
        true,
        "Error with cloudinary service! Can not find the paper URL.",
      ],
    },
    imageSecURL: {
      type: String,
      required: [
        true,
        "Error with cloudinary service! Can not find the paper URL.",
      ],
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const NewsLetter = mongoose.model("newsletter", NewsLetterSchema);

module.exports = NewsLetter;
