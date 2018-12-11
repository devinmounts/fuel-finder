export const getLocation = () => {
	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition((position) => {
			resolve({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		}, () => {
			resolve(fetch('https://ipapi.co/json')
				.then(resp => resp.json())
				.then(location => {
					return {
						lat: location.latitude,
						lng: location.longitude
					};
				}));
		});
	});
}