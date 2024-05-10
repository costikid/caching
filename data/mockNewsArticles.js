const NewsArticle = require('../models/NewsArticle');

const mockNewsArticles = [
  new NewsArticle(
    '1',
    'Title 1',
    'Subtitle 1',
    'Paragraph 1',
    'Author 1',
    new Date('2024-05-01')
  ),
  new NewsArticle(
    '2',
    'Title 2',
    'Subtitle 2',
    'Paragraph 2',
    'Author 2',
    new Date('2024-04-28')
  ),
];

module.exports = mockNewsArticles;
