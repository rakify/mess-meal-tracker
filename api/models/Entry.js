const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    user: String,
    date: {
      type: Number,
      unique: false,
    },
    spent: Number,
    reserved: Number,
    by: String,
    meals: Object,
    totalMeals: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);
