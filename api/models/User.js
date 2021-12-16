const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 4,
      required: true,
    },
    members: Array,
    admin_key: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
