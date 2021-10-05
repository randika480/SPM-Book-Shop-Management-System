const DeliveryPerson = require("../models/deliveryPerson-model");

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

exports.editstatus = async (req, res) => {
  let { orderID, deliveryStatus } = req.body;

  try {
    const DocData = await DeliveryPerson.findOneAndUpdate(
      { "deliveryHistory.orderID": orderID },
      {
        $set: {
          "deliveryHistory.$.deliveryStatus": deliveryStatus,
        },
      }
    );

    res
      .status(200)
      .json({ success: true, desc: "status Data Updated", DocData });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in editstatus controller-" + error,
    });
  }
};
