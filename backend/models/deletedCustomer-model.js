const mongoose = require("mongoose");

const DeleteCustomerSchema = new mongoose.Schema({
      customerID:{
          type:mongoose.Schema.Types.ObjectId,
          required: true,
      },
      profileDeletedAt: {
        type: Date,
        default: Date.now,
      },
});

const DeleteCustomer = mongoose.model("deleteCustomer",DeleteCustomerSchema);
module.exports = DeleteCustomer;