const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "e-mail is required"],
      trim: true,
      text: true,
      unique: [true, "email address already exists"],
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
