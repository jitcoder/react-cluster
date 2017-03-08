import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Ticker from './components/ticker';

//console.log(ReactDOMServer.renderToStaticMarkup(<Ticker id={1} />));

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Ticker id={1} />
        <Ticker id={2} />
      </div>
    );
  } 
}

console.log(ReactDOMServer.renderToString(<Test />));