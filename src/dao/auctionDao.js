const User = require("../../models/user");
const AuctionItem = require("../../models/auckionItem");
const Bid = require("../../models/bid");

class AuctionDAO {
  static async saveUser(UserInfo) {
    const user = new User({
      email: UserInfo.email,
      password: UserInfo.password,
      fullName: UserInfo.fullName,
    });

    let result = await user.save().catch((err) => {
      return false;
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  static async saveAuctionItem(auctionItemInfo) {
    const item = AuctionItem({
      itemName: auctionItemInfo.itemName,
      itemDescription: auctionItemInfo.itemDescription,
      startTime: auctionItemInfo.startTime,
      endTime: auctionItemInfo.endTime,
      startingAmount: auctionItemInfo.startingAmount,
      winner: auctionItemInfo.winner,
      imageURL: auctionItemInfo.imageURL,
    });
    let result = await item.save().catch((err) => {
      return false;
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  static async saveBid(bidInfo) {
    let bid = new Bid({
      itemName: bidInfo.itemName,
      itemId: bidInfo.itemId,
      amount: bidInfo.amount,
      user: bidInfo.user,
      userEmail: bidInfo.userEmail,
    });
    let result = await bid.save().catch((err) => {
      return false;
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = AuctionDAO;
