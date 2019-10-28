import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Property.css';

class Property extends Component {
	static propTypes = {
		show: PropTypes.bool.isRequired,
		disabled: PropTypes.bool.isRequired,
		optional: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
		onToggleShow: PropTypes.func,
		onToggleOptional: PropTypes.func,
		onSaveName: PropTypes.func,
		onDelete: PropTypes.func
	};

	// TODO: Add submit on enter
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
				<label>
					<input type="checkbox" name="disabled" value="disabled" checked={this.props.disabled} onChange={this.props.onToggleDisabled}/>
					Disabled
				</label>
				<input
					type="text"
					disabled={!this.props.show || this.props.disabled}
					className={cx({
						disabled: !this.props.show || this.props.disabled
					})}
					defaultValue={this.props.name}
					onBlur={this.props.onSaveName}
				/>
			</li>
		);
	}
}

export default Property;
