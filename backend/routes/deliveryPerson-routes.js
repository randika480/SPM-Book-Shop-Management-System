const express = require("express");
const router = express.Router();
const {
  getProfile,
  editstatus,
} = require("../controllers/deliveryPerson-controller");
const { protectedDeliveryPerson } = require("../middlewares/auth-middleware");
// profile
router.route("/get-profile").get(protectedDeliveryPerson, getProfile);
router.route("/editstatus").put(editstatus);
module.exports = router;
