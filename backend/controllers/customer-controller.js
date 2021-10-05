const CustomerModel = require("../models/customer-model");
const DeletedCustomerModel = require("../models/deletedCustomer-model");
const { cloudinary } = require("../utils/cloudinary");
const sendEmail = require("../utils/SendEmail");
const OrderModel = require("../models/order-model");
const RequestBook = require("../models/requestBook-model");
const ProductModel = require("../models/product-model");
const ReviewModel = require("../models/review-model");
const mongoose = require("mongoose");
// const easyinvoice = require('easyinvoice');
// const fs = require('fs');
// const path = require('path');

//fetch customer profile
exports.getCustomerProfile = async (req,res) =>{
    try{
        if(!req.user) {
            res.status(422).json({
                success:false,
                desc:"Can not find the user - please check again",

            });
        }else {
            res.status(200).send({
                customer:req.user,
            });
        }
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getCustomerProfile controller - "+error,
        });
    }
};

//update cutomer profile
exports.updateCustomerProfile = async (req,res) => {
    const {username,email,address,phone} = req.body;

    try{
        const newData = {
            username,
            email,
            address,
            phone
        };

        const updatedCustomer = await CustomerModel.findByIdAndUpdate(
            req.user.id,
            newData,
            {
                new:true,
                upsert:false,
                omitUndefined:true
            }
        );
        res.status(200).send({
            success:true,
            desc: "customer update successfully",
            updatedCustomer,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating customer profile controller " +error,
        });
    }
};

//update profile picture
exports.updateProfilePicture = async (req, res) => {
    const { fileEnc } = req.body;

    try {
        const destroyedImage = await cloudinary.uploader.destroy(
            req.user.profilePicture.imagePublicId
        );

        if (destroyedImage) {
            try {
                const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
                    upload_preset: "Profile_Pictures",
                });

                try {
                    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
                        { _id: req.user._id },
                        {
                            $set: {
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
                    res.status(200).send({
                        success: true,
                        desc: " updated successfully",
                        updatedCustomer,
                    });
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        desc: "Error in updating customer profileImage data-" + error,
                    });
                }
            } catch (error) {
                res.status(500).json({
                    success: false,
                    desc: "Error in uploading new image-" + error,
                });
            }
        } else {
            res.status(500).json({
                success: false,
                desc: "Error in previous image remove-" + error,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in updateProfilePicture controller-" + error,
        });
    }
};

//delete customer profile
exports.deleteCustomerProfile = async(req,res) =>{

    if (!mongoose.Types.ObjectId.isValid(req.user._id))
        return res.status(404).send(`No Customer with id: ${req.user._id}`);

    try {
        await CustomerModel.findByIdAndRemove(req.user._id);
        const deletedCustomer = await DeletedCustomerModel.create({
            customerID:req.user._id
        });
        const cloudinaryRes = await cloudinary.uploader.destroy(
            req.user.profilePicture.imagePublicId
        );
        res.status(200).send({
            success: true,
            desc: "Customer deleted successfully",
            deletedCustomer,
            cloudinaryRes,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Customer Profile controller-" + error,
        });
    }


};




//add products to cart 
exports.addToCart = async(req,res) =>{
    const productID = req.body.productID;
    const prPrice = req.body.price;
    const prImg = req.body.img;
    const bookName = req.body.bName;
    const bookauthor = req.body.bAuthor;
    const description = req.body.about;
    const bookWeight = req.body.weight;
    const CustomerId = req.user._id;

    try{
        const Cart = {
            productID:productID,
            unitPrice:prPrice,
            proImg:prImg,
            originalTitle:bookName,
            originalAuthor:bookauthor,
            aboutBook:description,
            weight:bookWeight,
        };

        await CustomerModel.findOneAndUpdate(
            { _id:CustomerId},
            {$push:{cart:Cart}},
            {
                new:true,
                upsert:false,
            }
        );
        res.status(200).send({status:"Product Added to Cart"});
    }catch(error){
        res.status(500).send({error: error.message});
    }
};

//remove products from cart
exports.removeCartItems = async (req, res) => {
    const proId = req.body.pid;
    try {
      const customer = req.user._id;
      await CustomerModel.updateOne(
        { _id: customer },
        { $pull: { cart: { productID: proId } } }
      );
  
      res.status(200).send({
        status: "product removed from the list",
      });
    } catch (error) {
      res.status(500).send({
        status: "Internal Server Error in wishlist item delete",
        error: error.message,
      });
    }
  };

//fetch cart
exports.getCartItems = async(req,res) =>{
    let cusId = req.user._id;
    

    await CustomerModel.findById(cusId)
        .then((customer) =>{
            res.status(200).send({status:"Cart fetched",cart:customer.cart});
        })
        .catch((err) =>{
            res.status(500).send({
                status: "Internal server Error in fetching customer",
                error:err.message,
            });
        })
};



//fetch orders placed by a specific customer
exports.getOrders = async (req, res, next) => {
    let orders;

    try {
        orders = await OrderModel.find(
            { buyerID: req.user._id },
            "_id billAmount deliveryAddress deliveryStatus orderData"
        );

        res.status(200).send({ orders: orders });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Internal Server Error",
        });
    }
};

//add order
exports.addOrder = async (req, res) => {
  const buyerID = req.user._id;
  let address = req.user.address;

  const { billAmount, deliveryAddress,  orderData } = req.body;

  if (req.body.deliveryAddress) {
    address = deliveryAddress;
  }

  try {
    const newDelOrder = await OrderModel.create({
      buyerID,
      billAmount,
      deliveryAddress: address,
      orderData,
    });

    sendEmail({
      to: req.user.email,
      subject: "Order has been placed!",
      text: `<h5>Dear ${req.user.username},</h5>
      <p>
      Thank you for ordering from APURU POTH! <br />
      We're excited for you to receive your order #${newDelOrder._id} and will notify you once it's on its way. We hope you had a great shopping experience! You can check your order status from your profile.
      Please note, we are unable to change your delivery address once your order is placed.<br />
      Thank you.
      </p>
      `,
    });
    for (let i = 0; i < orderData.length; i++) {
      getInstock(orderData[i].productID, orderData[i].quantity);
      console.log(orderData[i].productID);
      console.log(orderData[i].quantity);
    }
    res.status(201).send({
      status: "Order has created successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: "Internal Server Error in new order create",
      error: error.message,
    });
  }
};

const getInstock = async (id, qty) => {
  const stock = await ProductModel.findOne({ _id: id });
  newQty = stock.inStockQuantity - qty;
  updateStock(newQty, id);
};

const updateStock = async (inStockQuantity, id) => {
  const updateQty = await ProductModel.updateOne(
    { _id: id },
    { inStockQuantity: inStockQuantity }
  );

  console.log(updateQty);
};

//Request Translation Book
exports.createRequestBook = async(req,res) => {
    const {
        bookName,
        author,
        description,
        language,
    } = req.body;

    try{
        const requestBook = await RequestBook.create({

            bookName,
            author,
            description,
            language
        });
        res.status(201).json(requestBook);
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in adding Request translation book",
            error:error.message,
        });
    }
};

//add product to wishlist (Update method)
exports.addToWishList = async (req, res) => {
    const productID = req.body.productID;
    const prName = req.body.pName;
    const pImg = req.body.pimg;
    const uPrice = req.body.unitPrice;
    const bookauthor = req.body.bAuthor;
    const description = req.body.about;
    const bookWeight = req.body.weight;
    const CustomerId = req.user._id;
  
    try {
      const wishlist = {
        productID: productID,
        proName: prName,
        proImg: pImg,
        unitPrice: uPrice,
        originalAuthor:bookauthor,
        aboutBook:description,
        weight:bookWeight
      };
  
      await CustomerModel.findOneAndUpdate(
        { _id: CustomerId },
        { $push: { wishList: wishlist } },
        {
          new: true,
          upsert: false,
        }
      );
      res.status(200).send({ status: "Product Added to Wishlist" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

//fetch wishlist from specific customer
exports.getWishlist = async (req, res) => {
    let cusId = req.user._id;
    await CustomerModel.findById(cusId)
      .then((customer) => {
        res
          .status(200)
          .send({ status: "Wishlist fetched", wishlist: customer.wishList });
      })
      .catch((err) => {
        res.status(500).send({
          status: "Error in fetching customer (Internal Server Error)",
          error: err.message,
        });
      });
  };

  //remove items from wishlist
exports.removeItemsFromWishlist = async (req, res) => {
    const itemId = req.body.id;
    try {
      const customer = req.user._id;
      await CustomerModel.updateOne(
        { _id: customer },
        { $pull: { wishList: { _id: itemId } } }
      );
  
      res.status(200).send({
        status: "product removed from the list",
      });
    } catch (error) {
      res.status(500).send({
        status: "Internal Server Error in wishlist item delete",
        error: error.message,
      });
    }
  };

  //add Review
  exports.createReview = async(req,res) => {
    const {
        proID,
        bName,
        rate,
        comments,
    } = req.body;
    const cusID = req.user._id;


    try{
        const review = await ReviewModel.create({
            productId:proID,
            customerId:cusID,
            bookName:bName,
            rating:rate,
            comment:comments
           
        });
        res.status(201).json(review);
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in adding Review for the book",
            error:error.message,
        });
    }
};

//edit Review
exports.updateReview = async (req, res) => {
    const {
        reviewId,
        productId,
        bookName,
        rating,
        comment,
    } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(reviewId))
      return res.status(404).send(`No review with id: ${reviewId}`);
  
    
  
    const updatedReview = {
      customerId: req.user._id,
      productId,
      bookName,
      rating,
      comment,
      _id:reviewId ,
    };
  
    try {
      let upReview = await  ReviewModel.findByIdAndUpdate(
        { _id: reviewId },
        updatedReview,
        {
          new: true,
          upsert: false,
          omitUndefined:true
        }
      );
      res.status(200).json({ status: "Review updated successfully", upReview });
    } catch (error) {
      res.status(500).json({ status: "Internal server error", error });
    }
  };


  //delete review
  exports.deleteReview = async (req, res) => {
    const { reviewId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(reviewId))
      return res.status(404).send(`No Review with id: ${reviewId}`);
  
    try {
      await ReviewModel.findByIdAndRemove(reviewId);
      res.status(200).json({ status: "Review deleted" });
    } catch (error) {
      res.status(500).json({ status: "Internal server error", error });
    }
  };

  //get Reviews
  exports.getReviews = async (req, res) => {
    await ReviewModel.find({ customerId: req.user._id })
      .populate("productId")
      .exec((error, reviews) => {
        if (error) {
          return res.status(400).json({ error });
        }
        res.status(200).json({ reviews });
      });
  };

// //invoice generation
// // IMAGE PATH
// let imgPath = path.resolve('img', 'Logo.png');
// // Function to encode file data to base64 encoded string
// function base64_encode(img) {
//   // read binary data
//   let png = fs.readFileSync(img);
//   // convert binary data to base64 encoded string
//   return new Buffer.from(png).toString('base64');
// };

// // DATA OBJECT
// let data = {
//   //"documentTitle": "RECEIPT", //Defaults to INVOICE
//   "currency": "LKR",
//   "taxNotation": "vat", //or gst
//   "marginTop": 25,
//   "marginRight": 25,
//   "marginLeft": 25,
//   "marginBottom": 25,
//   "logo": `${base64_encode(imgPath)}`, //or base64
//   //"logoExtension": "png", //only when logo is base64
//   "sender": {
//       "company": "Buy Me A Gradient",
//       "address": "Corso Italia 13",
//       "zip": "1234 AB",
//       "city": "Colombo",
//       "country": "Sri Lanka"
//       //"custom1": "custom value 1",
//       //"custom2": "custom value 2",
//       //"custom3": "custom value 3"
//   },
//   "client": {
//        "company": "Client Corp",
//        "address": "Clientstreet 456",
//        "zip": "4567 CD",
//        "city": "Colombo",
//        "country": "Sri Lanka"
//       //"custom1": "custom value 1",
//       //"custom2": "custom value 2",
//       //"custom3": "custom value 3"
//   },
//   "invoiceNumber": "2020.0001",
//   "invoiceDate": "05-01-2020",
//   "products": [
//       {
//           "quantity": "2",
//           "description": "Test1",
//           "tax": 6,
//           "price": 33.87
//       },
//       {
//           "quantity": "4",
//           "description": "Test2",
//           "tax": 21,
//           "price": 10.45
//       }
//   ],
//   "bottomNotice": "Thank you for Shopping with us"
// };

// // INVOICE PDF FUNCTION
// const invoicePdf = async ()=>{
//   //Create your invoice! Easy!

//     let result = await easyinvoice.createInvoice(data);
//     fs.writeFileSync(`./invoice/invoice${Date.now()}.pdf`, result.pdf, 'base64');

//   }

//   exports.getInvoice = async(req,res) => {
//     try{
//       invoicePdf();
//       res.status(201).json({status:"Invoice downloaded successfully"});
//     }catch(error){
//       res.status(500).json({
//         success: false,
//         desc: "Error getting invoice",
//         error: error.message,
//       });
//     }
//   };



