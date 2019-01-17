import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import './../../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import './styles.css';


const Map = ReactMapboxGl({
 accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

class MapBox extends Component {
  constructor(props) {
		super(props)

		this.state = {
			location: {
				lat: 40.51,
				lng: -100.00,
			},
			haveUserLocation: false,
			zoom: [2],
			userMessage: {
				name: '',
				message: '',
			},
			showMessageForm: false,
			sendingMessage: false,
			sentMessage: false,
			// messages: [],
			haveStationsArray: false,
			stationsArray: [],
			localSelectedStation: null,
			localSelectedStationMessagesArray: []
		}
	}
  
  

  render(){
    return(
      <div className='map-container'>
      Mapbox works
        <Map 
        className='map'
        center={this.state.location}
        zoom={this.state.zoom}
        style="mapbox://styles/mapbox/streets-v8"/>
      </div>
    );
  }
}

export default MapBox;