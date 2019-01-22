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
			style: 'mapbox://styles/devinmounts/cjr1c6tna0ckn2sp8tz6dc0n5'
		});

		// map.on('load', () => {
		// 	map.addSource(`cjr2j0dpp1u802wplf3b3k6d9`, {
		// 		type: 'geojson',
    //     data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
		// 		cluster: true,
		// 		clusterMaxZoom: 14,
		// 		clusterRadius: 50
		// 	});
		// });
		

		// map.on('click', (e) => {
		// 	let features = map.queryRenderedFeatures(e.point,
		// 		{
		// 			layers: ['fuel-station-points']
		// 		});

		// 		if(!features.length) {
		// 			return;
		// 		}
		// 		let feature = features[0];

		// 		const popup = new mapboxgl.Popup({ offset: [0, -5]
		// 		})
		// 			.setLngLat(feature.geometry.coordinates)
		// 			.setHTML(`<p>${feature.properties.id}</p>`)
		// 			.addTo(map);

		// 			console.log('click', feature.properties.id);

		// });
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
      <div id='map'>
        
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