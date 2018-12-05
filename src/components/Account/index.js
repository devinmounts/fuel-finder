import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { auth } from 'firebase';
import { AuthUserContext } from '../Session';

const AccountPage = () => (
  <div>
    <h1>Account: {AuthUserContext.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

export default AccountPage;