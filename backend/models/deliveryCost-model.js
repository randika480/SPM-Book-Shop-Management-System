const mongoose = require("mongoose");

const DeliveryCostSchema = new mongoose.Schema({
  bulkexpressprecentage: {
    type: Number,
    required: [false, "Please provide a Bulk Express Precentage"],
  },

  retailexpressprecentage: {
    type: Number,
    required: [false, "Please provide a Retail Express Precentage"],
  },

  retailcost: [
    {
      provincename: {
        type: String,
        required: [true, "Please provide a province"],
      },
      cost: {
        type: Number,
        required: [true, "Please provide a cost"],
      },
    },
  ],

  bulkcost: [
    {
      provincename: {
        type: String,
        required: [true, "Please provide a province"],
      },
      cost: {
        type: Number,
        required: [true, "Please provide a cost"],
      },
    },
  ],

  traincost: [
    {
      destination: {
        type: String,
        required: [true, "Please provide a station name"],
      },
      cost: {
        type: Number,
        required: [true, "Please provide a cost"],
      },
    },
  ],
});

const DeliveryCost = mongoose.model("deliveryCost", DeliveryCostSchema);

module.exports = DeliveryCost;
