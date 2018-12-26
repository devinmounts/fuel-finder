import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import './styles.css';
import { 
  Button, 
  Card,  
  CardBody, 
  Form,  
  Input} from 'reactstrap';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div className='signin-page'>
  <Card className='signin-card'>
    <h1 className='signin-title'>Sign In</h1>
    <CardBody>
      <SignInForm/>
      <br/>
      <SignInGoogle />
      <PasswordForgetLink />
      <SignUpLink/>
    </CardBody>
  </Card>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE};
  }

  onSubmit = event => {
    const { email, password } = this.state
   
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState = { ...INITIAL_STATE };
        this.props.history.push(ROUTES.HOME);
      })
      .catch( error => {
        this.setState( { error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState( {[event.target.name]: event.target.value})
  }

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <br/>
        <Input 
          name='password'
          value={password}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <br/>
        <Button type='submit' disabled={isInvalid}>
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
    .doSignInWithGoogle()
    .then(socialAuthUser => {
      return this.props.firebase.user(socialAuthUser.user.uid).set({
        username: socialAuthUser.user.displayName,
        email: socialAuthUser.user.email,
        roles: [],
      });
    })
    .then(() => {
      this.setState( { error: null });
      this.props.history.push(ROUTES.HOME);
    })
    .catch( error => {
      if( error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        error.message = ERROR_MSG_ACCOUNT_EXISTS;
      }

      this.setState({ error });
    });
    event.preventDefault();
  };

  render(){
    const { error } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Button type="submit">Sign In with Google</Button>

        {error && <p>{error.message}</p>}
    </Form>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

export default SignInPage;

export { SignInForm, SignInGoogle };
