import React from 'react';
import './styles.css';
import { withFirebase } from '../Firebase';
import { withAuthentication, withAuthorization } from '../Session'; 
import { compose } from 'recompose';

const SignOutButton = ({ firebase }) => (
 <button className='sign-out-button' type='button' onClick={firebase.doSignOut}>
  Sign Out
 </button>

);

export default compose(
  withFirebase,
)(SignOutButton);