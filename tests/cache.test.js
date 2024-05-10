const request = require('supertest');
const app = require('../index');
const { cache, invalidateCachedArticle } = require('../utils/cacheUtils');

// Mock data
const mockNewsArticles = require('../data/mockNewsArticles');

describe('Caching Tests', () => {
  beforeAll(() => {
    // Setup code that needs to run once before all tests
  });

  beforeEach(() => {
    // Setup code that needs to run before each test
    cache.flushAll();
  });

  afterAll(() => {
    // Teardown code that needs to run once after all tests
  });

  afterEach(() => {
    // Teardown code that needs to run after each test
  });

  describe('Cache Operations', () => {
    // Test to ensure that a cached article is returned
    test('Cached Article is Returned', async () => {
      const articleId = '1';
      cache.set(`article_${articleId}`, mockNewsArticles[0]);

      const response = await request(app).get(`/news/${articleId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(articleId);
      expect(response.body.title).toBe(mockNewsArticles[0].title);
      expect(response.header['x-cache']).toBe('hit');
    });

    // Test to ensure that a new article is cached
    test('New Article is Cached', async () => {
      const articleId = '1';

      const response = await request(app).get(`/news/${articleId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(articleId);
      expect(response.header['x-cache']).toBe('miss');

      const cachedArticle = cache.get(`article_${articleId}`);
      expect(cachedArticle).toBeTruthy();
    });

    // Test to ensure that a cached article is invalidated
    test('Cached Article is Invalidated', async () => {
      const articleId = '1';
      cache.set(`article_${articleId}`, mockNewsArticles[0]);

      invalidateCachedArticle(articleId);

      const response = await request(app).get(`/news/${articleId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(articleId);
      expect(response.header['x-cache']).toBe('miss');
    });
  });

  // Test to ensure cache miss for a non-existent article
  test('Cache Miss for Non-existent Article', async () => {
    const nonExistentArticleId = '999';

    const response = await request(app).get(`/news/${nonExistentArticleId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Article not found');

    const cachedArticle = cache.get(`article_${nonExistentArticleId}`);
    expect(cachedArticle).toBeFalsy();
  });

// Test to ensure cache expiration
test('Cache Expiration', async () => {
  const articleId = '1';
  cache.set(`article_${articleId}`, mockNewsArticles[0], 1); // Cache with 1-second TTL

  // Wait for TTL to expire
  await new Promise(resolve => setTimeout(resolve, 1100));

  // Try fetching the article again
  const response = await request(app).get(`/news/${articleId}`);

  // Verify that the response indicates cache miss
  expect(response.status).toBe(200);
  expect(response.header['x-cache']).toBe('miss');

  // Check if the article is not cached after expiration
  const cachedArticle = cache.get(`article_${articleId}`);
  expect(cachedArticle).toBeTruthy();
});
});
