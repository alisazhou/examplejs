import React from 'react';


class Seller extends React.Component {
  render () { return <div>{this.props.name}</div>; }
}

Seller.propTypes = {name: React.PropTypes.string.isRequired};

export default Seller;
