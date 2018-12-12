import React from 'react';
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const MessageCardForm = (props) => {
  const {haveUserLocation,
         formSubmitted, 
         sendingMessage,
         sentMessage, 
         valueChanged, 
         cancelMessage, 
         formIsValid,
        } = props;

  return (
    <Card body className='message-form'>
        <CardTitle>Fuel Finder</CardTitle>
        <CardText>Leave a message about this location</CardText>
        { !sendingMessage && !sentMessage && haveUserLocation ? 
          <Form onSubmit={formSubmitted} >
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                onChange={valueChanged}
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name" />
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
            <Button type='submit' color='info' disabled={!formIsValid()}>
              Send
            </Button>
          </Form>
         : <CardText>Thanks for submitting a message</CardText>

        }
    </Card>
  );
};

MessageCardForm.propTypes = {
  haveUserLocation: PropTypes.bool,
  sendingMessage: PropTypes.bool,
  sentMessage: PropTypes.bool,
  valueChanged: PropTypes.func,
  cancelMessage: PropTypes.func,
  formIsValid: PropTypes.func,
};

export default MessageCardForm;