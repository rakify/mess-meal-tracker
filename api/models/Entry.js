const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    user: String,
    date: {
      type: Number,
      unique: false
    },
    cost: Number,
    costBy: String,
    meals: Object,
    totalMeals: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);
