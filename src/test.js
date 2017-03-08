import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as path from 'path';

import jade from 'jade';
import * as fs from 'fs';

import Product from './components/product';

const template = jade.compileFile(path.resolve(__dirname, '../public/template.jade'));

const product = {
  "id": 51234,
  "guid": "alien-jerky",
  "displayName": "Alien Jerky",
  "pricePerUnit": 12.99,
  "unitWeight": 12,
  "description": "New, premium meat cut! Yes, straight from the moon to our store, one of the greatest tasting beef jerkys this side of the milky way!! Fresh, tender strips of BBQ flavored beef jerky!"
}

const sales = [
  {
    "ID": 1,
    "PRODUCT_ID": 51234,
    "STATUS": "awaiting_payment",
    "DATE_PURCHASED": 1488936858519,
    "SHIPPING_ADDRESS": "6940 Cristionna drv, Breban City, HI, 33925"
  },
  {
    "ID": 2,
    "PRODUCT_ID": 51234,
    "STATUS": "canceled",
    "DATE_PURCHASED": 1488952804257,
    "SHIPPING_ADDRESS": "4410 Grossman way, Wallis Park, LA, 88635"
  }
];

const state = {
  title: 'Hello World!',
  initialState: JSON.stringify({product, sales}),
  initialRender: ReactDOMServer.renderToString(<Product product={product} sales={sales} />)
}

console.log(template(state));