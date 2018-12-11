import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './styles.css';
import L from 'leaflet';
import userLocationURL from '../../assets/images/user_location.svg';
import messageLocationURL from '../../assets/images/message_location.svg';
import { getLocation } from './API';

const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82]
});

const messageIcon = L.icon({
  iconUrl: messageLocationURL,
  iconSize: [50, 82]
});

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
			showmessageForm: false,
			sendingMessage: false,
			sentMessage: false,
			messages: []
		}
	}

	componentDidMount() {
		getLocation()
		.then(location => {
			this.setState({
				location,
				haveUserLocation: true,
				zoom: 13
			});
		});
	}
	render() {
		const position = [this.state.location.lat, this.state.location.lng]
		return(
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
		);
	}
}

export default HomeMap;