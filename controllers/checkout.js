const CheckOut = require("../models/Checkout");

exports.createCheckout = async (req, res) => {
  try {
    const checkout = await new CheckOut(req.body).save();

    res.json(checkout);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
