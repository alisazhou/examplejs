import React from 'react';
import { Link } from 'react-router';

class LinkButton extends React.Component {
  render () {
    return (
      <Link to={this.props.linkTo}>
        <button {...this.props.btnProps}>{this.props.content}</button>
      </Link>
    );
  }
}

LinkButton.propTypes = {
  btnProps: React.PropTypes.object,
  content: React.PropTypes.string.isRequired,
  linkTo: React.PropTypes.string.isRequired,
};

export default LinkButton;
