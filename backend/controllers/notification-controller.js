const NotificationModel = require("../models/notification-model");

exports.updateNotification = async (req, res) => {
  const { nID } = req.body;
  try {
    await NotificationModel.updateOne({ _id: nID }, { status: "read" });
    res.status(200).json({
      success: true,
      desc: "Notification status changed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateNotification in notification controller - " + error,
    });
  }
};

exports.deleteNotification = async (req, res) => {
  const  nID = req.params.id;
  try {
    await NotificationModel.deleteOne({ _id: nID });
    res.status(200).json({
      success: true,
      desc: "Notification removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deleteNotification in notification controller - " + error,
    });
  }
};
