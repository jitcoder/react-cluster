import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Ticker from './components/ticker';

module.exports = (inp, callback) => {
  callback(null, { id: inp, rendering: ReactDOMServer.renderToString(<Ticker id={inp} />) });
};
