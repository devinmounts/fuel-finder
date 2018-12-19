import React from 'react';
import './styles.css';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
 <button className='sign-out-button' type='button' onClick={firebase.doSignOut}>
  Sign Out
 </button>
);

export default withFirebase(SignOutButton);