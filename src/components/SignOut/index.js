import React from 'react';
import './styles.css';
import { withFirebase } from '../Firebase';
import { withAuthentication, withAuthorization } from '../Session'; 
import { compose } from 'recompose';

const SignOutButton = ({ firebase, onCollapse}) => {
  const onSignOut = (event) => {
    firebase.doSignOut();
    onCollapse();
  }
  return(
  <button className='sign-out-button' type='button' onClick={onSignOut}>
    Sign Out
  </button>
  );
};

export default compose(
  withFirebase,
)(SignOutButton);