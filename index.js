const express = require('express');
const newsRouter = require('./routes/newsRouter');

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/news', newsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 
