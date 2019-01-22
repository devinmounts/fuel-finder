import {stateGeoJson} from './../../assets/state_geojson';

/** Fetch All stations and format as GEOJson to be uploaded to MapBox DB */
export const getAllFuelLocationsToGeoJson = () => {
	return new Promise((resolve) => {
		resolve(fetch(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=${process.env.REACT_APP_ALT_FUEL_STATIONS_API_KEY}`)
		.then(res => res.json())
		.then(res => {
			console.log(res)
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
			return JSON.stringify({ type: "FeatureCollection",
							 features: stationsArrayGEOJSON 
							});
		}));
	});
}


const abbreviations = {
	"AL": "Alabama",
	"AK": "Alaska",
	"AS": "American Samoa",
	"AZ": "Arizona",
	"AR": "Arkansas",
	"CA": "California",
	"CO": "Colorado",
	"CT": "Connecticut",
	"DE": "Delaware",
	"DC": "District Of Columbia",
	"FM": "Federated States Of Micronesia",
	"FL": "Florida",
	"GA": "Georgia",
	"GU": "Guam",
	"HI": "Hawaii",
	"ID": "Idaho",
	"IL": "Illinois",
	"IN": "Indiana",
	"IA": "Iowa",
	"KS": "Kansas",
	"KY": "Kentucky",
	"LA": "Louisiana",
	"ME": "Maine",
	"MH": "Marshall Islands",
	"MD": "Maryland",
	"MA": "Massachusetts",
	"MI": "Michigan",
	"MN": "Minnesota",
	"MS": "Mississippi",
	"MO": "Missouri",
	"MT": "Montana",
	"NE": "Nebraska",
	"NV": "Nevada",
	"NH": "New Hampshire",
	"NJ": "New Jersey",
	"NM": "New Mexico",
	"NY": "New York",
	"NC": "North Carolina",
	"ND": "North Dakota",
	"MP": "Northern Mariana Islands",
	"OH": "Ohio",
	"OK": "Oklahoma",
	"OR": "Oregon",
	"PW": "Palau",
	"PA": "Pennsylvania",
	"PR": "Puerto Rico",
	"RI": "Rhode Island",
	"SC": "South Carolina",
	"SD": "South Dakota",
	"TN": "Tennessee",
	"TX": "Texas",
	"UT": "Utah",
	"VT": "Vermont",
	"VI": "Virgin Islands",
	"VA": "Virginia",
	"WA": "Washington",
	"WV": "West Virginia",
	"WI": "Wisconsin",
	"WY": "Wyoming"
}

/** Retrieve all Fuel Locations from NREL API */
 const getAllFuelLocations = () => {
	return new Promise((resolve) => {
		resolve(fetch(`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=${process.env.REACT_APP_ALT_FUEL_STATIONS_API_KEY}`)
		.then(res => res.json())
		.then(res => {
			return res;
		}));
	});
}

/**  */
export const runFetchUpdateAndAddFuelStations = () => {
	stateGeoJson.features.map(feature => { 
		if (!feature.properties.ABBREVIATION) {
			feature.properties.ABBREVIATION = ''
		}
		const key = Object.keys(abbreviations).find(key => abbreviations[key] === feature.properties.NAME);
		feature.properties.ABBREVIATION = key;
		if(feature.properties.CENSUSAREA) {
			delete feature.properties.CENSUSAREA
			feature.properties.FUEL_STATIONS = 0;
		}
		});
		getAllFuelLocations()
			.then(result => {
				result.fuel_stations.forEach(station => {
					stateGeoJson.features.map(feature => {
						if( station.state === feature.properties.ABBREVIATION ) {
							feature.properties.FUEL_STATIONS += 1;
						}
					})
				})
				console.log(JSON.stringify(stateGeoJson));
			});
		}


