import React from 'react';
import { connect } from 'react-redux';
import { getEntities, getProperties } from 'src/selectors';
import {EntityEntry} from './EntityEntry';
import { List, Empty } from 'antd';
import { withSearch } from '../withSearch';
import styled from '@emotion/styled';

const EntityRow = styled(List.Item)`
	width: 100%;
	padding: 0;
`;

const NoDataContainer = styled.div`
	height: 320px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const renderEntity = id => (
	<EntityRow key={id}>
		<EntityEntry id={id}/>
	</EntityRow>
);

const idMatches = text => id => id.toLowerCase().includes(text.toLowerCase());

// FIXME: Add searchTerm to entities to search through

class EntityListComponent extends React.Component {
	getSortedIds() {
		let entities = this.props.entities;
		if (this.props.onlySelected) {
			entities = entities.filter(e => e.get('propertyIds').some(pId => this.props.properties.getIn([pId, 'selected'])));
		}
		return Object.keys(entities.toJS()).sort();
	}

	render() {
		const {searchText} = this.props;
		const filtered = this.getSortedIds().filter(idMatches(searchText));

		return (
			<>
				{filtered.length ? filtered.map(renderEntity) : <NoDataContainer><Empty /></NoDataContainer>}
			</>
		);
	}
}

const mapStateToProps = appState => ({
	entities: getEntities(appState),
	properties: getProperties(appState)
});

export const EntityList = connect(mapStateToProps, null)(withSearch(EntityListComponent));
