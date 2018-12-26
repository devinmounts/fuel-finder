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

import MessageCardModal from '../Modal/messageCardModal'
import { deleteMessage, updateMessage } from '../API_REALTIME';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

const MessageCardContainer = (props) => {
  const {authUser, station} = props;
  
  return(
    <div>
      {station.messages && station.messages.length > 0 ? station.messages.map((message) => {
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

export class AuthMessageCard extends Component {
  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      collapse: false,
      updatedMessage: null,
      modal: false,
      messageDeleted: false,

    };
  }

  toggleCollapse() {
    this.setState({
      collapse: !this.state.collapse,
    })
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  valueChanged = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      updatedMessage: value
    });
  }

  formIsValid = () => {
    if (this.state.updatedMessage) {
      let { updatedMessage } = this.state;
      updatedMessage = updatedMessage.trim();
  
      const validMessage =
        updatedMessage.length > 0 && updatedMessage.length <= 500;
      return validMessage ? true : false;
    }

    }
  
  
   submitUpdatedMessage = (event) => {
     event.preventDefault();
     if (this.formIsValid()) {
       
       const updatedMessage = {
         _id: this.props.message._id,
         newMessage: this.state.updatedMessage
        }
        updateMessage(updatedMessage)
        this.setState({
          collapse: false,
        })
      }
    }

    deleteMessage = () => {
      const messageId = {
        _id: this.props.message._id,
      };
      deleteMessage(messageId._id);
      this.setState({
        modal: false,
      });
    }
  
  render(){
    
    const { message } = this.props;
    const { modal } = this.state;

   return (
     <div>
      <MessageCardModal 
        modalBool={modal}  
        onToggleModal={this.toggleModal}
        messageBody={message}
        onDeleteMessage={this.deleteMessage}
      ></MessageCardModal>
      <Card className='message-card' key={message._id} >
        <CardTitle className='message-user-name'>{message.name}</CardTitle>
        <Moment className='date' format='D MMM YYYY'>{message.date}</Moment>
        <CardBody>   
          <CardText className='message-text'>{message.message}</CardText>
        </CardBody>
        <div className='icon-box'>
        <FontAwesomeIcon className='edit-icon' onClick={this.toggleCollapse} icon={faPencilAlt} size='2x'/>
        </div>
        <Collapse className='collapse-box' isOpen={this.state.collapse}>
          <Form onSubmit={this.submitUpdatedMessage}>
            <FormGroup>
              <Label for='message'>Message:</Label>
              <Input
              name='message'
              onChange={this.valueChanged}
              placeholder='New Message'/>
            </FormGroup>
            <Button type='submit' color='warning' disabled={!this.formIsValid()}>Update</Button>
            {' '}
            <Button onClick={this.toggleModal} color='danger'>Delete</Button>

          </Form>
        </Collapse>
      </Card>
     </div>
   );
  }
}



export const NonAuthMessageCard = (props) => {
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
