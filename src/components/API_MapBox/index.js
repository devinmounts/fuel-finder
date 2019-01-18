export const getAllFuelLocations = () => {
	return new Promise((resolve) => {
		resolve(fetch(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=${process.env.REACT_APP_ALT_FUEL_STATIONS_API_KEY}`)
		.then(res => res.json())
		.then(res => {
			let stationsArrayGEOJSON = res.fuel_stations.map(station => (
				{type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [station.longitude, station.latitude]
			},
			properties: {
				id: station.id,
				fuel_type: station.fuel_type_code
			}
		}
			))
			console.log( { type: "FeatureCollection",
							 features: stationsArrayGEOJSON 
							})
		}));
	});
}
