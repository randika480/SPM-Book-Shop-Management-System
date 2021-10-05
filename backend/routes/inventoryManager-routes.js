const express = require("express");
const router = express.Router();
const { protectedInventoryManager } = require("../middlewares/auth-middleware");
const {
  addNewBook,
  getAllBooks,
  deleteBookByISBN,
  getBookByISBN,
  updateBookByISBN,
  addNewInvoice,
  passwordReset,
  getProfile,
  getAllInvoices,
  getInvoiceByID,
  updateInvoiceByID,
  deleteInvoiceByID,
} = require("../controllers/inventoryManager-controller");
// books
router.route("/add-book").post(protectedInventoryManager, addNewBook);
router.route("/get-books").get(getAllBooks);
router.route("/get-book/:isbn").get(getBookByISBN);
router
  .route("/delete-book/:isbn")
  .delete(protectedInventoryManager, deleteBookByISBN);
router.route("/edit-book").put(protectedInventoryManager, updateBookByISBN);
router.route("/password-rest").put(protectedInventoryManager, passwordReset);
// invoices
router.route("/add-invoice").post(protectedInventoryManager, addNewInvoice);
router.route("/get-invoices").get(protectedInventoryManager, getAllInvoices);
router.route("/edit-invoice").put(protectedInventoryManager, updateInvoiceByID);
router
  .route("/get-invoice/:invoiceId")
  .get(protectedInventoryManager, getInvoiceByID);
router
  .route("/delete-invoice/:_id")
  .delete(protectedInventoryManager, deleteInvoiceByID);

// profile
router.route("/get-profile").get(protectedInventoryManager, getProfile);
module.exports = router;
