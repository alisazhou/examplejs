import React from 'react';

class Footer extends React.Component {
  render () {
    return (
      <p>
        Placeholder Footer: 
        <a href='#' onClick={this.props.changeToContactPage}>Contact Us</a>
      </p>
    );
  }
}

Footer.propTypes = {
  changeToContactPage: React.PropTypes.func.isRequired,
};

export default Footer;
