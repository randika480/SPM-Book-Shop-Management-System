const CustomerModel = require("../models/customer-model");
const AdminModel = require("../models/admin-model");
const DeliveryManagerModel = require("../models/deliveryManager-model");
const DeliveryPersonModel = require("../models/deliveryPerson-model");
const InventoryManagerModel = require("../models/inventoryManger-model");
const { cloudinary } = require("../utils/cloudinary");

// login controller function
exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;
  //check user
  let user;
  if (role === "admin") {
    user = await AdminModel.findOne({ email: email }).select("+password");
  } else if (role === "customer") {
    user = await CustomerModel.findOne({ email: email }).select("+password");
  } else if (role === "inventoryManager") {
    user = await InventoryManagerModel.findOne({ email: email }).select(
      "+password"
    );
  } else if (role === "deliveryManager") {
    user = await DeliveryManagerModel.findOne({ email: email }).select(
      "+password"
    );
  } else if (role === "deliveryPerson") {
    user = await DeliveryPersonModel.findOne({ email: email }).select(
      "+password"
    );
  } else {
    res.status(422).json({
      success: false,
      desc: "Can not find the user - Please check again",
    });
  }
  //check password match
  try {
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(401).send({
        success: false,
        desc: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    next(error);
  }
};

// register new customer
exports.registerCustomer = async (req, res) => {
  const { username, email, password, ppEnc, address, phone } = req.body;
  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const ppUploadRes = await cloudinary.uploader.upload(ppEnc, {
        upload_preset: "Profile_Pictures",
      });
      const customer = await CustomerModel.create({
        username,
        email,
        password,
        profilePicture: {
          imagePublicId: ppUploadRes.public_id,
          imageSecURL: ppUploadRes.secure_url,
        },
        address,
        phone,
      });
      const token = await customer.getSignedToken();
      res.status(201).json({ success: true, token, role: "customer" });
    } catch (error) {
      res.status(500).json({
        error,
        desc: "Error occurred in registerCustomer" + error,
      });
    }
  }
};

// register new delivery person
exports.registerDeliveryPerson = async (req, res) => {
  const { username, email, password, phone, profilePicture, deliveryHistory } =
    req.body;
  console.log(req.body);
  let existingEmail = await findDPEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const deliveryPerson = await DeliveryPersonModel.create({
        ...req.body,
      });
      const token = await deliveryPerson.getSignedToken();
      res
        .status(201)
        .json({ success: true, token, role: "deliveryPerson", deliveryPerson });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerDeliveryPerson controller-" + error,
      });
    }
  }
};
// find duplicated user emails before register new delivery person
const findDPEmailDuplicates = async (email, res) => {
  try {
    const existingAccount = await DeliveryPersonModel.findOne({ email: email });
    if (existingAccount) {
      res.status(401).json({
        success: false,
        desc: "Email already exist - Please check again",
      });
    } else {
      return existingAccount;
    }
  } catch (err) {
    res.status(422).json({
      success: false,
      desc: "Error occured in findUserByEmail segment-" + err,
    });
  }
};

// register new admin - (for development purpose only)
exports.registerAdmin = async (req, res) => {
  const { email, password, ppEnc } = req.body;
  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const ppUploadRes = await cloudinary.uploader.upload(ppEnc, {
        upload_preset: "Profile_Pictures",
      });
      const admin = await AdminModel.create({
        email,
        password,
        profilePicture: {
          imagePublicId: ppUploadRes.public_id,
          imageSecURL: ppUploadRes.secure_url,
        },
      });
      const token = await admin.getSignedToken();
      res.status(201).json({ success: true, token, role: "admin" });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerAdmin controller-" + error,
      });
    }
  }
};

// register new inventory manager - (for development purpose only)
exports.registerInventoryManager = async (req, res) => {
  const { email, password, ppEnc } = req.body;
  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const ppUploadRes = await cloudinary.uploader.upload(ppEnc, {
        upload_preset: "Profile_Pictures",
      });
      const manager = await InventoryManagerModel.create({
        email,
        password,
        profilePicture: {
          imagePublicId: ppUploadRes.public_id,
          imageSecURL: ppUploadRes.secure_url,
        },
      });
      const token = await manager.getSignedToken();
      res.status(201).json({ success: true, token, role: "inventoryManager" });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerInventoryManager controller-" + error,
      });
    }
  }
};

// register new delivery manager - (for development purpose only)
exports.registerDeliveryManager = async (req, res) => {
  const { email, password, phone, ppEnc } = req.body;
  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const ppUploadRes = await cloudinary.uploader.upload(ppEnc, {
        upload_preset: "Profile_Pictures",
      });
      const manager = await DeliveryManagerModel.create({
        email,
        password,
        profilePicture: {
          imagePublicId: ppUploadRes.public_id,
          imageSecURL: ppUploadRes.secure_url,
        },
        phone,
      });
      const token = await manager.getSignedToken();
      res.status(201).json({ success: true, token, role: "deliveryManager" });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerDeliveryManager controller-" + error,
      });
    }
  }
};

// find duplicated user emails before register new user
const findEmailDuplicates = async (email, res) => {
  try {
    const existingAccount = await CustomerModel.findOne({ email: email });
    if (existingAccount) {
      res.status(401).json({
        success: false,
        desc: "Email already exist - Please check again",
      });
    } else {
      return existingAccount;
    }
  } catch (err) {
    res.status(422).json({
      success: false,
      desc: "Error occured in findUserByEmail segment-" + err,
    });
  }
};

//send response object to client if login success
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, user });
};
