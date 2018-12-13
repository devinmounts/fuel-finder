import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './styles.css';
import L from 'leaflet';
import carTopViewURL from '../../assets/images/car_topview.svg';
import gasCanURL from '../../assets/images/gas-can.svg';
import { getUserLocation, getAltFuelLocations, postMessage } from './API';
import { Button, Card, CardText } from 'reactstrap';
import MessageCardForm from '../MessageCardForm';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const carTopView = L.icon({
  iconUrl: carTopViewURL,
  iconSize: [20, 52]
});

const gasCan = L.icon({
  iconUrl: gasCanURL,
  iconSize: [20, 52]
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
			showMessageForm: false,
			sendingMessage: false,
			sentMessage: false,
			messages: [],
			haveStationsArray: false,
			stationsArray: [],
			localSelectedStation: null
		}
	}

	componentDidMount() {
		getUserLocation()
		.then(location => {
			this.setState({
				location,
				haveUserLocation: true,
				zoom: 13,
			});
		})
		.then(() => {
			getAltFuelLocations(this.state.location.lat, this.state.location.lng)
			.then((returnedArray) => {
				this.setState({
					stationsArray: returnedArray,
				});
			})
			.then(() => {
				if (this.state.stationsArray.length > 0) {
					this.setState({
						haveStationsArray: true,
					});
				}
			})
		});

	}

	cancelMessage = () => {
		this.setState({
			showMessageForm: false,
		})
	}

	showMessageForm = () => {
		this.setState({
			showMessageForm: true
		});
	}

	valueChanged = (event) => {
		const {name, value} = event.target;
		this.setState((prevState) => ({
			userMessage: {
				...prevState.userMessage,
				[name]:value
			}
		}));
	}

	formIsValid = () => {
    let { name, message } = this.state.userMessage;
    name = name.trim();
    message = message.trim();

    const validMessage =
      name.length > 0 && name.length <= 500 &&
      message.length > 0 && message.length <= 500;

    return validMessage && this.state.haveUserLocation ? true : false;
  }

	formSubmitted = (event) => {
		event.preventDefault();

		if (this.formIsValid()) {
			this.setState({
				sendingMessage: true
			});

			const message = {
				name: this.state.userMessage.name,
				message: this.state.userMessage.message,
				latitude: this.state.location.lat,
				longitude: this.state.location.lng,
			};

			postMessage(message)
				.then((result) => {
					setTimeout(() => {
						this.setState({
							sendingMessage: false,
							sentMessage: true,
						});
					}, 4000);
				});
		}
	}

	getMarkers= () => {
		const markers = this.state.stationsArray.map((station) => (
			<Marker
				key={station.id}
				position={[station.latitude, station.longitude]}
				icon={gasCan}
				onClick={() => this.handleMarkerClick(station)}
			>
				<Popup>
				<p><em>{station.station_name}</em></p>
				</Popup>
			</Marker>
		))
		return markers
	}

	handleMarkerClick = (station) => {
		console.log('click', station)
		this.setState({
			localSelectedStation: station
		});
		this.props.onSetFuelStation(station)
	}

	render() {
		const userPosition = [this.state.location.lat, this.state.location.lng]
		return(
			<div className='map'>
			<div className='form-box'>
				<div className='form-container'>
					{this.state.localSelectedStation ? 
						!this.state.showMessageForm ? 
							<Button className='message-form' onClick={this.showMessageForm} color='info'>Post a Message</Button> :
							!this.state.sentMessage ? 
							<MessageCardForm
								cancelMessage={this.cancelMessage}
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
						: ''
						
					
					}
				</div>
			</div>
				<Map className='map' center={userPosition} zoom={this.state.zoom} maxZoom={18} >
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{ this.state.haveUserLocation ?
						<Marker 
							position={userPosition}
							icon={carTopView}>
						</Marker>
						: ''
					}
					<MarkerClusterGroup>
						{this.getMarkers()}
					</MarkerClusterGroup>
				</Map>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	fuelStation: state.fuelStationState,
});

const mapDispatchToProps = dispatch => ({
	onSetFuelStation: fuelStation => {
		dispatch({ type: 'STATION_SET', fuelStation})
	}
});

HomeMap.Proptypes = {
	fuelStation: PropTypes.object,
	onSetFuelStation: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMap);