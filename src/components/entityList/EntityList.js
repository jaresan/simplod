import React from 'react';
import { connect } from 'react-redux';
import { getEntities } from 'src/selectors';
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

class EntityListComponent extends React.Component {
	getSortedIds() {
		const entities = this.props.entities.toJS();
		return Object.keys(entities).sort();
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
	entities: getEntities(appState)
});

export const EntityList = connect(mapStateToProps, null)(withSearch(EntityListComponent));
