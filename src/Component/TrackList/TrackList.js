import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
				{this.props.tracks &&
					this.props.tracks.map((track) => {
						return (
							<Track
								tracky={track}
								key={track.id}
								// isRemoval={this.props.isRemoval}
								onAdd={this.props.onAdd}
							/>
						);
					})}
			</div>
		);
	}
}
