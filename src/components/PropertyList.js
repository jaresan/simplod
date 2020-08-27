import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedProperties } from '../selectors';
import {map} from 'ramda';
import Actions from 'src/actions/model';
import styled from '@emotion/styled';


const Input = styled.input`	
	background: ${({disabled}) => disabled ? 'lightgrey' : 'default'};	
`;

const Property = ({show, optional, name, onToggleShow, onToggleOptional, onSaveName}) => (
	<li>
		<label>
			<input type="checkbox" name="show" value="show" checked={!!show} onChange={onToggleShow}/>
			Show
		</label>
		<label>
			<input type="checkbox" name="optional" value="optional" checked={!!optional} onChange={onToggleOptional}/>
			Optional
		</label>
		<Input
			type="text"
			disabled={!show}
			defaultValue={name}
			onChange={onSaveName}
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
	onSaveName: Actions.Creators.r_savePropertyName,
	unselectProperty: Actions.Creators.r_unselectProperty
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
