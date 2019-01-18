import React, { Component } from 'react';
import ReactMapboxGl, {Layer, Feature, Popup} from 'react-mapbox-gl';
import './../../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import './styles.css';
import PropTypes from 'prop-types';
import { gasCanSvg } from './gasCan';
import { connect } from 'react-redux';
import { getMessagesAtStationID } from './../API_REALTIME/index'

/** Create Map */
const MapBox = ReactMapboxGl({
 accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

/** Define Layout Layer */
const layoutLayer = { 'icon-image': 'fuelFinder'}

// Create an image for the Layer
const image = new Image();
image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(gasCanSvg);
const images = ['fuelFinder', image];

class FuelMap extends Component {
  constructor(props) {
		super(props)

		this.state = {
			haveUserLocation: false,
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
			selectedStation: null,
			localSelectedStationMessagesArray: []
		}
	}
  
  getMarkers = () => {
    const markers = this.props.stationsArray.map((station) => (
			<Feature
				key={station.id}
				coordinates={[station.longitude, station.latitude]}
				// icon={station.fuel_type_code === "ELEC" ? bolt : gasCan}
				onClick={() => this.handleMarkerClick(station)}
			>
				<Popup>
				<p><em>{station.station_name}</em></p>
				</Popup>
			</Feature>
    ))
		return markers
  }

  handleMarkerClick = (station) => {
		this.setState({
			selectedStation: station
		});
		this.props.onSetFuelStation(station);
		getMessagesAtStationID(station.id)
			.then(messagesArray => {
				this.setState({
					localSelectedStationMessagesArray: messagesArray
				});
				this.props.onSetFuelStationMessages(messagesArray)
			});
  }
  
  handleScrollToDetails = () => {
    console.log('scroll');
  }

  render(){
    const { selectedStation } = this.state;
    console.log(selectedStation);
    return(
      <div className='map-container'>
      Mapbox works
        <MapBox 
        className='map'
        center={this.props.location}
        zoom={this.props.zoom}
        style="mapbox://styles/mapbox/streets-v8">
          <Layer
            type="symbol"
            id="marker"
            images={images}
            layout={{ "icon-image": "fuelFinder" }}>
            {this.props.stationsArray && this.props.stationsArray.length > 0 ? this.getMarkers() : ''}

            {/* <Feature coordinates={this.state.location}/> */}
          </Layer>
          { selectedStation && (
            <Popup key={selectedStation.id} coordinates={[selectedStation.longitude, selectedStation.latitude]} >
              <div className='popup'>
                <div>{selectedStation.name}</div>
                <div>
                {selectedStation.station_name}
                <div className='more-link' onClick={this.handleScrollToDetails}><a>more info...</a></div>
                </div>  
              </div>
            </Popup>  
          )}
        </MapBox>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	stationsArray: state.stationsArrayState.stationsArray,
	location: state.stationsArrayState.location,
	zoom: state.stationsArrayState.zoom,
	fuelStation: state.fuelStationState.selectedStation,
	authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
	onSetFuelStation: fuelStation => {
		dispatch({ type: 'STATION_SET', fuelStation})
	},
	onSetFuelStationMessages: messages => {
		dispatch({ type: 'MESSAGES_SET', messages })
	},
});

FuelMap.Proptypes = {
	fuelStation: PropTypes.object,
	onSetFuelStation: PropTypes.func,
	onSetFuelStationMessages: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelMap);

// <Layer
//         type="symbol"
//         id="marker"
//         layout={layoutLayer}
//         images={images}
//         >
//         <Feature
//         coordinates={this.state.location} />
//         {/* {this.props.stationsArray && this.props.stationsArray.length > 0 ? this.getMarkers() : ''} */}
//         </Layer>