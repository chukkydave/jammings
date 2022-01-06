import React from 'react';
import './Track.css';

export class Track extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.renderAction = this.renderAction.bind(this);
	// }
	renderAction() {
		let btn = <button className="Track-action">-</button>;
		// if (this.props.isRemoval) {
		// 	btn = <button className="Track-action">-</button>;
		// } else {
		// 	btn = <button className="Track-action">+</button>;
		// }
		return btn;
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
