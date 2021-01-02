import React from 'react';
import { connect } from 'react-redux';
import { getClasses, getProperties } from '@@selectors';
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


const getSearchTerm = ([id, {info: {label, description}}]) => `${id} ${label} ${description}`.toLowerCase();

class EntityListComponent extends React.Component {
	getIds() {
		const {searchText} = this.props;
		let entities = this.props.entities;
		if (this.props.onlySelected) {
			// FIXME: @immutable
			entities = entities.filter(e => e.get('selected') || e.get('propertyIds').some(pId => this.props.properties.getIn([pId, 'selected'])));
		}
		const searchTerms = entities.map((val, id) => getSearchTerm([id, val.toJS()])).toJS();
		return Object.keys(entities.toJS())
			.sort()
			.filter(id => searchTerms[id].includes(searchText.toLowerCase()));
	}

	render() {
		const filtered = this.getIds();

		return (
			<>
				{
					filtered.length ?
						filtered.map(renderEntity)
						:
						<NoDataContainer>
							<Empty
								description={
									<span>
										No data selected, begin by selecting some properties in the "Available" tab.
									</span>
								}
							/>
						</NoDataContainer>
				}
			</>
		);
	}
}

const mapStateToProps = appState => ({
	entities: getClasses(appState),
	properties: getProperties(appState)
});

export const EntityList = connect(mapStateToProps, null)(withSearch(EntityListComponent));
