import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedProperties } from '../../selectors';
import {map} from 'ramda';
import Actions from 'src/actions/model';
import {Checkbox, Input} from 'antd';
import styled from '@emotion/styled';


const StyledInput = styled(Input)`	
	background: ${({disabled}) => disabled ? 'lightgrey' : 'default'};
	width: 128px;	
`;

const Property = ({asVariable, optional, name, onToggleAsVariable, onToggleOptional, onSaveName}) => (
	<li>
		<Checkbox
			onChange={onToggleAsVariable}
			name="As variable"
			checked={asVariable}
		>
			As variable
		</Checkbox>
		<Checkbox
			checked={!!optional}
			name="Optional"
			onChange={onToggleOptional}
		>
			Optional
		</Checkbox>
		<StyledInput
			type="text"
			disabled={!asVariable}
			defaultValue={name}
			onChange={onSaveName}
		/>
	</li>
);

class PropertyList extends Component {

	onToggleOptional = (id, optional) => {
		this.props.toggleOptional(id, optional);
	};

	onToggleAsVariable = (id, asVariable) => {
		this.props.toggleAsVariable(id, asVariable);
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
				asVariable={val.asVariable}
				optional={val.optional}
				name={val.name}
				onToggleOptional={e => this.onToggleOptional(id, e.target.checked)}
				onToggleAsVariable={e => this.onToggleAsVariable(id, e.target.checked)}
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
	toggleAsVariable: Actions.Creators.r_togglePropertyAsVariable,
	onSaveName: Actions.Creators.r_savePropertyName,
	unselectProperty: Actions.Creators.r_unselectProperty
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
