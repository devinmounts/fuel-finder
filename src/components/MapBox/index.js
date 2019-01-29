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
			localSelectedStationMessagesArray: [],
			hoveredStateAbbr: ''
		}
	}
  componentDidMount() {
		// runFetchUpdateAndAddFuelStations();
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
		const map = new mapboxgl.Map({
			container: 'map',
			center: this.props.center,
			zoom: this.props.zoom,
			style: 'mapbox://styles/devinmounts/cjreek0rk17oi2tpz90g0gncz',
		});
		
		map.on('load', () => {
			/** Hide hover layer */
			map.setFilter('states-uuid-hover', ['==', 'ABBREVIATION', this.state.hoveredStateAbbr])

			/**Cluster Data Points */
			const dataURL = `https://api.mapbox.com/datasets/v1/devinmounts/cjr2j0dpp1u802wplf3b3k6d9/features?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
			map.addSource('fuel_points', {
				type: 'geojson',
				data: dataURL,
				cluster: true,
				clusterMaxZoom: 14,
				clusterRadius: 50,
			});

			map.addLayer({
				id: "clusters",
				type: "circle",
				source: "fuel_points",
				minzoom: 4.5,
				filter: ["has", "point_count"],
				paint: {
				"circle-color": [
				"step",
				["get", "point_count"],
				"#51bbd6",
				100,
				"#f1f075",
				750,
				"#f28cb1"
				],
				"circle-radius": [
				"step",
				["get", "point_count"],
				20,
				100,
				30,
				750,
				40
				]
				}
			});

			map.addLayer({
				id: "cluster-count",
				type: "symbol",
				source: "fuel_points",
				minzoom: 4.5,
				filter: ["has", "point_count"],
				layout: {
				"text-field": "{point_count_abbreviated}",
				"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
				"text-size": 12
				}
			});

			map.addLayer({
				id: "unclustered-point",
				type: "circle",
				source: "fuel_points",
				filter: ["!", ["has", "point_count"]],
				paint: {
				"circle-color": "#11b4da",
				"circle-radius": 4,
				"circle-stroke-width": 1,
				"circle-stroke-color": "#fff"
				}
			});
			
			map.on('click', 'clusters', (e) => {
				let features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
				let clusterId = features[0].properties.cluster_id;
				map.getSource('fuel_points').getClusterExpansionZoom(clusterId, (err, zoom) => {
				if (err)
				return;
				 
				map.easeTo({
				center: features[0].geometry.coordinates,
				zoom: zoom
				});
				});
				});
				

			/** Set Feature Hover State  */
			// map.setPaintProperty('states-uuid-3qf5iu', 'fill-opacity', 
			// ["case",
			// ["boolean", ["feature-state", "hover"], false],
			// 1,
			// 0.6
			// ]
			// );

			/** Set legend and Interactive Elements */
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


			/** Populate interactive element on mousemove */
			map.on('mousemove', (e) => {
				const states = map.queryRenderedFeatures(e.point, {
					layers: ['states-uuid-3qf5iu']
				});
				if (states.length > 0) {
					this.setState({
						hoveredStateAbbr: states[0].properties.ABBREVIATION
					});
					/** Hover change opacity */
					map.setFilter('states-uuid-hover', ['==', 'ABBREVIATION', this.state.hoveredStateAbbr]);
					document.getElementById('pd').innerHTML = `<h3><strong>${states[0].properties.NAME}</strong></h3><p><strong><em>${states[0].properties.FUEL_STATIONS}</strong> fuel stations</em></p>`;
				} else {
					document.getElementById('pd').innerHTML = `<p>Hover over a state!</p>`;					
				}
			});
			
			map.on('mouseleave', 'states-uuid-3qf5iu', (e) => {
				this.setState({
					hoveredStateAbbr: '',
				});
				map.setFilter('states-uuid-hover', ['==', 'ABBREVIATION', this.state.hoveredStateAbbr])
			});

			map.on('click', (e) => {
				const state = map.queryRenderedFeatures(e.point, {
					layers: ['states-uuid-3qf5iu']
				});
				console.log(state);
				map.easeTo({
					center: [e.lngLat.lng, e.lngLat.lat],
					zoom: 6
					});
				map.panTo()
				;
			});

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
