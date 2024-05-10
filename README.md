# Intro

Caching is crucial for improving the performance and responsiveness of web applications. By storing frequently accessed data in memory or on disk, caching reduces the need to repeatedly fetch data from the database or external APIs, resulting in faster response times. Learn more [here](https://www.cloudflare.com/learning/cdn/what-is-caching/)

# Purpose

Writing tests to for key caching functionalities using an express API with mock data of news articles

# Tests

1. Cached Article is Returned when requested: This validation is crucial for guaranteeing the reliability and effectiveness of the caching mechanism in storing and managing data.

2. New Article is Cached upon first request: This validation is essential for maintaining consistent performance and responsiveness in serving news articles.

3. Cached Article is Invalidated upon request: This validation helps maintain data consistency and accuracy by ensuring that stale or outdated content is removed from the cache promptly.

4. Cache miss when attempting to retrieve a non-existent article: This validation helps prevent unnecessary cache storage and ensures that users receive accurate error messages for non-existent content.

5. Cache Expiration: Validates that the cache expires after the specified time period.

# Modularity

## What is the Cache utils file?

Initializes the cache (NodeCache) directly and defines utility functions (generateCacheKey and invalidateCachedArticle) related to cache key generation and invalidation.

# Tech stack

1. [Jest](https://jestjs.io/) as a test runner
2. [Supertest](https://www.npmjs.com/package/supertest) as a testing library
3. [ExpressJs](https://expressjs.com/) for the backend API
4. [NodeCache](https://www.npmjs.com/package/node-cache) for caching

# To do

1. Implement a mechanism to invalidate cached articles based on certain events (e.g., article updates, deletions). Test by updating or deleting articles and ensuring that the cache is invalidated accordingly.
