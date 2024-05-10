const NodeCache = require('node-cache');

// Initialize cache with a default TTL (Time To Live) of 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

// Function to generate cache key for a news article
const generateCacheKey = (articleId) => {
  return `article_${articleId}`;
};

// Function to invalidate a cached news article by ID
const invalidateCachedArticle = (articleId) => {
  const cacheKey = generateCacheKey(articleId);
  cache.del(cacheKey);
};

module.exports = {
  cache,
  generateCacheKey,
  invalidateCachedArticle
};
