import React from 'react';

export default class Sales extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.ID}</td>
        <td>{new Date(this.props.DATE_PURCHASED).toDateString()}</td>
        <td>{this.props.SHIPPING_ADDRESS}</td>
      </tr>
    );
  }
}