const bcrypt = require("bcrypt");
const auctionDao = require("../dao/auctionDao");
const Bid = require("../../models/bid");
const AuctionItem = require("../../models/auckionItem");
const User = require("../../models/user");
const sendEmails = require("./scheduleEmail");

class AuctionController {
  static async postAuctionItem(req, res) {
    let url = req.protocol + "://" + req.get("host");
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    const auctionItemInfo = {
      itemName: req.body.itemName,
      itemDescription: req.body.itemDescription,
      startingAmount: Number(req.body.startingAmount),
      winner: "",
      imageURL: url + "/images/" + req.file.filename,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };

    let result = await auctionDao.saveAuctionItem(auctionItemInfo);
    if (result) {
      sendEmails(auctionItemInfo.endTime, auctionItemInfo);
      res.status(200).json({
        message: "Item Addedd",
      });
    } else {
      res.status(404).json({
        message: "Error Occured",
      });
    }
  }

  static async registerUser(req, res) {
    const hash = await bcrypt.hash(req.body.password, 10);
    const userInfo = {
      email: req.body.email,
      password: hash,
      fullName: req.body.fullName,
    };

    const result = await auctionDao.saveUser(userInfo);
    if (result) {
      res.status(200).json({
        message: "user created",
      });
    } else {
      res.status(404).json({
        message: "Error Occured",
      });
    }
  }

  static async postBid(req, res) {
    let result = await AuctionItem.findOne({ itemName: req.body.itemName });

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        message: "User is not Authorized..Please Register",
      });
    }

    if (req.body.amount < result.startingAmount) {
      res.status(500).json({
        message: "your bidding amount is less than base aamount",
      });
    }

    let currentDate = new Date();
    let bid = {
      itemName: req.body.itemName,
      itemId: result._id,
      amount: req.body.amount,
      user: user._id,
      userEmail: req.body.email,
    };
    if (
      currentDate.getTime() > result.startTime.getTime() &&
      currentDate.getTime() < result.endTime.getTime()
    ) {
      let result = auctionDao.saveBid(bid);

      if (result) {
        res.status(200).json({
          message: "Your Bid Added",
        });
      } else {
        res.status(404).json({
          message: "Bid Not Found",
        });
      }
    } else {
      res.status(404).json({
        message: "Bid is not available in this time",
      });
    }
  }
}

module.exports = AuctionController;
