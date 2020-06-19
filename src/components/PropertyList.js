import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedProperties } from 'src/selectors/index';
import {map} from 'ramda';
import Actions from 'src/actions/model';
import styled from '@emotion/styled';

const Input = styled.input`
	background: ${({disabled}) => disabled ? 'lightgrey' : 'default'};
`;

const Property = ({show, disabled, optional, name, onToggleShow, onToggleOptional, onSaveName, onDelete, onToggleDisabled}) => (
	<li>
		<label>
			<input type="checkbox" name="show" value="show" checked={!!show} onChange={onToggleShow}/>
			Show
		</label>
		<label>
			<input type="checkbox" name="optional" value="optional" checked={!!optional} onChange={onToggleOptional}/>
			Optional
		</label>
		<label>
			<input type="checkbox" name="disabled" value="disabled" checked={!!disabled} onChange={onToggleDisabled}/>
			Disabled
		</label>
		<Input
			type="text"
			disabled={!show || disabled}
			defaultValue={name}
			onBlur={onSaveName}
		/>
	</li>
);

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
		return map(([id, val]) =>
			<Property
				key={id}
				show={val.show}
				optional={val.optional}
				name={val.name}
				disabled={val.disabled}
				onToggleDisabled={e => this.onToggleDisabled(id, e.target.checked) }
				onToggleOptional={e => this.onToggleOptional(id, e.target.checked)}
				onToggleShow={e => this.onToggleShow(id, e.target.checked)}
				onSaveName={e => this.onSaveName(id, e.target.value)}
				onDelete={() => this.onDelete(id)}
			/>,
			Object.entries(this.props.selectedProperties)
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
	toggleOptional: Actions.Creators.r_togglePropertyOptional,
	toggleShow: Actions.Creators.r_togglePropertyShow,
	toggleDisabled: Actions.Creators.r_togglePropertyDisabled,
	onSaveName: Actions.Creators.r_savePropertyName,
	unselectProperty: Actions.Creators.r_unselectProperty
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
