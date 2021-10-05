const express = require("express");
const router = express.Router();

// import controllers
const {
  registerAdmin,
  registerCustomer,
  registerInventoryManager,
  registerDeliveryManager,
  registerDeliveryPerson,
  login,
} = require("../controllers/authentication-controller");

// Registration-routes
router.route("/admin").post(registerAdmin);
router.route("/customer").post(registerCustomer);
router.route("/inventorymanager").post(registerInventoryManager);
router.route("/deliverymanager").post(registerDeliveryManager);
router.route("/deliveryperson").post(registerDeliveryPerson);

// Login-routes
router.route("/login").post(login);

module.exports = router;
