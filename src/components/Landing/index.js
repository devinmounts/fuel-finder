import React from 'react';
import LandingMap from '../Map/landingMap';
import SelectedStation from '../SelectedStation';

const Landing = () => (
  <div className='home-page'>
    <div className='hr-box'>
      <hr className='hr'/>
    </div>
    <LandingMap />
    <SelectedStation />
  </div>
);

export default Landing;