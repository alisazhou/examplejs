import React from 'react';
import { connect } from 'react-redux';

class Footer extends React.Component {
  clickThroughTo (targetPage) {
    return e => {
      e.preventDefault();  // don't append # at end of url
      this.props.changePage(targetPage);
    };
  }
  render () {
    return (
      <div>
        <div>
          <a href='#' onClick={this.clickThroughTo('intro')}>Main Page </a>
        </div>
        <div>
          <a href='#' onClick={this.clickThroughTo('contact')}>Contact Us</a>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  changePage: React.PropTypes.func.isRequired,
};

const mapStateToProps = () => {return {};};

const goToPageActionCreator = value => ({type: 'GO_TO_PAGE', toPage: value});
const mapDispatchToProps = dispatch => ({
  changePage: targetPage => {dispatch(goToPageActionCreator(targetPage));},
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
export { Footer };
