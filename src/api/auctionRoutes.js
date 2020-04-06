const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("./auctionController");

router.post("/actionItem", controller.postAuctionItem);
router.post("/register", controller.registerUser);
router.post("/bidding", controller.postBid);

module.exports = router;
