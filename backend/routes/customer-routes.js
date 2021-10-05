const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedCustomer} = require("../middlewares/auth-middleware");


//import controllers
const {
    getCustomerProfile,
    updateCustomerProfile,
    deleteCustomerProfile,
    updateProfilePicture,
    addToCart,
    removeCartItems,
    getCartItems,
    getOrders,
    addOrder,
    createRequestBook,
    addToWishList,
    getWishlist,
    removeItemsFromWishlist,
    createReview,
    updateReview,
    deleteReview,
    getReviews,
    // getInvoice
} = require("../controllers/customer-controller");

//customer profile routes
router.route("/addToCart").put(protectedCustomer,addToCart);
router.route("/removeCartItems").put(protectedCustomer,removeCartItems);
router.route("/getCartItems").get(protectedCustomer,getCartItems);

router.route("/profile").get(protectedCustomer,getCustomerProfile);
router.route("/updateProfile").put(protectedCustomer,updateCustomerProfile);
router.route("/deleteProfile").delete(protectedCustomer,deleteCustomerProfile);
router.route("/updatePP").put(protectedCustomer,updateProfilePicture);
router.route("/getOrders").get(protectedCustomer,getOrders);
router.route("/addOrder").post(protectedCustomer,addOrder);
router.route("/requestBook").post(createRequestBook);
router.route("/addtoWishlist").put(protectedCustomer,addToWishList);
router.route("/getWishlist").get(protectedCustomer,getWishlist);
router.route("/removeWishlistItem").put(protectedCustomer,removeItemsFromWishlist);
router.route("/addReview").post(protectedCustomer,createReview);
router.route("/updateReview").put(protectedCustomer,updateReview);
router.route("/deleteReview").delete(protectedCustomer,deleteReview);
router.route("/getReviews").get(protectedCustomer, getReviews);
// router.route("/getInvoice").get(protectedCustomer,getInvoice);

module.exports = router;
