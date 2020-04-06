# actionProject

In this project you can bid on an item which has a base amount and start and end time. In between that time you can bid on item.
For bidding you need to register first. you can bid multiple time on an item and just after the end time every bidder will get
mail foe every bidding. And winner alse will get the mail.


To run this project you need to run command npm start. for registering the user you need to hit the link "localhost:3000/register"
and you need to pass the json like.

{
	"email": "",
	"password": "",
	"fullName": ""
}
 
 Note  = Here email is unique.

For adding a Item to bid. you need to hit the url "localhost:3000/actionItem". and at a particular time only one bid can start and end.
and you need to pass the json.

{
	    "itemName": "",
      "itemDescription": "",
      "startTime": "",
      "endTime": "",
      "startingAmount": ,
      "imageURL": "

}

Note = Here itemName is unique. you need to choose the image file.

For bidding you need to hit the url "localhost:3000/bidding" and you need to pass the json.

{
	"itemName": "",
	"amount": ,
	"email": ""
}

Note = email should be register.

To Generate the mail you need to give your gmailid and password in user and pass keyword in scheduleMail.js file. and you have to turn on the less scurity for this gmailid by going this link https://myaccount.google.com/lesssecureapps to send the mail. 

