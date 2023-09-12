const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	email: String,
	type: {
		type: String,
		index: true
	},
	message: String,
});

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
