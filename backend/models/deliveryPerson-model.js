const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DeliveryPersonSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "deliveryPerson",
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },

  phone: {
    type: Number,
    required: [true, "Please provide a Mobile Number"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  profilePicture: {
    imagePublicId: {
      type: String,
      required: [
        false,
        "Error with cloudinary service! Can not find the paper URL.",
      ],
    },
    imageSecURL: {
      type: String,
      required: [
        false,
        "Error with cloudinary service! Can not find the paper URL.",
      ],
    },
  },
  deliveryHistory: [
    {
      orderID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "order",
      },
      buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "customer",
      },
      deliveryAddress: {
        type: String,
        required: true,
      },
      billAmount: {
        type: Number,
        required: true,
      },

      deliveryStatus: {
        type: String,
        default: "inTransit",
      },

      placedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

//by using "pre save" we run this code segment before mongoose save data on db
DeliveryPersonSchema.pre("save", async function (next) {
  //check whether the password has already been hashed or not by using isModified

  if (!this.isModified("password")) {
    next();
  }

  //hash password before passing it to db save query through the model

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //this.password reffers to password that contains within request object

  next();
});

//to compare hashed passwords in login scenarios

DeliveryPersonSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
};

DeliveryPersonSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const DeliveryPerson = mongoose.model("deliveryPerson", DeliveryPersonSchema);

module.exports = DeliveryPerson;
