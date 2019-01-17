import React from 'react';
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';

 export const MessageCardForm = (props) => {
  const {haveUserLocation,
         formSubmitted, 
         sendingMessage,
         sentMessage, 
         valueChanged, 
         cancelMessage, 
         formIsValid,
         authUser,
        } = props;
  return (
    <div>
      {authUser ? 
      <AuthCardForm 
        haveUserLocation={haveUserLocation}
        formSubmitted={formSubmitted}
        sendingMessage={sendingMessage}
        sentMessage={sentMessage}
        valueChanged={valueChanged}
        cancelMessage={cancelMessage}
        formIsValid={formIsValid}
        authUser={authUser}
      /> 
      : 
      <NonAuthCardForm
      cancelMessage={cancelMessage} />}
    </div>
  );
};

const AuthCardForm = (props) => {
  const {
    formSubmitted, 
    sendingMessage,
    sentMessage, 
    valueChanged, 
    cancelMessage, 
    formIsValid,
    authUser,
   } = props;
  return (
    <Card body className='message-form'>
        <CardTitle>Fuel Finder</CardTitle>
        <CardText>Leave a message about this location</CardText>
        { !sendingMessage && !sentMessage ? 
          <Form onSubmit={formSubmitted} >
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                onChange={valueChanged}
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={authUser.username} />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                onChange={valueChanged}
                type="textarea"
                name="message"
                id="message"
                placeholder="Enter a message" />
            </FormGroup>
            <Button type='cancel' color='danger' onClick={cancelMessage}>
              Cancel
            </Button>
            {' '}
            <Button type='submit' color='info' disabled={!formIsValid} >
              Send
            </Button>
          </Form>
         : <CardText>Thanks for submitting a message</CardText>

        }
    </Card>
  );
}

const NonAuthCardForm = (props) => {
  const {cancelMessage} = props;
    return (
    <Card body className='message-form'>
        <CardTitle>Fuel Finder</CardTitle>
        <CardText>Leave a message about this location</CardText> 
          <Form >
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                placeholder="Enter your name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                placeholder="Enter a message" />
            </FormGroup>
            <Button type='cancel' color='danger' onClick={cancelMessage}>
              Cancel
            </Button>
            {' '}
            <Link to={ROUTES.SIGN_IN}>
              <Button >
              Sign In to post comment
              </Button>
            </Link>

            
          </Form>
    </Card>
  );
}

MessageCardForm.propTypes = {
  haveUserLocation: PropTypes.bool,
  formSubmitted: PropTypes.func,
  sendingMessage: PropTypes.bool,
  sentMessage: PropTypes.bool,
  valueChanged: PropTypes.func,
  cancelMessage: PropTypes.func,
  formIsValid: PropTypes.func,
};


const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
})

export default connect(mapStateToProps)(MessageCardForm);