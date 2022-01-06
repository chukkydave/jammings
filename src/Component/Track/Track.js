import React from 'react';

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
					<h3>Name</h3>
					<p>Track artist | album Name</p>
				</div>
				{/* <button className="Track-action">-</button> */}
				{this.renderAction()}
			</div>
		);
	}
}
