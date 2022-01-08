// import { SearchBar } from '../Component/SearchBar/SearchBar';

const clientId = 'a2a8e34dcee54f72aae47b8dedb6e024';
const redirectURL = 'http://localhost:3000/';
let accessToken;
const Spotify = {
	getAccessToken() {
		if (accessToken) {
			alert(accessToken);
			return accessToken;
		}

		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/access_token=([^&]*)/);

		// console.log(accessToken, expiresIn);
		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);
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

	savePlaylist(name, trackUris) {
		if (!name || !trackUris.length) {
			return;
		}

		const accessToken = Spotify.getAccessToken();
		const auth = {
			Authorization: `Bearer ${accessToken}`,
		};
		let userId;
		fetch(`https://api.spotify.com/v1/me`, {
			headers: auth,
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				userId = data.id;
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					method: 'POST',
					headers: {
						headers: auth,
					},
					body: JSON.stringify({ name: name })
						.then((response) => response.json())
						.then((data) => {
							const playlistId = data.id;
							return fetch(
								`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
								{
									method: 'POST',
									headers: {
										headers: auth,
									},
									body: JSON.stringify({ uris: trackUris }),
								},
							);
						}),
				});
			});
	},
};

export default Spotify;
