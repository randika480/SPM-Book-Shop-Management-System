const DeliveryManagerModel = require("../models/deliveryManager-model");
const bcrypt = require("bcryptjs");
const DeliveryCost = require("../models/deliveryCost-model");
const FAQ = require("../models/faq-model");
const ContactUs = require("../models/contactUs-model");
const sendEmail = require("../utils/SendEmail");
const DeliveryPerson = require("../models/deliveryPerson-model");
const Order = require("../models/order-model");

/* --------------------------------------------------delivery cost management-------------------------------------------------- */
//add DeliveryCost
exports.addRailwayCost = async (req, res) => {
  const { destination, cost } = req.body;

  try {
    const exisitingrailway = await findrailwayBydestination(destination, res);
    if (exisitingrailway) {
      res.status(400).json({
        desc: "railway already exist - Please check again",
      });
    } else {
      const RailwayData = {
        destination,
        cost,
      };
      const newrailCost = await DeliveryCost.findOneAndUpdate(
        { _id: "61254903d7838a311450fee9" },
        { $push: { traincost: RailwayData } },
        {
          new: true,
        }
      );

      res.status(201).json({
        newrailCost,
        desc: "New Railway Cost added",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in railwayCost",
    });
  }
};

const findrailwayBydestination = async (destination, res) => {
  try {
    const exisitingrailway = await DeliveryCost.findOne({
      "traincost.destination": destination,
    });
    return exisitingrailway;
  } catch (error) {
    res.status(422).json({
      error,
      desc: "Error occurred in exisitingrailway",
    });
  }
};

//Edit train cost
exports.editRailwayCost = async (req, res) => {
  let { railwayID, destination, cost } = req.body;
  if (!destination) {
    destination = undefined;
  }
  if (!cost) {
    cost = undefined;
  }

  try {
    const RailwayData = await DeliveryCost.findOneAndUpdate(
      { "traincost._id": railwayID },
      {
        $set: {
          "traincost.$.destination": destination,
          "traincost.$.cost": cost,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );

    res
      .status(200)
      .json({ success: true, desc: "Railway Cost Data Updated", RailwayData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in editSpeaker controller-" + error,
    });
  }
};

// delete
exports.deleteRailwayCost = async (req, res) => {
  const { railwayID } = req.body;
  console.log(req.body);
  try {
    const RailwayData = await DeliveryCost.updateOne(
      { _id: "61254903d7838a311450fee9" },
      { $pull: { traincost: { _id: railwayID } } },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ success: true, desc: "Railway Cost Data deleted", RailwayData });
    console.log("sucess");
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in railwayCost controller-" + error,
    });
  }
};

//Retreive  cost data
exports.getCost = async (req, res) => {
  try {
    const Cost = await DeliveryCost.findById("61254903d7838a311450fee9");
    res.send(Cost);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in railwayCost",
    });
  }
};

//Edit Retail cost
exports.editRetailCost = async (req, res) => {
  let { retailID, provincename, cost } = req.body;
  if (!provincename) {
    provincename = undefined;
  }
  if (!cost) {
    cost = undefined;
  }

  try {
    const RailwayData = await DeliveryCost.findOneAndUpdate(
      { "retailcost._id": retailID },
      {
        $set: {
          "retailcost.$.provincename": provincename,
          "retailcost.$.cost": cost,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );

    res
      .status(200)
      .json({ success: true, desc: "Retail Cost Data Updated", RailwayData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in edit bulk controller-" + error,
    });
  }
};

//Edit bulk cost
exports.editBulkCost = async (req, res) => {
  let { bulkID, provincename, cost } = req.body;
  if (!provincename) {
    provincename = undefined;
  }
  if (!cost) {
    cost = undefined;
  }

  try {
    const bulkData = await DeliveryCost.findOneAndUpdate(
      { "bulkcost._id": bulkID },
      {
        $set: {
          "bulkcost.$.provincename": provincename,
          "bulkcost.$.cost": cost,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );

    res
      .status(200)
      .json({ success: true, desc: "bulk Cost Data Updated", bulkData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in edit bulk controller-" + error,
    });
  }
};

//edit presentages
exports.editprecentage = async (req, res) => {
  let { bulkexpressprecentage, retailexpressprecentage } = req.body;

  if (!bulkexpressprecentage) {
    bulkexpressprecentage = undefined;
  }
  if (!retailexpressprecentage) {
    retailexpressprecentage = undefined;
  }

  try {
    const RailwayData = await DeliveryCost.findOneAndUpdate(
      { _id: "61254903d7838a311450fee9" },
      {
        $set: {
          bulkexpressprecentage: bulkexpressprecentage,
          retailexpressprecentage: retailexpressprecentage,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );

    res
      .status(200)
      .json({ success: true, desc: "precentaget Data Updated", RailwayData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in precentage controller-" + error,
    });
  }
};
/* --------------------------------------------------FAQ management -------------------------------------------------- */
//add category
exports.addcategory = async (req, res) => {
  const { category, faq } = req.body;
  console.log(req.body);
  try {
    const DocData = await FAQ.create({
      ...req.body,
    });
    res.status(201).json({
      DocData,
      desc: "New category added",
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in category",
    });
  }
};

//Retreive category
exports.getAllCategory = async (req, res) => {
  try {
    const DocData = await FAQ.find();
    res.status(200).send({ FAQ: DocData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching getAllCategory -" + err,
    });
  }
};

//edit category
exports.editCategory = async (req, res) => {
  let { CID, category } = req.body;

  if (!category) {
    category = undefined;
  }

  try {
    const CatagoryData = await FAQ.findOneAndUpdate(
      { _id: CID },
      {
        $set: {
          category: category,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );

    res
      .status(200)
      .json({ success: true, desc: "category Data Updated", CatagoryData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in category controller-" + error,
    });
  }
};

//delete category
exports.deleteCategory = async (req, res) => {
  const { CID } = req.body;
  console.log(req.body);
  try {
    await FAQ.deleteOne({ _id: CID });
    res.status(200).json({
      success: true,
      desc: "Category removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deleteCategory in Category controller - " + error,
    });
  }
};

//add question and answer
exports.addQA = async (req, res) => {
  const { CID, question, answer } = req.body;

  try {
    const faqdata = {
      question,
      answer,
    };
    const DocData = await FAQ.findOneAndUpdate(
      { _id: CID },
      { $push: { faq: faqdata } },
      {
        new: true,
      }
    );

    res.status(201).json({
      DocData,
      desc: "New Q and A  added",
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in Q and A",
    });
  }
};

//Edit question and answer
exports.editQA = async (req, res) => {
  let { QAID, question, answer } = req.body;
  if (!question) {
    question = undefined;
  }
  if (!answer) {
    answer = undefined;
  }

  try {
    const DocData = await FAQ.findOneAndUpdate(
      { "faq._id": QAID },
      {
        $set: {
          "faq.$.question": question,
          "faq.$.answer": answer,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );

    res
      .status(200)
      .json({ success: true, desc: "Q nad A Data Updated", DocData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in editQA controller-" + error,
    });
  }
};

//Delete question and answer
exports.deleteQA = async (req, res) => {
  const { CID, QAID } = req.body;
  console.log(req.body);
  try {
    const DocData = await FAQ.updateOne(
      { _id: CID },
      { $pull: { faq: { _id: QAID } } }
    );
    res
      .status(200)
      .json({ success: true, desc: "Q and A Data deleted", DocData });
    console.log("sucess");
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deleteQA controller-" + error,
    });
  }
};
/* --------------------------------------------------Customer InquiriesManagement -------------------------------------------------- */
//add customer inquiry
exports.addCusInquiry = async (req, res) => {
  const { email, mobileNumber, department, description, reply } = req.body;
  console.log(req.body);
  try {
    const DocData = await ContactUs.create({
      ...req.body,
    });
    res.status(201).json({
      DocData,
      desc: "New inquiry added",
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in inquiry",
    });
  }
};

//retrieve customer inquiries
exports.getAllInquiries = async (req, res) => {
  await ContactUs.find()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

//send email and save reply
exports.addReply = async (req, res) => {
  const { InquirID, replynote, email } = req.body;
  console.log(req.body);
  try {
    const replydata = {
      replynote,
    };

    const DocData = await ContactUs.findOneAndUpdate(
      { _id: InquirID },
      { $push: { reply: replydata } },
      {
        new: true,
      }
    );
    console.log(email);
    sendEmail({
      to: email,
      subject: `investigation result of #${InquirID} Inquiry ID`,
      text: `<h5>Dear sir/madam,</h5>
      <p>
      Thank you for feedback about APURU POTH! <br />
      ${replynote}
      <br />
      Thank you.
      </p>
      `,
    });

    res.status(201).json({
      DocData,
      desc: "reply added",
    });
  } catch (error) {
    res.status(500).send({
      status: "Internal Server Error in new reply create",
      error: error.message,
    });
  }
};
/* --------------------------------------------------Delivery person Management -------------------------------------------------- */
//Retreive all delivery DeliveryPerson
exports.getAllDeliveryPerson = async (req, res) => {
  try {
    const DocData = await DeliveryPerson.find();
    res.status(200).send({ DeliveryPerson: DocData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching getAllDeliveryPerson -" + err,
    });
  }
};

//edit delivery person
exports.editDeliveryPerson = async (req, res) => {
  let { DPID, username, email, phone, password } = req.body;

  if (!username) {
    username = undefined;
  }
  if (!email) {
    email = undefined;
  }
  if (!phone) {
    phone = undefined;
  }
  if (!password) {
    password = undefined;
  }
  let existingEmail = await findDPEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const salt = await bcrypt.genSalt(10);
      const npassword = await bcrypt.hash(password, salt);

      const CatagoryData = await DeliveryPerson.findOneAndUpdate(
        { _id: DPID },
        {
          $set: {
            username: username,
            email: email,
            phone: phone,
            password: npassword,
          },
        },
        {
          new: true,
          upsert: false,
          omitUndefined: true,
        }
      );

      res
        .status(200)
        .json({ success: true, desc: "category Data Updated", CatagoryData });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in category controller-" + error,
      });
    }
  }
};

// find duplicated user emails before register new delivery person
const findDPEmailDuplicates = async (email, res) => {
  try {
    const existingAccount = await DeliveryPerson.findOne({ email: email });
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

// delete delivery person
exports.deleteDeliveryPerson = async (req, res) => {
  const { DPID } = req.body;
  console.log(req.body);
  try {
    await DeliveryPerson.deleteOne({ _id: DPID });
    res.status(200).json({
      success: true,
      desc: "DeliveryPerson removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc:
        "Error in DeliveryPerson in deleteDeliveryPerson controller - " + error,
    });
  }
};

/* --------------------------------------------------Order Management -------------------------------------------------- */
//get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const DocData = await Order.find();
    res.status(200).send({ Order: DocData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching getAllOrders -" + error,
    });
  }
};
//update delivery status
exports.assignDp = async (req, res) => {
  let { orderID, dpID, deliveryStatus } = req.body;

  try {
    const DocData = await Order.findOneAndUpdate(
      { _id: orderID },
      {
        $set: {
          deiveryPersonID: dpID,
          deliveryStatus: deliveryStatus,
        },
      }
    );
    res
      .status(200)
      .json({ success: true, desc: "order status Updated", DocData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in assignDp controller-" + error,
    });
  }
};

//dp add order details
exports.orderAdded = async (req, res) => {
  const {
    dpID,
    orderID,
    buyerID,
    deliveryAddress,
    deliveryStatus,
    billAmount,
  } = req.body;

  try {
    const data = {
      orderID,
      buyerID,
      deliveryAddress,
      deliveryStatus,
      billAmount,
    };
    const DocData = await DeliveryPerson.findOneAndUpdate(
      { _id: dpID },
      { $push: { deliveryHistory: data } },
      {
        new: true,
      }
    );

    res.status(201).json({
      DocData,
      desc: "New order  added",
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in orderAdded",
    });
  }
};
