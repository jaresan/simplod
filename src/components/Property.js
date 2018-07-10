import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Property.css';

class Property extends Component {
	static propTypes = {
		show: PropTypes.bool.isRequired,
		optional: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
		onToggleShow: PropTypes.func,
		onToggleOptional: PropTypes.func,
		onSaveName: PropTypes.func,
		onDelete: PropTypes.func
	};

	// FIXME: Add submit on enter
	render() {
		return (
			<li>
				<label>
					<input type="checkbox" name="show" value="show" checked={this.props.show} onChange={this.props.onToggleShow}/>
					Show
				</label>
				<label>
					<input type="checkbox" name="optional" value="optional" checked={this.props.optional} onChange={this.props.onToggleOptional}/>
					Optional
				</label>
				<input
					type="text"
					disabled={!this.props.show}
					className={cx({
						disabled: !this.props.show
					})}
					defaultValue={this.props.name}
					onBlur={this.props.onSaveName}
				/>
				<button onClick={this.props.onDelete}>X</button>
			</li>
		);
	}
}

export default Property;
