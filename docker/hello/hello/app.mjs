import express from 'express';

import connectToDatabase from './helpers.mjs'

const app = express();

app.get('/', (req, res) => {
  res.send('<h2>Xin chào lớp K44!</h2><i>Chúc các bạn thành công<i>');
});

await connectToDatabase();

app.listen(3000);
