import React, { Component } from 'react';
import { NonAuthMessageCard, AuthMessageCard} from '../MessageCard';
import {  
  Card, 
  CardTitle, 
  CardBody, 
  } from 'reactstrap';
import Pusher from 'pusher-js';
import { connect } from 'react-redux';

class MessageCardContainer extends Component {
  constructor(props) {
    super(props);

    this.handleAddMessage = this.handleAddMessage.bind(this);
    this.handleRemoveMessage = this.handleRemoveMessage.bind(this);
  }

  componentDidMount() {
    this.pusher = new Pusher('cfac003dbca7d9106af7', {
      cluster: 'us2',
      encrypted: true,
    });
    this.channel = this.pusher.subscribe('messages');
    this.channel.bind('inserted', this.handleAddMessage);
    this.channel.bind('deleted', this.handleRemoveMessage);
  }
  
  valueChanged = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      updatedMessage: value
    });
  
  }

  handleAddMessage(newMessage){
    console.log('pusher inserted')
    this.props.addMessage(newMessage);
  }

  handleRemoveMessage(id) {
    console.log('pusher deleted')
    this.props.removeMessage(id);
  }

  render() {
    const {authUser, station} = this.props;
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

const mapStateToProps = state => ({
  station: state.fuelStationState.selectedStation,
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  addMessage: message => {
    dispatch({ type: 'MESSAGE_ADD', message })
  },
  removeMessage: _id => {
    dispatch({ type: 'MESSAGE_REMOVE', _id })
  },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(MessageCardContainer);
