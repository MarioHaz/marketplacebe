const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const checkOutSchema = new mongoose.Schema(
  {
    checkout: [
      {
        count: {
          type: Number,
        },
        productId: {
          type: ObjectId,
        },
      },
    ],
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CheckOut", checkOutSchema);
