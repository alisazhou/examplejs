import React from 'react';

export default function wrapPage (Component) {
  class WrappedPage extends React.Component {
    render () {
      return (
        <div className={this.props.visible ? '' : 'hidden'}>
          <Component {...this.props}/>
        </div>
      );
    }
  }
  WrappedPage.propTypes = {
    visible: React.PropTypes.bool,
  };
  WrappedPage.defaultProps = {
    visible: true,
  };
  WrappedPage.wrappedByPageWrapper = true;
  return WrappedPage;
}
