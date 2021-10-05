const AdminModel = require("../models/admin-model");
const RequestBook = require("../models/requestBook-model");
const NewsletterModal = require("../models/newsletter-model");
const ProductModel = require("../models/product-model");
const InvoiceModel = require("../models/invoice-model");
const OrdereModel = require("../models/order-model");
const CustomerModel = require("../models/customer-model");
const CusMessages = require("../models/contactUs-model");
const sendEmail = require("../utils/SendEmail");

const { cloudinary } = require("../utils/cloudinary");

exports.getBookRequests = async (req, res) => {
  try {
    const bookRequests = await RequestBook.find();
    res.status(200).send({ bookRequests: bookRequests });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching book requests -" + error,
    });
  }
};

//Newsletter Management

exports.createNewsletter = async (req, res) => {
  const { title, description, additionalData, fileEnc, tag } = req.body;

  try {
    const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
      upload_preset: "Newsletter_Covers",
    });
    const Newsletter = await NewsletterModal.create({
      title,
      description,
      additionalData,
      tag,
      coverImage: {
        imagePublicId: uploadedResponse.public_id,
        imageSecURL: uploadedResponse.secure_url,
      },
    });

    res.status(201).json({ success: true, Newsletter: Newsletter });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in creating newsletter-" + error,
    });
  }
};

exports.getNewsletters = async (req, res) => {
  try {
    const Newsletters = await NewsletterModal.find();
    res.status(200).send({ Newsletters: Newsletters });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Newsletters -" + error,
    });
  }
};

exports.updateNewsletter = async (req, res) => {
  const { NID, title, description, additionalData, tag, fileEnc } = req.body;
  let Newsletter;
  try {
    if (fileEnc) {
      const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
        upload_preset: "Newsletter_Covers",
      });
      Newsletter = await NewsletterModal.findByIdAndUpdate(
        NID,
        {
          $set: {
            title,
            description,
            additionalData,
            additionalData,
            tag,
            coverImage: {
              imagePublicId: uploadedResponse.public_id,
              imageSecURL: uploadedResponse.secure_url,
            },
          },
        },
        {
          new: true,
          upsert: false,
          omitUndefined: true,
        }
      );
    } else {
      Newsletter = await NewsletterModal.findByIdAndUpdate(
        NID,
        {
          $set: {
            title,
            description,
            additionalData,
            additionalData,
            tag,
          },
        },
        {
          new: true,
          upsert: false,
          omitUndefined: true,
        }
      );
    }
    res.status(200).send({
      success: true,
      desc: "newsletter updated successfully",
      Newsletter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in update newsletter" + error,
    });
  }
};

exports.deleteNewsletter = async (req, res) => {
  const nid = req.params.id;

  try {
    await NewsletterModal.deleteOne({ _id: nid });

    res.status(200).send({
      success: true,
      desc: "newsletter deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      desc: "Error delete newsletter - " + error,
    });
  }
};

//Discount Management

exports.getProducts = async (req, res) => {
  try {
    const Products = await ProductModel.find();
    res.status(200).send({ Products: Products });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Products -" + error,
    });
  }
};

exports.updateDiscounts = async (req, res) => {
  const { BID, regular, bulk, label } = req.body;

  try {
    const Discount = await ProductModel.findByIdAndUpdate(
      BID,
      {
        $set: {
          discountPercentage: {
            regular,
            bulk,
            label,
          },
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      success: true,
      desc: "Discount added successfully",
      Discount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in add discount" + error,
    });
  }
};

exports.removeDiscounts = async (req, res) => {
  const { BID } = req.body;
  const regular = 0,
    bulk = 0,
    label = "";

  try {
    const Discount = await ProductModel.findByIdAndUpdate(
      BID,
      {
        $set: {
          discountPercentage: {
            regular,
            bulk,
            label,
          },
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );

    res.status(200).send({
      success: true,
      desc: "Discount removed successfully",
      Discount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in add discount" + error,
    });
  }
};

exports.addDiscountsForSelected = async (req, res) => {
  const { BIDs, regular, bulk, label } = req.body;
  let addDiscount = false;
  for (let i = 0; i < BIDs.length; i++) {
    addDiscount = addDiscounts(BIDs[i], regular, bulk, label);
  }

  if (addDiscount) {
    res.status(200).send({
      success: true,
      desc: "Discount added successfully",
    });
  } else {
    res.status(500).json({
      success: false,
      desc: "Error in add discount" + error,
    });
  }
};

const addDiscounts = async (BID, regular, bulk, label) => {
  try {
    const Discount = await ProductModel.findByIdAndUpdate(
      BID,
      {
        $set: {
          discountPercentage: {
            regular,
            bulk,
            label,
          },
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );

    return true;
  } catch (error) {
    return false;
  }
};

exports.updateNewsletters = async (req, res) => {
  const { NID, fileEnc } = req.body;

  try {
    try {
      const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
        upload_preset: "Newsletter_Covers",
      });

      try {
        const updatedWorkshop = await NewsletterModal.findByIdAndUpdate(
          { _id: NID },
          {
            profileImage: {
              imagePublicId: uploadedResponse.public_id,
              imageSecURL: uploadedResponse.secure_url,
            },
          },
          {
            new: true,
            upsert: false,
          }
        );
        res.status(200).send({
          success: true,
          desc: " updated successfully",
          updatedWorkshop,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in updating workshop profileImage data-" + error,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in uploading new image-" + error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateProfilePicture controller-" + error,
    });
  }
};

exports.getBulkOrders = async (req, res) => {
  try {
    const bulkorders = await InvoiceModel.find().populate("items.productID");

    res.status(200).send({ bulkorders: bulkorders });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getBulkOrders -" + error,
    });
  }
};

exports.getRegularOrders = async (req, res) => {
  try {
    const orders = await OrdereModel.find().populate("orderData.productID");

    res.status(200).send({ orders: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Orders -" + error,
    });
  }
};

exports.getNewUsers = async (req, res) => {
  try {
    const customers = await CustomerModel.find();

    res.status(200).send({ customers: customers });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching customers -" + error,
    });
  }
};

exports.getCustomerMessages = async (req, res) => {
  try {
    const messages = await CusMessages.find();

    res.status(200).send({ messages: messages });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching customers -" + error,
    });
  }
};

exports.replyToCustomers = async (req, res) => {
  const messageId = req.body.messageId;
  const rep = req.body.reply;
  const email = req.body.email;
  console.log(email);
  const reply = {
    replynote: rep,
  };
  try {
    const Result = await CusMessages.findOneAndUpdate(
      { _id: messageId },
      { $push: { reply: reply } },
      {
        new: true,
        upsert: false,
      }
    );
    console.log(Result);
    sendEmail({
      to: email,
      subject: "Regarding Your Message To Matrix",
      text: `<h5>Dear Customer,</h5>
    <p>
        ${rep}
    </p>
  `,
    });
    res.status(200).send({ message: Result });

    return true;
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error reply to message -" + error,
    });
  }
};

exports.addToDos = async (req, res) => {
  const toDoItem = req.body.toDoItem;
  const id = req.user._id;
  const toDo = {
    toDoItem: toDoItem,
  };
  try {
    const Result = await AdminModel.findOneAndUpdate(
      { _id: id },
      { $push: { toDos: toDo } },
      {
        new: true,
        upsert: false,
      }
    );
    res.status(200).send({ toDo: Result });

    return true;
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in adding todo -" + error,
    });
  }
};

exports.removeToDos = async (req, res) => {
  const toDoItem = req.body.toDoItem;
  const id = req.user._id;

  try {
    const Result = await AdminModel.findOneAndUpdate(
      { _id: id },
      { $pull: { toDos: { toDoItem: toDoItem } } },
      {
        new: true,
        upsert: false,
      }
    );
    res.status(200).send({ toDo: Result });

    return true;
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in adding todo -" + error,
    });
  }
};

exports.getAdmin = async (req, res) => {
  const id = req.user._id;

  try {
    const Admin = await AdminModel.findById({ _id: id });
    res.status(200).send({ Admin: Admin });

    return true;
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in adding todo -" + error,
    });
  }
};

exports.updateAdmin = async (req, res) => {
  const { username, email, fileEnc } = req.body;
  let Admin;
  try {
    if (fileEnc) {
      const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
        upload_preset: "Newsletter_Covers",
      });
      Admin = await AdminModel.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            username,
            email,
            profilePicture: {
              imagePublicId: uploadedResponse.public_id,
              imageSecURL: uploadedResponse.secure_url,
            },
          },
        },
        {
          new: true,
          upsert: false,
          omitUndefined: true,
        }
      );
    } else {
      Admin = await AdminModel.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            username,
            email,
          },
        },
        {
          new: true,
          upsert: false,
          omitUndefined: true,
        }
      );
    }
    res.status(200).send({
      success: true,
      desc: "Admin account updated successfully",
      Admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in update Admin account " + error,
    });
  }
};
