require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const adminRoutes = require("./routes/admin-routes");
const authRoutes = require("./routes/authentication-routes");
const customerRoutes = require("./routes/customer-routes");
const deliveryManagerRoutes = require("./routes/deliveryManager-routes");
const deliveryPersonRoutes = require("./routes/deliveryPerson-routes");
const guestRoutes = require("./routes/guest-routes");
const inventoryManagerRoutes = require("./routes/inventoryManager-routes");
const notificationRoutes = require("./routes/notification-routes");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_DEV_URI;

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connection Success");
  })
  .catch((err) => {
    console.log("Connection Failed - " + err);
  });

app.use("/matrix/api/admin", adminRoutes);
app.use("/matrix/api/auth", authRoutes);
app.use("/matrix/api/customer", customerRoutes);
app.use("/matrix/api/deliveryManager", deliveryManagerRoutes);
app.use("/matrix/api/deliveryPerson", deliveryPersonRoutes);
app.use("/matrix/api/guest", guestRoutes);
app.use("/matrix/api/inventoryManager", inventoryManagerRoutes);
app.use("/matrix/api/notification", notificationRoutes);

//event loop for server
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
