const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  publishingTitle: {
    type: String,
    required: true,
  },
  originalTitle: {
    type: String,
    required: true,
  },
  translator: {
    type: String,
    required: false,
  },
  originalAuthor: {
    type: String,
    required: true,
  },
  aboutAuthor: {
    type: String,
    required: true,
  },
  aboutBook: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  license: {
    type: Boolean,
    required: false,
  },
  print: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      edition: {
        type: Number,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  inStockQuantity: {
    type: Number,
    required: true,
  },
  translatorContact: {
    type: String,
    required: false,
  },
  translatorEmail: {
    type: String,
    required: false,
  },
  press: {
    type: String,
    required: true,
  },
  proofReader: {
    type: String,
    required: false,
  },
  coverDesigner: {
    type: String,
    required: false,
  },
  typeSetter: {
    type: String,
    required: false,
  },
  weight: {
    type: Number,
    required: true,
  },
  bookImage: {
    imagePublicId: {
      type: String,
      required: [
        true,
        "Error with Cloudinary service! Can not find the paper URL.",
      ],
    },
    imageSecURL: {
      type: String,
      required: [
        true,
        "Error with Cloudinary service! Can not find the paper URL.",
      ],
    },
  },
  marketPrice: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    regular: { type: Number, default: 0 },
    bulk: { type: Number, default: 0 },
    label: { type: String },
  },
  charges: {
    coverCost: Number,
    licenseCost: Number,
    writerPayment: Number,
    proofReadingPayment: Number,
    typeSetterPayment: Number,
    printCost: {
      type: Number,
      required: true,
    },
  },
  ratings: [
    {
      customerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "customers",
      },
      ratingAmount: { type: Number },
    },
  ],
  addDate: {
    type: Date,
    default: Date(),
  },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
