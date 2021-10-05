const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const CustomerSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "customer",
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email"],
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
        true,
        "Error with cloudinary service! Can not find the paper URL.",
      ],
    },
    imageSecURL: {
      type: String,
      required: [
        true,
        "Error with cloudinary service! Can not find the paper URL.",
      ],
    },
  },
  address: {
    type: String,
    required: [true, "Please provide a address"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide a contact no."],
  },
  profileCreatedAt: {
    type: Date,
    default: Date.now,
  },
  cart: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      unitPrice: {
        type: Number,
      },
      proImg: {
        type: String,
      },
      originalTitle: {
        type: String,
      },
      originalAuthor: {
        type: String,
      },
      aboutBook: {
        type: String,
      },
      weight: {
        type: Number,
      },
    },
  ],
  wishList: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      proName: {
        type: String,
      },
      proImg: {
        type: String,
      },
      unitPrice: {
        type: Number,
      },
      originalAuthor: {
        type: String,
      },
      aboutBook: {
        type: String,
      },
      weight: {
        type: Number,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

//by using "pre save" we run this code segment before mongoose save data on db
CustomerSchema.pre("save", async function (next) {
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
CustomerSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
};

CustomerSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Customer = mongoose.model("customer", CustomerSchema);
module.exports = Customer;
