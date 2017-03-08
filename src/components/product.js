import React from 'react';
import ReactDOM from 'react-dom';
import Sales from './sales';

export default class Product extends React.Component {
  render() {
    const rows = [];

    for (let i = 0; i < this.props.sales.length; i++) {
      rows.push(<Sales key={`sale_${i}`} {...this.props.sales[i]} />);
    }

    return (
      <div className="product-info">
        <span>{this.props.product.displayName}</span>
        <br />
        <span>{`${this.props.product.pricePerUnit}`}</span>
        <br />
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Date Purchased</th>
              <th>Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

if (typeof window !== 'undefined' && document) {
  const { product, sales } = window.__INITIAL_STATE__;
  ReactDOM.render(<Product sales={sales} product={product} />, document.getElementById('app'));
}