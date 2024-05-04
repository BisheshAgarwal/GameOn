const express = require("express");
const {
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProduct
} = require("../controllers/ProductController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
    .route("/:id")
    .get(getProduct)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

module.exports = router;
