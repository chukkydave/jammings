import React from 'react';
import './App.css';
import { SearchResults } from '../SearchResults/SearchResults';
import { SearchBar } from '../SearchBar/SearchBar';
import { PlayList } from '../PlayList/PlayList';
import Spotify from '../../Util/Spotify';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			playlistName: 'Playlist Name',
			playlistTracks: [],
		};
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
	}

	addTrack(track) {
		let trackId = track.id;
		let playlistArr = this.state.playlistTracks;
		const result = playlistArr.filter((singleTrack) => {
			return trackId === singleTrack.id;
		});
		if (result.length === 0) {
			playlistArr.push(track);
			this.setState({
				playlistTracks: playlistArr,
			});
		}
	}

	removeTrack(track) {
		let trackId = track.id;
		let playlistArr = this.state.playlistTracks;
		playlistArr.forEach((val, ind) => {
			if (val.id === trackId) {
				playlistArr.splice(ind, 1);
			}
		});
		this.setState({
			playlistTracks: playlistArr,
		});
		// const result = playlistArr.filter((singleTrack, index) => {
		//   if (trackId === singleTrack.id) {
		//     playlistArr.splice(index,1)
		//   }
		// 	return trackId === singleTrack.id;
		// });
	}

	updatePlaylistName(name) {
		this.setState({ playlistName: name });
	}

	savePlaylist() {
		const trackUris = this.state.playlistTracks.map((track) => track.uri);
		Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
			this.setState({
				playlistName: 'New Playlist',
				playlistTracks: [],
			});
		});
	}

	search(term) {
		Spotify.search(term).then((res) => {
			this.setState({ searchResults: res });
		});
	}

	render() {
		return (
			<div>
				<h1>
					Ja<span className="highlight">mmm</span>ing
				</h1>
				<div className="App">
					<SearchBar onSearch={this.search} />
					<div className="App-playlist">
						<SearchResults
							searchResults={this.state.searchResults}
							onAdd={this.addTrack}
						/>
						<PlayList
							playlistName={this.state.playlistName}
							playlistTracks={this.state.playlistTracks}
							onRemove={this.removeTrack}
							onNameChange={this.updatePlaylistName}
							onSave={this.savePlaylist}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
