const mongoose = require("mongoose");

const DeleteProfileSchema = new mongoose.Schema({
  profileID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  reason: { type: String },
  note: { type: String },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const DeletedProfile = mongoose.model("deletedProfileLog", DeleteProfileSchema);
module.exports = DeletedProfile;
