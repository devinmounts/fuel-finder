import React from 'react';

import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;
// const condition = authUser => authUser.role === 'ADMIN';
export default withAuthorization(condition)(HomePage);