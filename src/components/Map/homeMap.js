import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './styles.css';
import L from 'leaflet';
import userLocationURL from '../../assets/images/user_location.svg';
import messageLocationURL from '../../assets/images/message_location.svg';

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
			lat: 45.51,
			lng: -122.66,
			zoom: 10
		}
	}

	render() {
		const position = [this.state.lat, this.state.lng]
		return(
			<Map className='map' center={position} zoom={this.state.zoom} >
				 <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
				<Marker 
					position={position}
					icon={myIcon}
					 >
					<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</Map>
		);
	}
}

export default HomeMap;