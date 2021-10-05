const mongoose = require("mongoose");

const DeleteDocsSchema = new mongoose.Schema({
  docID: {
    type: String,
    required: true,
  },
  type: { type: String },
  note: { type: String },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const DeletedInventoryDocsModel = mongoose.model(
  "deletedInventoryDocsLog",
  DeleteDocsSchema
);
module.exports = DeletedInventoryDocsModel;
