// built in imports
import 'babel-core/register';
import 'babel-polyfill';

import workerFarm from 'worker-farm';
import express from 'express';
import jade from 'jade';
import Product from './components/product';
import * as path from 'path';

const workers = workerFarm(require.resolve('./worker'));
const template = jade.compileFile(path.resolve(__dirname, '../public/template.jade'));

const app = express();

app.use('/public', express.static('public'));

app.get('/static/products/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, `../public/products/${req.params.id}.html`));
});

app.get('/products/:id', (req, res) => {
  const product = require('../data/products.json').filter(p => p.id === req.params.id);
  if (product) {
    const sales = require('../data/sales.json').filter(s => s.PRODUCT_ID === product.id);

    const state = {
      title: 'Product',
      initialState: JSON.stringify({ product, sales }),
      initialRender: ReactDOMServer.renderToString(<Product product={product} sales={sales} />)
    }
  } else {
    req.send('uh oh');
  }
})

app.get('/generate', (req, res) => {
  const products = require('../data/products.json');
  let productsProcessed = 0;

  for (let i = 0; i < products.length; i++){
    workers(products[i], (err, result) => {
      productsProcessed++;
      if (productsProcessed === products.length) {
        res.send("done!");
      }
    });
  }
})

app.listen(3000);