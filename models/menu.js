const mongoose = require("mongoose");

const Menuall = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    required: true,
      enum: ["sweet", "sour", "spicy"],
      //mtlb yahi value hoga jo hoga wrna nai hoga
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredient: {
    type: [String],
    default: 0,
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Menu", Menuall);
