import React from 'react';
import { Link } from 'react-router';

class AuthButton extends React.Component {
  render() {
    return (
      <Link to={this.props.linkTo}>
        <button className={this.props.className}>{this.props.content}</button>
      </Link>
    );
  }
}

AuthButton.propTypes = {
  className: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  linkTo: React.PropTypes.string.isRequired,
};

export default AuthButton;
