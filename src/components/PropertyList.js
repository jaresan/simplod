import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedProperties } from 'src/selectors/index';
import * as _ from 'underscore';
import Actions from 'src/actions';
import Property from './Property';

class PropertyList extends Component {

	onToggleOptional = (id, optional) => {
		this.props.toggleOptional(id, optional);
	};

	onToggleShow = (id, show) => {
		this.props.toggleShow(id, show);
	};

	onToggleDisabled = (id, disabled) => {
		this.props.toggleDisabled(id, disabled)
	};

	onSaveName = (id, name) => {
		this.props.onSaveName(id, name);
	};

	onDelete = id => {
		this.props.unselectProperty(id);
	};

	getProperties = () => {
		return _.map(this.props.selectedProperties, (val, id) =>
			<Property
				key={id}
				show={val.show}
				optional={val.optional}
				name={val.name}
				disabled={val.disabled}
				onToggleDisabled={ (e) => this.onToggleDisabled(id, e.target.checked) }
				onToggleOptional={e => this.onToggleOptional(id, e.target.checked)}
				onToggleShow={e => this.onToggleShow(id, e.target.checked)}
				onSaveName={e => this.onSaveName(id, e.target.value)}
				onDelete={() => this.onDelete(id)}
			/>
		);
	};


	render() {
		return (
			<ul>
				{this.getProperties()}
			</ul>
		);
	}
}

const mapStateToProps = appState => ({
	selectedProperties: getSelectedProperties(appState)
});

const mapDispatchToProps = {
	toggleOptional: Actions.Creators.r_toggleOptional,
	toggleShow: Actions.Creators.r_toggleShow,
	toggleDisabled: Actions.Creators.r_toggleDisabled,
	onSaveName: Actions.Creators.r_savePropertyName,
	unselectProperty: Actions.Creators.r_unselectProperty
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
