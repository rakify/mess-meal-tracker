const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    user: String,
    date: {
      type: Number,
      unique: false,
    },
    spent: {
      type: Number,
      default: 0,
    },
    reserved: {
      type: Number,
      default: 0,
    },
    by: String,
    meals: Object,
    totalMeals: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);
