const express = require("express");
const router = express.Router();

const { protectedAdmin } = require("../middlewares/auth-middleware");

const {
  createNewsletter,
  updateNewsletter,
  getNewsletters,
  deleteNewsletter,
  getProducts,
  updateDiscounts,
  addDiscountsForSelected,
  removeDiscounts,
  getBookRequests,
  getBulkOrders,
  getRegularOrders,
  getCustomerMessages,
  getNewUsers,
  addToDos,
  removeToDos,
  getAdmin,
  replyToCustomers,
  updateAdmin,
} = require("../controllers/admin-controller");

router.route("/createNewsletter").post(createNewsletter);
router.route("/updateNewsletter").put(updateNewsletter);
router.route("/getNewsletters").get(getNewsletters);
router.route("/deleteNewsletter/:id").delete(deleteNewsletter);
router.route("/getProducts").get(getProducts);
router.route("/updateDiscounts").put(updateDiscounts);
router.route("/addDiscountsForSelected").put(addDiscountsForSelected);
router.route("/removeDiscounts").put(removeDiscounts);
router.route("/getBookRequests").get(getBookRequests);
router.route("/getBulkOrders").get(getBulkOrders);
router.route("/getRegularOrders").get(getRegularOrders);
router.route("/getNewUsers").get(getNewUsers);
router.route("/getCustomerMessages").get(getCustomerMessages);
router.route("/addToDos").put(protectedAdmin, addToDos);
router.route("/removeToDos").put(protectedAdmin, removeToDos);
router.route("/getAdmin").get(protectedAdmin, getAdmin);
router.route("/replyToCustomers").put(replyToCustomers);
router.route("/updateAdmin").put(protectedAdmin, updateAdmin);

module.exports = router;
