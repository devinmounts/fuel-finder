import React from 'react';

import { HomeMap } from '../Map';
import SelectedStation from '../SelectedStation';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div className='home-page'>
    <HomeMap />
    <SelectedStation />
  </div>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);