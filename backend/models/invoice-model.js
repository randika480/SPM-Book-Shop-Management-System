const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  retailShop: {
    type: String,
    required: true,
  },
  invoiceId: {
    type: String,
    required: true,
  },
  placedAt: {
    type: Date,
    default: Date(),
  },
  payment: {
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  notes: {
    type: String,
  },
  items: [
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
    },
  ],
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;
