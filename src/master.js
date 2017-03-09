// built in imports
import 'babel-core/register';
import 'babel-polyfill';

import workerFarm from 'worker-farm';
import express from 'express';
import jade from 'jade';
import Product from './components/product';
import * as path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

const workers = workerFarm(require.resolve('./worker'));
const template = jade.compileFile(path.resolve(__dirname, '../public/template.jade'));

const app = express();

app.use('/public', express.static('public'));

app.get('/static/products/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, `../public/products/${req.params.id}.html`));
});

app.get('/', (req, res) => {
  const products = require('../data/products.json');
  const links = [];

  for (let i = 0; i < products.length; i++){
    links.push(`
    <a href="/static/products/${products[i].id}">${products[i].displayName} (static)</a> &nbsp;
    <a href="/products/${products[i].id}">${products[i].displayName} (dynamic)</a><br />
    `);
  }

  res.send(`
  <html>
  <head>
  <title>index</title>
  </head>
  <body>
  ${links.join('')}
  </body>
  </html>
  `)
})

app.get('/products/:id', (req, res) => {
  const product = require('../data/products.json').find(p => p.id === parseInt(req.params.id));
  if (product) {
    const sales = require('../data/sales.json').filter(s => s.PRODUCT_ID === product.id);

    const state = {
      title: 'Product',
      initialState: JSON.stringify({ product, sales }),
      initialRender: ReactDOMServer.renderToString(<Product product={product} sales={sales} />)
    }

    res.send(template(state));
  } else {
    res.send('uh oh');
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