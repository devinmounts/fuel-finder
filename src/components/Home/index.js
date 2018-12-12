import React from 'react';

import { HomeMap } from '../Map';
import SelectedStation from '../SelectedStation';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <HomeMap />
    <SelectedStation />
  </div>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);