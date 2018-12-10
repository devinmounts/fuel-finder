import React from 'react';

import { withFirebase } from '../Firebase';
import { withAuthentication } from '../Session'; 
import { compose } from 'recompose';

const SignOutButton = ({ firebase }) => (
  <button type='button' onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default compose(
  withFirebase,
  withAuthentication
)(SignOutButton);