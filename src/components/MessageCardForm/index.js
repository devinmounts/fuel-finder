import React from 'react';
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const MessageCardForm = (props) => {
  const {haveStationLocation, formSubmitted} = props;
  return (
    <Card body className='message-form'>
        <CardTitle>Fuel Finder</CardTitle>
        <CardText>Leave a message about this location</CardText>
        { props.haveStationLocation ? 
            <Form onSubmit={props.form} >

            </Form>
            : " "
        }
    </Card>
  );
};

MessageCardForm.propTypes = {
  haveStationLocation: PropTypes.boolean,
}

export default MessageCardForm;