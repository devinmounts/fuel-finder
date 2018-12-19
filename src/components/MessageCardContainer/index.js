import React, { Component } from 'react';
import { NonAuthMessageCard, AuthMessageCard} from '../MessageCard';
import {  
  Card, 
  CardTitle, 
  CardBody, 
  } from 'reactstrap';

class MessageCardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: ''
    }

    this.updateText = this.updateText.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
  }
  
  valueChanged = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      updatedMessage: value
    });
  }

  render() {
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
}


export default MessageCardContainer;
