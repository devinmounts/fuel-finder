import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './styles.css';
import L from 'leaflet';
import userLocationURL from '../../assets/images/user_location.svg';
// import messageLocationURL from '../../assets/images/message_location.svg';
import { getUserLocation } from './API';
import { Button, Card, CardText } from 'reactstrap';
import MessageCardForm from '../MessageCardForm';

const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82]
});

// const messageIcon = L.icon({
//   iconUrl: messageLocationURL,
//   iconSize: [50, 82]
// });

class HomeMap extends Component {
	constructor(props) {
		super(props)

		this.state = {
			location: {
				lat: 40.51,
				lng: -100.66,
			},
			haveUserLocation: false,
			zoom: 3,
			userMessage: {
				name: '',
				message: '',
			},
			showMessageForm: false,
			sendingMessage: false,
			sentMessage: false,
			messages: []
		}
	}

	componentDidMount() {
		getUserLocation()
		.then(location => {
			this.setState({
				location,
				haveUserLocation: true,
				zoom: 13
			});
		});
	}

	showMessageForm = () => {
		this.setState({
			showMessageForm: true
		});
	}
	render() {
		const position = [this.state.location.lat, this.state.location.lng]
		return(
			<div className='map'>
			<div className='form-box'>
				<div className='form-container'>
					{!this.state.showMessageForm ? 
						<Button className='message-form' onClick={this.showMessageForm} color='info'>Post a Message</Button> :
						!this.state.sentMessage ? 
						<MessageCardForm
							cancelMessage={this.cancelMessage}
							showMessageForm={this.state.showMessageForm}
							sendingMessage={this.state.sendingMessage}
							sentMessage={this.state.sentMessage}
							haveUserLocation={this.state.haveUserLocation}
							formSubmitted={this.formSubmitted}
							valueChanged={this.valueChanged}
							formIsValid={this.formIsValid} 
						/>
						: <Card className='thanks-form'>
								<CardText>Thank you for submitting a message</CardText>
							</Card>

					}
				</div>
			</div>
				<Map className='map' center={position} zoom={this.state.zoom} >
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{ this.state.haveUserLocation ?
						<Marker 
							position={position}
							icon={myIcon}>
						</Marker>
						: ''
					}
				</Map>
			</div>
				
		);
	}
}

export default HomeMap;