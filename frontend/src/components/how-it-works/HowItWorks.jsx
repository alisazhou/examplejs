import React from 'react';

class HowItWorks extends React.Component {
  render () {
    return (
      <header className='howitworks__header'>
        <div className='howitworks__div'>
          <h1 className='howitworks__heading'>iChef</h1>
          <div className='howitworks-text'>
            <div className='howitworks-text__description--small'>
              Invite a private chef to cook at your home and enjoy dinner while he takes care of all ingredients, equipment and cleaning.
            </div>
            <div className='howitworks-text__description--large'>
              1. Choose a dinner among a vast array of fine selections
            </div>
            <div className='howitworks-text__description--large'>
              2. A chef arrives at your house with all ingredients and needed equipment. The chef cooks and serves you a gourmet dinner.
            </div>
            <div className='howitworks-text__description--large'>
              3. The chef cleans the dishes while you enjoy your meal.
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default HowItWorks;
