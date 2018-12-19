import React from 'react';
import './styles.css';
import { withFirebase } from '../Firebase';
import { withAuthentication, withAuthorization } from '../Session'; 
import { compose } from 'recompose';

const SignOutButton = ({ firebase }) => (
<<<<<<< HEAD
<<<<<<< HEAD
  <button type='button' onClick={firebase.doSignOut}>
    Sign Out
  </button>
=======
 <button className='sign-out-button' type='button' onClick={firebase.doSignOut}>
  Sign Out
 </button>
>>>>>>> redux
=======
 <button className='sign-out-button' type='button' onClick={firebase.doSignOut}>
  Sign Out
 </button>
>>>>>>> 619d9d05242c22444a0a36198fbdc3a57a24f4cb
);

export default compose(
  withFirebase,
)(SignOutButton);