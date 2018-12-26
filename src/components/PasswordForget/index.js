import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Card,  
  Form,  
  Input} from 'reactstrap';
import './styles.css';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div className='passwordforget-page'>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
}

class PasswordForgetFormBase extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({error});
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  }

  render(){
    const { email, error } = this.state;

    const isInvalid = email === '';

    return(
      <Card className='passwordforget-card'>
          <h1 className='passwordforget-title'>PasswordForget</h1>
        <Form onSubmit={this.onSubmit}>
          <Input 
            name='email'
            value={this.state.email}
            onChange={this.onChange}
            type='text'
            placeholder='Email Address'
          />
          <br/>
          <Button disabled={isInvalid} type='submit'>
            Reset My Password
          </Button>

          {error && <p>{error.message}</p>}
        </Form>
      </Card>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink }