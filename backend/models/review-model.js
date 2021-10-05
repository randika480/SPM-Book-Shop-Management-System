const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customer",
  },
  bookName:{
    type:String,
    required:true,
  },
  rating:{
    type:Number,
    required:true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("review", ReviewSchema);
module.exports = Review;
