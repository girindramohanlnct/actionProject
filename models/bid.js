const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bid = mongoose.Schema({
  itemName: { type: String, required: true },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuctionItem",
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  userEmail: { type: String, required: true }
});

bid.plugin(uniqueValidator);
module.exports = mongoose.model("Bid", bid);
