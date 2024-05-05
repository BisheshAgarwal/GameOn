const express = require("express");
const dotenv = require("dotenv");
const path = require("path")

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

const dirname = path.resolve()
//Use uploads folder as static for file uploads
app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static(path.join(dirname, "/frontend/build")))

    // any route that is not api will be redirected to index.html
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API is running....")
    })
}

app.listen(process.env.PORT || 5000, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, on port ${process.env.PORT}...`
    );
});
