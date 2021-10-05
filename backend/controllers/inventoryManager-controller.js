const InventoryManagerModel = require("../models/inventoryManger-model");
const DeletedProfileModel = require("../models/deletedProfile-model");
const DeletedInventoryDocsModel = require("../models/deletedInventoryDocs-model");
const ProductModel = require("../models/product-model");
const InvoiceModel = require("../models/invoice-model");
const { cloudinary } = require("../utils/cloudinary");
const bcrypt = require("bcryptjs");

// add new book
exports.addNewBook = async (req, res) => {
  const {
    publishingTitle,
    originalTitle,
    translator,
    originalAuthor,
    aboutAuthor,
    aboutBook,
    category,
    ISBN,
    license,
    quantity,
    edition,
    translatorContact,
    translatorEmail,
    press,
    proofReader,
    coverDesigner,
    typeSetter,
    weight,
    marketPrice,
    coverCost,
    licenseCost,
    writerPayment,
    proofReadingPayment,
    typeSetterPayment,
    printCost,
    encImg,
  } = req.body;

  try {
    const existingBook = await findBookByISBN(ISBN, res);
    if (existingBook) {
      res.status(400).json({
        desc: "Book already exist - Please check again",
      });
    } else {
      const uploadRes = await uploadFiles(encImg, "Book_Covers");
      const newBook = await ProductModel.create({
        publishingTitle,
        originalTitle,
        translator,
        originalAuthor,
        aboutAuthor,
        aboutBook,
        ISBN,
        category,
        license,
        print: { quantity, edition },
        inStockQuantity: quantity,
        translatorContact,
        translatorEmail,
        press,
        proofReader,
        coverDesigner,
        typeSetter,
        weight,
        marketPrice,
        bookImage: {
          imagePublicId: uploadRes.public_id,
          imageSecURL: uploadRes.secure_url,
        },
        charges: {
          coverCost,
          licenseCost,
          writerPayment,
          proofReadingPayment,
          typeSetterPayment,
          printCost,
        },
      });
      res.status(201).json({
        newBook,
        desc: "New book added",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in addNewBook",
    });
  }
};

// get all books
exports.getAllBooks = async (req, res) => {
  try {
    const allBooks = await ProductModel.find();
    res.status(200).send({
      allBooks,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getAllBooks",
    });
  }
};

// get specific book
exports.getBookByISBN = async (req, res) => {
  const ISBN = req.params.isbn;
  try {
    const book = await ProductModel.findOne({ ISBN });
    res.status(200).send({
      book,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getBookByISBN",
    });
  }
};

// update specific book
exports.updateBookByISBN = async (req, res) => {
  let {
    publishingTitle,
    originalTitle,
    translator,
    originalAuthor,
    aboutAuthor,
    aboutBook,
    ISBN,
    inStockQuantity,
    category,
    license,
    translatorContact,
    translatorEmail,
    press,
    proofReader,
    coverDesigner,
    typeSetter,
    weight,
    marketPrice,
    coverCost,
    licenseCost,
    writerPayment,
    proofReadingPayment,
    typeSetterPayment,
    printCost,
  } = req.body;
  if (!publishingTitle) {
    publishingTitle = undefined;
  }
  if (!originalTitle) {
    originalTitle = undefined;
  }
  if (!translator) {
    translator = undefined;
  }
  if (!originalAuthor) {
    originalAuthor = undefined;
  }
  if (!aboutAuthor) {
    aboutAuthor = undefined;
  }
  if (!aboutBook) {
    aboutBook = undefined;
  }
  if (!license) {
    license = undefined;
  }
  if (!inStockQuantity) {
    inStockQuantity = undefined;
  }
  if (!translatorContact) {
    translatorContact = undefined;
  }
  if (!category) {
    category = undefined;
  }
  if (!translatorEmail) {
    translatorEmail = undefined;
  }
  if (!press) {
    press = undefined;
  }
  if (!proofReader) {
    proofReader = undefined;
  }
  if (!coverDesigner) {
    coverDesigner = undefined;
  }
  if (!typeSetter) {
    typeSetter = undefined;
  }
  if (!weight) {
    weight = undefined;
  }
  if (!marketPrice) {
    marketPrice = undefined;
  }
  if (!coverCost) {
    coverCost = undefined;
  }
  if (!licenseCost) {
    licenseCost = undefined;
  }
  if (!writerPayment) {
    writerPayment = undefined;
  }
  if (!proofReadingPayment) {
    proofReadingPayment = undefined;
  }
  if (!typeSetterPayment) {
    typeSetterPayment = undefined;
  }
  if (!printCost) {
    printCost = undefined;
  }
  try {
    const updatedBook = await ProductModel.findOneAndUpdate(
      { ISBN },
      {
        $set: {
          publishingTitle,
          originalTitle,
          translator,
          originalAuthor,
          aboutAuthor,
          aboutBook,
          ISBN,
          category,
          license,
          inStockQuantity,
          translatorContact,
          translatorEmail,
          press,
          proofReader,
          coverDesigner,
          typeSetter,
          weight,
          marketPrice,
          charges: {
            coverCost,
            licenseCost,
            writerPayment,
            proofReadingPayment,
            typeSetterPayment,
            printCost,
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
      desc: "Book data updated successfully",
      updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in updateBookByISBN",
    });
  }
};

// update cover image
exports.updateCoverImageByISBN = async (req, res) => {
  const { ISBN, imgPID, encImg } = req.body;
  try {
    const deleteResponse = await deleteFiles(imgPID);
    const uploadRes = await uploadFiles(encImg, "Book_Covers");
    if (deleteResponse && uploadRes) {
      const updatedBook = await ProductModel.findOneAndUpdate(
        { ISBN },
        {
          $set: {
            bookImage: {
              imagePublicId: uploadRes.public_id,
              imageSecURL: uploadRes.secure_url,
            },
          },
        }
      );
      res.status(200).send({
        desc: "Book cover image updated successfully",
        updatedBook,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in updateCoverImageByISBN",
    });
  }
};

// delete specific book
exports.deleteBookByISBN = async (req, res) => {
  const ISBN = req.params.isbn;
  try {
    await ProductModel.deleteOne({ ISBN });
    const logResponse = await logDeletes(ISBN, "BOOK", "DELETE NOTE", res);
    res.status(202).json({ desc: "Book deleted successfully", logResponse });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in deleteBookByISBN",
    });
  }
};

// create ledger report

// add new bulk order invoice
exports.addNewInvoice = async (req, res) => {
  const { invoiceId, retailShop, totalAmount, notes, items } = req.body;
  try {
    const existingInvoice = await findInvoiceByID(invoiceId, res);
    if (existingInvoice) {
      res.status(400).json({
        desc: "Invoice already exist - Please check again",
      });
    } else {
      const newInvoice = await InvoiceModel.create({
        invoiceId,
        retailShop,
        payment: { totalAmount },
        notes,
        items,
      });
      res.status(201).json({
        newInvoice,
        desc: "New invoice added",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in addNewInvoice",
    });
  }
};

// get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const allInvoices = await InvoiceModel.find();
    res.status(200).send({
      allInvoices,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getAllInvoices",
    });
  }
};

// get specific invoice
exports.getInvoiceByID = async (req, res) => {
  const invoiceId = req.params.invoiceId;
  try {
    const invoice = await InvoiceModel.findOne({ _id: invoiceId });
    res.status(200).send({
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getInvoiceByID",
    });
  }
};

// update specific invoice
exports.updateInvoiceByID = async (req, res) => {
  let { _id, retailShop, invoiceId, notes, totalAmount, status, items } =
    req.body;

  if (!retailShop) {
    retailShop = undefined;
  }
  if (!invoiceId) {
    invoiceId = undefined;
  }
  if (!totalAmount) {
    totalAmount = undefined;
  }
  if (!notes) {
    notes = undefined;
  }
  if (!items) {
    items = undefined;
  }
  if (!status) {
    status = undefined;
  }
  try {
    const updatedInvoice = await InvoiceModel.updateOne(
      { _id: _id },
      {
        $set: {
          retailShop,
          invoiceId,
          payment: { totalAmount, status },
          notes,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      desc: "Invoice data updated successfully",
      updatedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in updateInvoiceByID",
    });
  }
};

// delete specific invoice
exports.deleteInvoiceByID = async (req, res) => {
  const _id = req.params._id;
  try {
    await InvoiceModel.deleteOne({ _id: _id });
    await logDeletes(_id, "INVOICE", "DELETE NOTE", res);
    res.status(202).json({ desc: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in deleteInvoiceByID",
    });
  }
};

// get profile details
exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({ profile: req.user });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getProfile",
    });
  }
};

// update profile details
exports.updateProfile = async (req, res) => {
  let uploadRes;
  const { username, email, encPP } = req.body;
  if (!username) {
    username = undefined;
  }
  if (!email) {
    email = undefined;
  }
  if (!encPP) {
    uploadRes = undefined;
  }
  try {
    if (encPP !== undefined) {
      uploadRes = await uploadFiles(encPP, "Profile_Pictures");
    }
    const updatedUser = await InventoryManagerModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          role: "inventoryManager",
          username,
          email,
          password: undefined,
          profilePicture: {
            imagePublicId: uploadRes.imagePublicId,
            imageSecURL: uploadRes.imageSecURL,
          },
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).json({
      updatedUser,
      desc: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in updateProfile",
    });
  }
};

// password reset
exports.passwordReset = async (req, res) => {
  const { password, newPassword } = req.body;
  const user = await InventoryManagerModel.findOne({
    email: req.user.email,
  }).select("+password");
  try {
    const isMatch = await user.matchPasswords(password);
    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword, salt);
      await InventoryManagerModel.updateOne(
        { _id: req.user._id },
        {
          $set: {
            role: "inventoryManager",
            username: req.user.username,
            email: req.user.email,
            password: newHashedPassword,
            profilePicture: {
              imagePublicId: undefined,
              imageSecURL: undefined,
            },
          },
        },
        {
          omitUndefined: true,
        }
      );
      res.status(200).send({
        desc: "Password updated successfully",
      });
    } else {
      res.status(400).json({
        desc: "Invalid current password, please enter correct password.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in passwordReset",
    });
  }
};

// delete specific profile
exports.deleteAccount = async (req, res) => {
  const { reason, note } = req.body;
  try {
    const deleteResponse = await InventoryManagerModel.findByIdAndDelete({
      id: req.user._id,
    });
    const deleteLog = await DeletedProfileModel.create({
      profileID: req.user._id,
      reason,
      note,
    });
    res.status(202).send({
      desc: "Account deleted successfully",
      deleteResponse,
      deleteLog,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in deleteAccount",
    });
  }
};

// check ISBN duplicates
const findBookByISBN = async (ISBN, res) => {
  try {
    const existingBook = await ProductModel.findOne({ ISBN: ISBN });
    return existingBook;
  } catch (error) {
    res.status(422).json({
      error,
      desc: "Error occurred in findBookByISBN",
    });
  }
};

// check Invoice duplicates
const findInvoiceByID = async (invoiceId, res) => {
  try {
    const existingInvoice = await InvoiceModel.findOne({
      invoiceId: invoiceId,
    });
    return existingInvoice;
  } catch (error) {
    res.status(422).json({
      error,
      desc: "Error occurred in findInvoiceByID",
    });
  }
};

// manage file uploads
const uploadFiles = async (file, preSetName) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: preSetName,
    });
    return uploadResponse;
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in uploadFiles",
    });
  }
};

// manage file deletes
const deleteFiles = async (filePID) => {
  try {
    const deleteResponse = await cloudinary.uploader.destroy(filePID);
    return deleteResponse;
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in deleteFiles",
    });
  }
};

// log deleted invoices and books
const logDeletes = async (docID, type, note, res) => {
  try {
    const logResponse = await DeletedInventoryDocsModel.create({
      docID,
      type,
      note,
    });
    return logResponse;
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in logDeletes",
    });
  }
};
