const mongoose = require("mongoose");
const dotenv = require("dotenv");

const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Empty the database before inserting data
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        // Insert the users into the model and get the admin user
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // Add the admin user to the "user" field of the Product model
        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUser
            };
        });

        // Insert the updated products array with admin user into the database
        await Product.insertMany(sampleProducts);

        console.log("Data imported");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Empty the database
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        console.log("Data destroyed");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
