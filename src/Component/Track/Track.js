import React from 'react';
import './Track.css';

export class Track extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}
	renderAction() {
		let btn;
		if (this.props.isRemoval) {
			btn = (
				<button className="Track-action" onClick={this.removeTrack}>
					-
				</button>
			);
		} else {
			btn = (
				<button className="Track-action" onClick={this.addTrack}>
					+
				</button>
			);
		}
		return btn;
	}

	addTrack(e) {
		// e.preventDefault();
		this.props.onAdd(this.props.tracky);
	}
	removeTrack(e) {
		// e.preventDefault();
		this.props.onRemove(this.props.tracky);
	}

	render() {
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>{this.props.tracky.name}</h3>
					<p>
						{this.props.tracky.artist} | {this.props.tracky.album}
					</p>
				</div>
				{/* <button className="Track-action">-</button> */}
				{this.renderAction()}
			</div>
		);
	}
}
