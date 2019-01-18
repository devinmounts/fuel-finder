// const printIconForFuelType = (fuelType) => {
//   switch(fuelType) {
//     case "ELEC":
//       return "electric"
//     case "BD":
//       return 'bio-diesel'
//     case "CNG":
//       return ''
//     case "BD":
//       return 'bio-diesel'
//     case "BD":
//       return 'bio-diesel'
//     case "BD":
//       return 'bio-diesel'
    
//   }

// }

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
        fuel_type: station.fuel_type_code,
        icon: station.fuel_type_code,
			}
		}
      ))
      console.log(JSON.stringify({ type: "FeatureCollection",
      features: stationsArrayGEOJSON 
     }));
			// return JSON.stringify({ type: "FeatureCollection",
			// 				 features: stationsArrayGEOJSON 
			// 				});
		}));
	});
}

