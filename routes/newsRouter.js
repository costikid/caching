const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();


// Route to get a news article by ID
router.get('/:articleId', newsController.getNewsArticleById);


module.exports = router;
