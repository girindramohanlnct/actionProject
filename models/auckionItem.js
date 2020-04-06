const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const auctionItem = mongoose.Schema({
  itemName: { type: String, required: true, unique: true },
  itemDescription: { type: String, unique: true, sparse: true },
  startTime: { type: Date, unique: true },
  endTime: { type: Date, required: true },
  startingAmount: { type: Number, required: true },
  winner: { type: String },
  imageURL: { type: String },
});

auctionItem.plugin(uniqueValidator);
module.exports = mongoose.model("AuctionItem", auctionItem);
