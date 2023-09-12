const express = require("express");
const Article = require("../models/Article");
const article_router = express.Router();

article_router.get("/", async (req, res) => {
	let articles = [];
	articles = await Article.find();
	return res.json(articles);
});

module.exports = article_router;
