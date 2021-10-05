const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  category: { type: String, required: true },
  faq: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
});

const FAQ = mongoose.model("faq", FAQSchema);

module.exports = FAQ;
