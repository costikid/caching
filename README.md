# Purpose

Writing tests to for key caching functionalities using an express API with mock data of news articles

# Tests

## Cached Article is Returned

1. This test ensures that when an article is manually cached before the request, the cached article is returned correctly.
2. It sets up the cache by manually caching an article with ID '1'.
3. It then makes a request to the endpoint for the same article.
4. It checks if the response status is 200, the returned article ID matches the requested ID, the title of the returned article matches the title of the cached article, and the x-cache header in the response is 'hit', indicating that the article was served from the cache.

## New Article is cached

1. This test checks if a new article is cached when it's requested for the first time and not found in the cache.
2. It makes a request to the endpoint for an article with ID '1'.
3. It checks if the response status is 200, the returned article ID matches the requested ID, and the x-cache header in the response is 'miss', indicating that the article was not served from the cache.
4. It also verifies that the article is cached after the first request by checking if it exists in the cache.

## Cached Article is Invalidated:

When data changes or expires, it should be removed from the cache to ensure that subsequent requests fetch the latest data from the data source. This process is known as cache invalidation. The test verifies that your cache invalidation mechanism works as expected by ensuring that a cached article is no longer served after it's invalidated.

1. This test ensures that a cached article is invalidated when it's manually cached and then invalidated before the request.
2. It sets up the cache by manually caching an article with ID '1'.
3. It invalidates the cached article.
4. It makes a request to the endpoint for the same article.
5. It checks if the response status is 200, the returned article ID matches the requested ID, and the x-cache header in the response is 'miss', indicating that the article was not served from the cache.

# Tech stack

1. [Jest](https://jestjs.io/) as a test runner
2. [Supertest](https://www.npmjs.com/package/supertest) as a testing library
3. [ExpressJs](https://expressjs.com/) for the backend API

# To do

1. Implement a function to generate cache keys based on query parameters and cache articles accordingly. Test by making requests with different query parameters and ensuring that articles are cached based on those parameters.
2. Implement a mechanism to invalidate cached articles based on certain events (e.g., article updates, deletions). Test by updating or deleting articles and ensuring that the cache is invalidated accordingly.
