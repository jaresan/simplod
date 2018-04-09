export const classes = {
	'nku:KontrolníAkce': {
		's:instrument': 'lex:Regulation',
		'nku:čísloKontrolníAkce': 'String',
		'nku:stavKontrolníAkce': 'skos:Concept',
		'nku:předmět': 'String',
		'nku:kontrolovanáOsoba': 'nku:KontrolovanáOsoba',
		'nku:kontrolníZávěr': '?',
		's:containedIn': 'ruian:Okres'
	},
	'lex:Regulation': {
		'dct:title': 'String'
	},
	'skos:Concept': {
		'skos:prefLabel': 'String',
		'skos:inScheme': 'skos:ConceptScheme'
	},
	'skos:ConceptScheme': {
		'rdfs:label': 'String',
		'rdfs:comment': 'String'
	},
	'nku:KontrolovanáOsoba': {
		'owl:sameAs': 'rov:RegisteredOrganization',
		's:name': 'String',
		's:containedIn': 'ruian:Okres'
	},
	'ruian:Okres': {
		's:name': 'String'
	}
};
