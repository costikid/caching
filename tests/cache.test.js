const request = require('supertest');
const app = require('../index');
const { cache, invalidateCachedArticle } = require('../utils/cacheUtils');

// Mock data
const mockNewsArticles = require('../data/mockNewsArticles');

describe('Caching Tests', () => {
  beforeEach(() => {
    // Clear cache before each test
    cache.flushAll();
  });

  afterAll(() => {
    // Close any resources or connections after all tests
  });

  test('Cached Article is Returned', async () => {
    const articleId = '1';

    // Cache the article manually
    cache.set(`article_${articleId}`, mockNewsArticles[0]);

    const response = await request(app).get(`/news/${articleId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(articleId);
    expect(response.body.title).toBe(mockNewsArticles[0].title);
    expect(response.header['x-cache']).toBe('hit');
  });

  test('New Article is Cached', async () => {
    const articleId = '1';

    const response = await request(app).get(`/news/${articleId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(articleId);
    expect(response.header['x-cache']).toBe('miss');

    // Check if the article is cached after the first request
    const cachedArticle = cache.get(`article_${articleId}`);
    expect(cachedArticle).toBeTruthy();
  });

  test('Cached Article is Invalidated', async () => {
    const articleId = '1';

    // Cache the article manually
    cache.set(`article_${articleId}`, mockNewsArticles[0]);

    // Invalidate the cached article
    invalidateCachedArticle(articleId);

    const response = await request(app).get(`/news/${articleId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(articleId);
    expect(response.header['x-cache']).toBe('miss');
  });
});
