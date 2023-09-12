const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");
const message_router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
	port: 465, // Port for SMTP (usually 465)
	secure: true, // Usually true if connecting to port 465
	auth: {
		user: process.env.GMAIL, // Your email address
		pass: process.env.GMAIL_PASS, // Password (for gmail, your app password)
		// ⚠️ For better security, use environment variables set on the server for these values when deploying
	},
});

const cacheKey = "all-messages";

message_router.get("/", async (req, res) => {
	let allMessages = [];
	const cacheKey = "all-messages";
	const messages = await Message.find();
	console.log(messages);
	for (let i of messages) {
		const user = await User.find({ email: i.email });
		const temp = {
			message_details: i,
			user_details: user[0],
		};
		allMessages.push(temp);
	}
	res.json(allMessages);
});

message_router.delete("/:id", async (req, res) => {
	await Message.deleteOne({ _id: req.params.id });
	const message = "Message deleted successfully";
	console.log(message);
	res.json({ message });
});

message_router.post("/", async (req, res) => {
	const message = new Message({
		email: req.body.email,
		fullname: req.body.fullname,
		message: req.body.message,
		type: req.body.type,
	});
	await message.save();

	console.log("Message created and sent to Admin Portal");
	const messageinfo = "Message created and sent to Admin Portal";
	console.log(messageinfo);
	res.json({ messageinfo });
});

message_router.get("/:id", async (req, res) => {
	console.log(req.params.id);
	const msg = await Message.find({ _id: req.params.id });
	// console.log(`req recieved ${msg}`)
	// console.log(msg[0])
	res.json({ message: msg });
	// res.send('Done')
});

message_router.get("/:id", async (req, res) => {
	console.log(req.params.id);
	const msg = await Message.find({ _id: req.params.id });
	console.log(msg[0]);
	res.json({ message: msg });
});

message_router.post("/reply", async (req, res) => {
	const messagevalue = req.body.replyValue;
	const email = req.body.email;
	console.log(email);
	console.log(messagevalue);

	res.send("reply sent");
});

module.exports = message_router;
