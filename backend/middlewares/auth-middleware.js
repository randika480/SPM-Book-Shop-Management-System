const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin-model");
const CustomerModel = require("../models/customer-model");
const InventoryManagerModel = require("../models/inventoryManger-model");
const DeliveryManagerModel = require("../models/deliveryManager-model");
const DeliveryPersonModel = require("../models/deliveryPerson-model");

exports.protectedAdmin = async (req, res, next) => {
  let token;
  token = tokenValidate(req, res);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AdminModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedCustomer = async (req, res, next) => {
  let token;
  token = tokenValidate(req, res);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await CustomerModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedInventoryManager = async (req, res, next) => {
  let token;
  token = tokenValidate(req, res);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await InventoryManagerModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedDeliveryManager = async (req, res, next) => {
  let token;
  token = tokenValidate(req, res);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await DeliveryManagerModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedDeliveryPerson = async (req, res, next) => {
  let token;
  token = tokenValidate(req, res);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await DeliveryPersonModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
const tokenValidate = (reqObj, res) => {
  let token;
  if (
    reqObj.headers.authorization &&
    reqObj.headers.authorization.startsWith("Bearer")
  ) {
    token = reqObj.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({ success: false, desc: "Not Authorized to Access" });
  }
  return token;
};

const noUserResponse = (res) => {
  res.status(404).json({ success: false, desc: "No user found with this ID" });
};

const invalidUserResponse = (res, err) => {
  res
    .status(401)
    .json({ success: false, desc: "Something went wrong, Frobidden-" + err });
};
