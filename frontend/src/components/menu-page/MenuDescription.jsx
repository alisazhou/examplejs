import React from 'react';


export default class MenuDescription extends React.Component {
  render () {
    return (
      <div>
        <img src={this.props.image} alt='menu image'/>
        <h3>{this.props.chef}</h3>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

MenuDescription.propTypes = {
  chef: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
};
