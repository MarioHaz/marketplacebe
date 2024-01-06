const express = require("express");

const { createCheckout } = require("../controllers/checkout");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createCheckout", authUser, createCheckout);

module.exports = router;
