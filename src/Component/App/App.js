import React from 'react';
import './App.css';
import { SearchResults } from '../SearchResults/SearchResults';
import { SearchBar } from '../SearchBar/SearchBar';
import { PlayList } from '../PlayList/PlayList';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [
				{
					name: 'rock',
					artist: 'Olamide Baddo',
					album: 'cappy-diem',
					id: 1,
				},
				{
					name: 'pepper them',
					artist: 'Olamide Baddo',
					album: 'cappy-diem',
					id: 2,
				},
				{
					name: 'bolanle',
					artist: 'Olamide Baddo',
					album: 'cappy-diem',
					id: 3,
				},
			],
			playlistName: 'Name',
			playlistTracks: [],
		};
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
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

	render() {
		return (
			<div>
				<h1>
					Ja<span className="highlight">mmm</span>ing
				</h1>
				<div className="App">
					<SearchBar />
					<div className="App-playlist">
						<SearchResults
							searchResults={this.state.searchResults}
							onAdd={this.addTrack}
						/>
						<PlayList
							playlistName={this.state.playlistName}
							playlistTracks={this.state.playlistTracks}
							onRemove={this.removeTrack}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
