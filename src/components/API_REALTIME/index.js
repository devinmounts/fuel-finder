const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/messages' : ''
const REALTIME_API_URL = window.location.hostname === 'localhost' ? 'http://localhost:9000/api' : ''

export const getUserLocation = () => {
	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition((position) => {
			resolve({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		}, () => {
			resolve(fetch('https://ipapi.co/json')
				.then(res => res.json())
				.then(location => {
					return {
						lat: location.latitude,
						lng: location.longitude,
						zip: location.postal,
						city: location.city,
						state: location.region_code,
					};
				}));
		});
	});
}

export const getAltFuelLocations = (lat, lng) => {
	return new Promise((resolve) => {
		resolve(fetch(`https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=yMXElhx7X03lNsTLOYB4MrhzyQiM9r9JOMHAVMPx&latitude=${lat}&longitude=${lng}&limit=200`)
		.then(res => res.json())
		.then(res => {
			let stationsArray = res.fuel_stations.map(station => (
				{...station}
			))
			return stationsArray;
		})
		
		)
	})
}

export function postMessage(message) {
	console.log('message', message);
  return fetch(`${REALTIME_API_URL}/new`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(message)
	}).then(console.log);
}

export function getMessagesAtStationID(station_id) {
	return fetch(`${REALTIME_API_URL}/stations/${station_id}`)
		.then(res => res.json())
		.then(messagesArray => {
			return messagesArray
		});
}

export function updateMessage(updatedMessage) {
	const { _id } = updatedMessage;
	return fetch(`${REALTIME_API_URL}/${_id}`, {
		method: 'put',
		headers: {
      'content-type': 'application/json',
    },
		mode: 'cors',
    body: JSON.stringify(updatedMessage)
	}).then(res => res.json())
	.then(response => console.log('Success:', JSON.stringify(response)))
	.catch(error => console.error('Error:', error));
}

export function deleteMessage(messageId) {
	return fetch(`${REALTIME_API_URL}/${messageId}`, {
		method: 'delete'
	}).then(console.log);
}