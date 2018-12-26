import React, { Component } from 'react';
import { 
  Button, 
  Form,  
  Input} from 'reactstrap';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class PasswordChangeForm extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo || passwordOne === '';

    return(
      <Form onSubmit={this.onSubmit}>
        <Input 
          name='passwordOne'
          value={this.state.passwordOne}
          onChange={this.onChange}
          type='password'
          placeholder='New Password'
        />
        <br/>
        <Input 
          name='passwordTwo'
          value={this.state.passwordTwo}
          onChange={this.onChange}
          type='password'
          placeholder='Confirm New Password'
        />
        <br/>
        <Button disabled={isInvalid} type='submit'>
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

export default withFirebase(PasswordChangeForm);

