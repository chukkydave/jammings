// import { SearchBar } from '../Component/SearchBar/SearchBar';

const clientId = 'a2a8e34dcee54f72aae47b8dedb6e024';
const redirectURL = 'http://localhost:3000/';
let accessToken;
const Spotify = {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		}
		// else {
		//     accessToken = window.location.href.match(/access_token=([^&]*)/);
		// }

		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/access_token=([^&]*)/);

		// console.log(accessToken, expiresIn);
		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = expiresInMatch[1];
			window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
		}
	},

	search(term) {
		const accessToken = Spotify.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				if (!data.tracks) {
					return [];
				}
				return data.tracks.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
				}));
			});
	},
};

export default Spotify;
