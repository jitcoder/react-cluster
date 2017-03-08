// built in imports
import 'babel-core/register';
import 'babel-polyfill';

import workerFarm from 'worker-farm';
import express from 'express';

const workers = workerFarm(require.resolve('./worker'));


const app = express();

app.get('products/:id', (req, res) => {
  res.sendFile(`./public/products/${req.params.id}.html`);
});

app.get('/generate', (req, res) => {
  const products = require('./data/products.json');
  const results = [];
  for (let i = 0; i < products.length; i++){
    workers(product, (err, result) => {
      results.push(result);
    });
  }

  res.send(results);
})

app.listen(3000);