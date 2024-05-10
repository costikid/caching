const { cache, generateCacheKey } = require('../utils/cacheUtils');
const mockNewsArticles = require('../data/mockNewsArticles');

// Function to fetch a news article by ID
const fetchNewsArticleById = (articleId) => {
  // Simulate fetching from database or external API
  return mockNewsArticles.find(article => article.id === articleId);
};

// Controller function to get a news article by ID
const getNewsArticleById = (req, res) => {
  const { articleId } = req.params;
  const cacheKey = generateCacheKey(articleId);

  // Check if article is cached
  const cachedArticle = cache.get(cacheKey);
  if (cachedArticle) {
    console.log('Serving from cache');
    res.set('x-cache', 'hit'); // Set x-cache header
    return res.json(cachedArticle);
  }

  // Fetch article from data source
  const article = fetchNewsArticleById(articleId);

  if (article) {
    // Cache article
    cache.set(cacheKey, article);
    res.set('x-cache', 'miss'); // Set x-cache header
    res.json(article);
  } else {
    res.status(404).json({ error: 'Article not found' });
  }
};

module.exports = {
  getNewsArticleById,
};
