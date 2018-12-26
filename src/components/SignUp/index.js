import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import { 
  Button, 
  Card,  
  Form,  
  Input} from 'reactstrap';
import './styles.css';

const SignUpPage = () => (
  <div className='signup-page'>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }
  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        //Create User in Fire db
        return this.props.firebase
        .user(authUser.user.uid)
        .set({
          username,
          email,
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE});
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault();
  }

  onChange = event => {
    this.setState( { [event.target.name]: event.target.value})
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Card className='signup-card'>
        <h1 className='signup-title'>SignUp</h1>
        <Form onSubmit={this.onSubmit}>
          <Input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <br/>
          <Input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <br/>
          <Input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <br/>
          <Input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <br/>
          <Button disabled={isInvalid} type="submit">Sign Up</Button>

          {error && <p>{error.message}</p>}
        </Form>
      </Card>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
  )(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };