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