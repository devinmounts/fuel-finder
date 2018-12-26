import React from 'react';
import './styles.css';
import { HomeMap } from '../Map';
import SelectedStation from '../SelectedStation';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div className='home-page'>
    <div className='hr-box'>
      <hr className='hr'/>
    </div>
    <HomeMap />
    <SelectedStation />
  </div>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);