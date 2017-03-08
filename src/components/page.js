import React from 'react';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <script>
            window.__INITIAL_STATE__ = {JSON.stringify(this.props.initialState)};
          </script>
        </head>
        <body>
          <div id={'app'}>
            {this.props.children}
          </div>
          <script src={'/bundle.js'}></script>
        </body>
      </html>
    )
  }
}