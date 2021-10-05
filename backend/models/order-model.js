const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  buyerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customer",
  },
  deiveryPersonID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "deliverypeople",
  },
  billAmount: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryFee: {
    type: Number,
    default: 200,
  },
  purchasedDate: {
    type: Date,
    default: Date(),
  },
  deliveryStatus: {
    type: String,
    default: "pending",
  },
  updatedTime: {
    type: Date,
    default: Date(),
  },
  orderData: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
