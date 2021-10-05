const mongoose = require("mongoose");

const RequestBookSchema = new mongoose.Schema({
 
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  language:{
    type:String,
    required: true,
  }
});

const RequestBook = mongoose.model("requestBook", RequestBookSchema);
module.exports = RequestBook;
