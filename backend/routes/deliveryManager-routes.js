const express = require("express");
const router = express.Router();
const {
  addRailwayCost,
  getCost,
  editRailwayCost,
  deleteRailwayCost,
  editRetailCost,
  editBulkCost,
  editprecentage,
  addcategory,
  deleteCategory,
  getAllCategory,
  editCategory,
  addQA,
  deleteQA,
  editQA,
  addCusInquiry,
  getAllInquiries,
  addReply,
  getAllDeliveryPerson,
  deleteDeliveryPerson,
  editDeliveryPerson,
  getAllOrders,
  assignDp,
  orderAdded,
} = require("../controllers/deliveryManager-controller");

//delivery cost
router.route("/addrailway").put(addRailwayCost);
router.route("/editrailway").put(editRailwayCost);
router.route("/getcost").get(getCost);
router.route("/deleterailway").put(deleteRailwayCost);
router.route("/editretail").put(editRetailCost);
router.route("/editbulk").put(editBulkCost);
router.route("/editprecentage").put(editprecentage);
//FAQ
router.route("/addcategory").post(addcategory);
router.route("/removecategory").delete(deleteCategory);
router.route("/getallcategory").get(getAllCategory);
router.route("/editcategory").put(editCategory);
router.route("/addqa").put(addQA);
router.route("/deleteqa").put(deleteQA);
router.route("/editqa").put(editQA);
//customerInquiries
router.route("/addinquir").post(addCusInquiry);
router.route("/getallinquiries").get(getAllInquiries);
router.route("/addreply").put(addReply);
//deliveryPerson
router.route("/getalldp").get(getAllDeliveryPerson);
router.route("/editdp").put(editDeliveryPerson);
router.route("/removedp").delete(deleteDeliveryPerson);
//order management
router.route("/getallorders").get(getAllOrders);
router.route("/assigndp").put(assignDp);
router.route("/addorder").put(orderAdded);
module.exports = router;
