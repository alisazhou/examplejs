import React from 'react';

class HowItWorks extends React.Component {
  render () {
    return (
      <header className='bg-cover bg-center head-bg head-color'>
        <div className='center px2 pt4 pb4'>
          <h1 className='h1 h0-responsive mt0 mb4 regular'>iChef</h1>
          <div className='clearfix max-md mx-auto'>
            <div className='sm-hide col col-12 px2'>
              Invite a private chef to cook at your home and enjoy dinner while he takes care of all ingredients, equipment and cleaning.
            </div>
            <div className='sm-show col col-12 sm-col-4 p2'>
              1. Choose a dinner among a vast array of fine selections
            </div>
            <div className='sm-show col col-12 sm-col-4 p2'>
              2. A chef arrives at your house with all ingredients and needed equipment. The chef cooks and serves you a gourmet dinner.
            </div>
            <div className='sm-show col col-12 sm-col-4 p2'>
              3. The chef cleans the dishes while you enjoy your meal.
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default HowItWorks;
