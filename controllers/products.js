const Product = require("../models/Product");

const User = require("../models/User");

exports.createProducts = async (req, res) => {
  try {
    const product = await new Product(req.body).save();

    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // to the newest to the oldest the way post come
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);

    res.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const id = req.query.id;

    // Assuming Post model has a field 'user' which stores the user's ID
    const userProducts = await Product.find({ user: id }).sort({
      createdAt: -1,
    });

    res.json(userProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const regexTerm = new RegExp(searchTerm, "i");

    const results = await Product.find({
      $or: [
        { text: { $regex: regexTerm } },
        { price: { $regex: regexTerm } },
        { product: { $regex: regexTerm } },
      ],
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
