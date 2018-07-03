import React, { Component } from 'react';
import { connect } from 'react-redux';

class Yasgui extends Component {
	constructor() {
		super();
		this.yasgui = null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.query !== prevProps.query) {
			this.yasgui.setQuery(this.props.query);
		}
	}

	componentDidMount() {
		const yasgui = window.YASGUI(document.getElementById("yasgui"), {
			api: {
				corsProxy: 'http://sparql.org/sparql'
			},
			catalogueEndpoints: {},
			endpoint: 'http://linked.opendata.cz/sparql'
		});
		this.yasgui = yasgui.current();
	}

	render() {
		return <div id="yasgui"/>;
	}
}

const mapStateToProps = appState => ({
	query: appState.yasgui.get('query')
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Yasgui);
