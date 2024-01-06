const express = require("express");

const {
  createProducts,
  getAllProducts,
  deleteProducts,
  getUserProducts,
  search,
} = require("../controllers/products");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createProducts", authUser, createProducts);

router.get("/getAllProducts", authUser, getAllProducts);

router.delete("/deleteProducts/:id", authUser, deleteProducts);

router.get("/getUserProducts", authUser, getUserProducts);
router.post("/search/:searchTerm", authUser, search);

module.exports = router;
