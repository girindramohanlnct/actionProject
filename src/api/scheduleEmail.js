const scheduler = require("node-schedule");
const nodemailer = require("nodemailer");
const Bid = require("../../models/bid");

async function sendEmali(endTime, auctionItemInfo) {
  var j = scheduler.scheduleJob(
    {
      year: endTime.getFullYear(),
      month: endTime.getMonth(),
      date: endTime.getDate(),
      hour: endTime.getHours(),
      minute: endTime.getMinutes(),
    },
    function () {
      let itemName = auctionItemInfo.itemName;
      let bids;
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "girindramohan0@gmail.com",
          pass: "0000852217",
        },
      });
      Bid.find({ itemName: itemName }, (err, documents) => {
        documents.forEach((item) => {
          transporter.sendMail(
            {
              to: item.userEmail,
              from: "girindramohan0@gmail.com",
              subject: "auction",
              text: "You Have bidded in the auction ",
              html: `<h3>hi</h3><br><h5> you have bidded in the auction of "${item.itemName}" with amount "${item.amount}"</h5><br><br><h5>Thanks and Regards</h5>`,
            },
            (err, info) => {
              if (err) {
                // console.log(err);
              } else {
                // console.log("mail ", info);
              }
            }
          );
        });
      });
      let winner = Bid.find({ itemName: itemName })
        .sort({ amount: -1 })
        .limit(1);
      winner.then((w) => {
        transporter.sendMail(
          {
            to: w[0].userEmail,
            from: "girindramohan0@gmail.com",
            subject: "auction",
            text: "You Have bidded in the auction ",
            html: `<h3>hi</h3><br><h5> you are the winner of auction of "${w[0].itemName}" with amount "${w[0].amount}"</h5>
            <br><br><h5>Thanks and Regards</h5>
            `,
          },
          (err, info) => {
            if (err) {
              //console.log(err);
            } else {
              //console.log("mail ", info);
            }
          }
        );
      });

      console.log("time for tea");
    }
  );
}

module.exports = sendEmali;
