const express = require("express");
const Faq = require("../models/Faq");
const faq_router = express.Router();

faq_router.get("/", async (req, res) => {
	// const faq = await Faq.find();
	// return res.json({ faq });
	let FAQs = [];
	FAQs = await Faq.find();
	res.json(FAQs);
});

module.exports = faq_router;
