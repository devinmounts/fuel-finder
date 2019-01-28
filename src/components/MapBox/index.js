import React, { Component } from 'react';
import ReactMapboxGl, {Layer, Feature, Popup} from 'react-mapbox-gl';
import './../../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import './styles.css';
import PropTypes from 'prop-types';
import { gasCanSvg } from './gasCan';
import { connect } from 'react-redux';
import { getMessagesAtStationID } from './../API_REALTIME/index'
import { getStatePolygonFeatures, runFetchUpdateAndAddFuelStations, stringifyGeoJson } from './../API_MapBox';
import mapboxgl from 'mapbox-gl';
 
// /** Create Map */
// const MapBox = ReactMapboxGl({
// 	accessToken: process.env.REACT_APP_MAPBOX_TOKEN
//  });

// /** Define Layout Layer */
// const layoutLayer = { 'icon-image': 'fuelFinder'}

// // Create an image for the Layer
// const image = new Image();
// image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(gasCanSvg);
// const images = ['fuelFinder', image];

class FuelMap extends Component {
  constructor(props) {
		super(props)

		this.state = {
      center: this.props.center,
      zoom: this.props.zoom,
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
  componentDidMount() {
		runFetchUpdateAndAddFuelStations();
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
		const map = new mapboxgl.Map({
			container: 'map',
			center: this.props.center,
			zoom: this.props.zoom,
			style: 'mapbox://styles/devinmounts/cjreek0rk17oi2tpz90g0gncz',
		});
		
		map.on('load', () => {
			const layers = ['0-100', '100-250', '250-500', '500-1000', '1000-2000', '2000-3000', '3000+'];
			const colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#790119'];
			for (let i = 0; i < layers.length; i++) {
				let layer = layers[i];
				let color = colors[i];
				let legend = document.getElementById('legend')
				let item = document.createElement('div');
				let key = document.createElement('span');
				key.className = 'legend-key';
				key.style.backgroundColor = color;
			
				var value = document.createElement('span');
				value.innerHTML = layer;
				item.appendChild(key);
				item.appendChild(value);
				legend.appendChild(item);
			}

			
			console.log(map.getSource());
		});

		map.on('mousemove', (e) => {
				const states = map.queryRenderedFeatures(e.point, {
					layers: ['state-polygons-with-fuel-data-1ejxn1']
				});

				if (states.length > 0) {
					console.log(states[0])
					document.getElementById('pd').innerHTML = `<h3><strong>${states[0].properties.NAME}</strong></h3><p><strong><em>${states[0].properties.FUEL_STATIONS}</strong> fuel stations</em></p>`;
				} else {
					document.getElementById('pd').innerHTML = `<p>Hover over a state!</p>`;					
				}
		});
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
		console.log('click');
		// this.setState({
    //   selectedStation: station,
    //   center: [station.longitude, station.latitude],
		// });
		// this.props.onSetFuelStation(station);
		// getMessagesAtStationID(station.id)
		// 	.then(messagesArray => {
		// 		this.setState({
		// 			localSelectedStationMessagesArray: messagesArray
		// 		});
		// 		this.props.onSetFuelStationMessages(messagesArray)
		// 	});
  }
  
  handleScrollToDetails = () => {
    console.log('scroll');
  }

  render(){
    const { selectedStation } = this.state;
    return(
			<div className='mapbox-container'>
				<div id='map'>
					
				</div>
				<div className='map-overlay' id='features'><h2>Fuel Stations</h2><div id='pd'><p>Hover over a state!</p></div></div>
				<div className='map-overlay' id='legend'></div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
	stationsArray: state.stationsArrayState.stationsArray,
	center: state.stationsArrayState.center,
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

/* <Layer
            type="symbol"
            id="marker"
            images={images}
            layout={layoutLayer}>
            {this.props.stationsArray && this.props.stationsArray.length > 0 ? this.getMarkers() : ''}

            <Feature coordinates={this.state.location}/>
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
					)} */
					
				// 	<MapBox 
        // className='map'
        // center={this.props.center}
        // zoom={this.props.zoom}
				// onClick={this.handleMarkerClick}
        // style='mapbox://styles/devinmounts/cjr1c6tna0ckn2sp8tz6dc0n5'>
        // </MapBox>