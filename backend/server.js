const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const ProductRoutes = require("./routes/ProductRoutes.js");
const UserRoutes = require("./routes/UserRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const UploadRoutes = require("./routes/uploadRoutes");

//Setup dotenv file
dotenv.config();

connectDB();

const app = express();

//Setup body parser to accept json in req.body
app.use(express.json());

// PRODUCT ROUTES
app.use("/api/products", ProductRoutes);

// USER ROUTES
app.use("/api/users", UserRoutes);

// Order ROUTES
app.use("/api/orders", OrderRoutes);

//Upload ROUTES
app.use("/api/uploads", UploadRoutes);

app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

//Use uploads folder as static for file uploads
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT || 5000, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, on port ${process.env.PORT}...`
    );
});
