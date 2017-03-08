import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Product from './components/product';

module.exports = (product, callback) => {
  // render <Product id={product.id} sales={ [] of sales }/>
  // put into template with initial state
  // save to /public/products/{id}.html

  callback(null, `Product ${product.id} complete`);
};
