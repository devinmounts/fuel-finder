export const getUserLocation = () => {
	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition((position) => {
			resolve({
				log: console.log(position),
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		}, () => {
			resolve(fetch('https://ipapi.co/json')
				.then(resp => resp.json())
				.then(location => {
					return {
						log: console.log(location),
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

export const getAltFuelLocations = (zip, city, state) => {
	return new Promise((resolve) => {
		resolve(fetch(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?zip=${zip}&limit=20&api_key=yMXElhx7X03lNsTLOYB4MrhzyQiM9r9JOMHAVMPx&format=JSON`)
		.then(resp => resp.json())
		.then(resp => {
			console.log(resp)
		})
		
		)
	})
}