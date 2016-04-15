import React from 'react';

class Footer extends React.Component {
  render () {
    return (
      <div>
        <div>
          <a href='#' onClick={this.props.changeToIntroPage}>Main Page</a>
        </div>
        <div>
          <a href='#' onClick={this.props.changeToContactPage}>Contact Us</a>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  changeToContactPage: React.PropTypes.func.isRequired,
  changeToIntroPage: React.PropTypes.func.isRequired,
};

export default Footer;
