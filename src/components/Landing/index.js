import React from 'react';
import LandingMap from '../Map/landingMap';
import SelectedStation from '../SelectedStation';
import LandingSearch from '../Landing/search';

const Landing = () => (
  <div className='landing-page'>
    <LandingSearch />
    <LandingMap />
    <SelectedStation />
  </div>
);

export default Landing;