const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

//@desc     Fetch all Products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (products) {
        res.json(products);
    } else {
        res.status(404).json({ message: "Products not found" });
    }
});

//@desc     Fetch a single product
//@route    GET /api/products/:id
//@access   Public
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

//@desc     Delete a product
//@route    DELETE /api/products/:id
//@access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: "Product Deleted" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

//@desc     Create a product
//@route    POST /api/products/
//@access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpeg",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description"
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        category,
        countInStock
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

module.exports = {
    getProducts,
    getProduct,
    deleteProduct,
    createProduct,
    updateProduct
};
