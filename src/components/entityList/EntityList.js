import React from 'react';
import { connect } from 'react-redux';
import { getEntities } from 'src/selectors';
import {EntityEntry} from './EntityEntry';
import { List } from 'antd';

const renderEntity = id => (
	<List.Item key={id}>
		<EntityEntry id={id}/>
	</List.Item>
);

class EntityListComponent extends React.Component {
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return Object.keys(nextProps.entities).length !== Object.keys(this.props.entities).length;
	}

	render() {
		const {entities} = this.props;

		const suffix2Id = Object.entries(entities).reduce((acc, [k, entity]) => Object.assign(acc, {[k.split(':')[1].toLowerCase()]: k}), {});
		const sortedIds = Object.keys(suffix2Id).sort().map(k => suffix2Id[k]);

		return (
			<>
				{sortedIds.map(renderEntity)}
			</>
		);
	}
}

const mapStateToProps = appState => ({
	entities: getEntities(appState)
});

export const EntityList = connect(mapStateToProps, null)(EntityListComponent);
