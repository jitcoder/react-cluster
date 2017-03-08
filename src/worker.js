import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as path from 'path';

import jade from 'jade';
import * as fs from 'fs';

import Product from './components/product';

const template = jade.compileFile(path.resolve(__dirname, '../public/template.jade'));



module.exports = (product, callback) => {
  // render <Product id={product.id} sales={ [] of sales }/>
  // put into template with initial state
  // save to /public/products/{id}.html

  const sales = require('../data/sales.json').filter(s => s.PRODUCT_ID === product.id);

  const state = {
    title: 'Product',
    initialState: JSON.stringify({ product, sales }),
    initialRender: ReactDOMServer.renderToString(<Product product={product} sales={sales} />)
  }

  fs.writeFileSync(path.resolve(__dirname,`../public/products/${product.id}.html`), template(state));
  callback(null, `Product ${product.id} complete`);
};
