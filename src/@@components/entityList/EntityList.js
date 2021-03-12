import React from 'react';
import {connect} from 'react-redux';
import { getAppLoaded, getClasses, getProperties } from '@@selectors';
import {EntityEntry} from './EntityEntry';
import {List, Empty, Spin} from 'antd';
import {filter, mapObjIndexed, path, any} from 'ramda';
import {withSearch} from '../withSearch';
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
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (!this.props.active) {
			this.didRecalculate = false;
		}
	}

	getIds() {
		const {searchText} = this.props;
		let entities = this.props.entities;

		if (this.props.onlySelected && this.didRecalculate) {
			const searchTerms = mapObjIndexed((val, id) => getSearchTerm([id, val]), entities);

			return this.ids
				.sort()
				.filter(id => searchTerms[id].includes(searchText.toLowerCase()));
		}

		if (this.props.onlySelected && !this.didRecalculate) {
			// FIXME: @reference don't use e.selected e.propertyIds, 'selected'
			entities = filter(e => e.selected || any(pId => path([pId, 'selected'], this.props.properties), e.propertyIds), entities);
			this.didRecalculate = true;
		}

		const searchTerms = mapObjIndexed((val, id) => getSearchTerm([id, val]), entities);
		this.ids = Object.keys(entities)
			.sort()
			.filter(id => searchTerms[id].includes(searchText.toLowerCase()));

		return this.ids;
	}

	render() {
		const filtered = this.getIds();

		if (!this.props.loaded) {
			return <Spin>
				<NoDataContainer/>
			</Spin>
		}

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
	properties: getProperties(appState),
	loaded: getAppLoaded(appState)
});

export const EntityList = connect(mapStateToProps, null)(withSearch(EntityListComponent));
