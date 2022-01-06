import React from 'react';
import './PlayList.css';
import { TrackList } from '../TrackList/TrackList';

export class PlayList extends React.Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(e) {
		e.preventDefault();
		let val = e.target.value;
		this.props.onNameChange(val);
	}

	render() {
		return (
			<div className="Playlist">
				<input defaultValue="New Playlist" onChange={this.handleNameChange} />
				{/* <!-- Add a TrackList component --> */}
				<TrackList
					playlistTracks={this.props.playlistTracks}
					onRemove={this.props.onRemove}
					isRemoval={true}
				/>
				<button className="Playlist-save">SAVE TO SPOTIFY</button>
			</div>
		);
	}
}
