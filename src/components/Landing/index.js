import React from 'react';
import MapBox from '../MapBox';
import SelectedStation from '../SelectedStation';
import LandingSearch from '../Landing/search';

const Landing = () => (
  <div className='landing-page'>
    <LandingSearch />
    <MapBox />
    <SelectedStation />
  </div>
);

export default Landing;