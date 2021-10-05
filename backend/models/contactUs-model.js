const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide a email"],
  },
  mobileNumber: {
    type: Number,
    required: false,
  },
  department: {
    type: String,
    required: [true, "Please provide a department"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },

  reply: [
    {
      replynote: { type: String, required: true },
      replyedAt: { type: Date, default: Date.now },
    },
  ],
});

const ContactUs = mongoose.model("contactUs", ContactUsSchema);
module.exports = ContactUs;
