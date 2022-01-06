import React from 'react';
import './PlayList.css';
import { TrackList } from '../TrackList/TrackList';

export class PlayList extends React.Component {
	render() {
		return (
			<div className="Playlist">
				<input defaultValue="New Playlist" />
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
