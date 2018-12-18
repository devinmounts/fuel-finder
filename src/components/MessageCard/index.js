import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Collapse, 
  Button, 
  Card, 
  CardText, 
  CardTitle, 
  CardBody, 
  Form, 
  FormGroup, 
  Label, 
  Input} from 'reactstrap';

import updateMessage from '../API';

const MessageCardContainer = (props) => {
  const {authUser, station} = props;
  return(
    <div>
      {station.messages && station.messages.length > 0 ? station.messages.map((message) => {
        console.log(message)
        if (message.user_id === authUser.uid) {
          return <AuthMessageCard message={message} key={message._id}/>
        } else {
          return <NonAuthMessageCard message={message} key={message._id}/>
        }
      })
      : <Card className='message-card' color='info'>
          <CardBody>
          <CardTitle className='message-title'>There are no messages posted for this location</CardTitle>
          </CardBody>
        </Card>
      }
    </div>
  );
}

class AuthMessageCard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      updatedMessage: null,
    };
  }

  toggle() {
    this.setState({
      collapse: !this.state.collapse,
    })
  }

  valueChanged = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      updatedMessage: value
    });
  }

  formIsValid = () => {
    let { updatedMessage } = this.state.updatedMessage;
    updatedMessage = updatedMessage.trim();

    const validMessage =
      updatedMessage.length > 0 && updatedMessage.length <= 500;
    return validMessage ? true : false;
  }
  
  
   submitUpdateMessage = (event) => {
    event.preventDefault();
    if (this.formIsValid()) {
      
      const newMessage = {
        _id: this.props.message._id,
        message: this.state.updatedMessage
      }
      updateMessage(newMessage)
    }
  }
  render(){
    
    const { message } = this.props;

   return (
     <Card className='message-card' key={message._id} color='info'>
     <CardTitle className='message-user-name'>{message.name}</CardTitle>
       <CardBody>          
         <Moment fromNow>{message.date}</Moment>
         <CardText>{message.message}</CardText>
       </CardBody>
       <Button color='primary' onClick={this.toggle}>Edit Message</Button>
       <Collapse isOpen={this.state.collapse}>
         <Form onSubmit={this.updateMessage}>
           <FormGroup>
             <Label for='message'>Message:</Label>
             <Input
             name='message'
             onChange={this.valueChanged}
             placeholder='New Message'/>
           </FormGroup>
           <Button type='submit' color='warning'>Update</Button>
           {' '}
           <Button color='danger'>Delete</Button>

         </Form>

       </Collapse>
     </Card>
   );
  }
}



const NonAuthMessageCard = (props) => {
  const { message } = props;
  return (
    <Card className='message-card' key={message._id} color='info'>
    <CardTitle className='message-user-name'>{message.name}</CardTitle>
      <CardBody>          
        <Moment fromNow>{message.date}</Moment>
        <CardText>{message.message}</CardText>
      </CardBody>
    </Card>
  );
}


const mapStateToProps = state => ({
  station: state.fuelStationState.selectedStation,
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(MessageCardContainer);