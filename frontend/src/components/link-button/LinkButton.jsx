import React from 'react';
import { Link } from 'react-router';

class LinkButton extends React.Component {
  render () {
    return (
      <Link to={this.props.linkTo}>
        <button className={this.props.btnClassName}>{this.props.content}</button>
      </Link>
    );
  }
}

LinkButton.propTypes = {
  btnClassName: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  linkTo: React.PropTypes.string.isRequired,
};

export default LinkButton;
