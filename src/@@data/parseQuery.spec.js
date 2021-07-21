import { should } from 'chai';
import { indentByBrackets } from '@@string';
import { assocPath, clone } from 'ramda';

should();

import {parseSPARQLQuery} from './parseQuery';

describe('@@data/parseQuery()', () => {
  const data = {
    "selectedProperties": {
      "property_nobel:Laureate-nobel:data1-nobel:NobelPrize": {
        "asVariable": false,
        "selected": true,
        "target": "rdf:Literal",
        "source": "nobel:Laureate",
        "predicate": "nobel:laureate",
        "targetType": "rdf:Literal",
        "varName": "data1",
        dataProperty: true
      },
      "property_nobel:Laureate-nobel:data2-nobel:NobelPrize": {
        "asVariable": false,
        "selected": true,
        "target": "rdf:Literal",
        "source": "nobel:Laureate",
        "predicate": "nobel:laureate",
        "targetType": "rdf:Literal",
        "varName": "data2",
        dataProperty: true
      },
      "property_nobel:Laureate-nobel:laureate-nobel:NobelPrize": {
        "asVariable": false,
        "selected": true,
        "target": "nobel:NobelPrize",
        "source": "nobel:Laureate",
        "predicate": "nobel:laureate",
        "targetType": "nobel:NobelPrize",
        "varName": "NobelPrize",
        "optional": true
      },
      "property_nobel:NobelPrize-nobel:laureate-nobel:Laureate": {
        "asVariable": true,
        "selected": true,
        "target": "nobel:Laureate",
        "source": "nobel:NobelPrize",
        "predicate": "nobel:laureate",
        "targetType": "nobel:Laureate",
        "varName": "Laureate"
      },
      "property_nobel:NobelPrize-nobel:laureate2-nobel:Laureate": {
        "asVariable": true,
        "selected": true,
        "target": "nobel:Laureate",
        "source": "nobel:NobelPrize",
        "predicate": "nobel:laureate2",
        "targetType": "nobel:Laureate",
        "varName": "Laureate"
      }
    },
    "selectedClasses": {
      "nobel:Laureate": {
        "selected": true,
        "asVariable": true,
        "varName": "Laureate",
        "info": {},
        "type": "nobel:Laureate",
        "id": "nobel:Laureate"
      }
    },
    "classes": {
      "nobel:Laureate": {
        "asVariable": true,
        "varName": "Laureate",
        "type": "nobel:Laureate",
        "id": "nobel:Laureate"
      },
      "nobel:NobelPrize": {
        "asVariable": true,
        "varName": "NobelPrize",
        "type": "nobel:NobelPrize",
        "id": "nobel:NobelPrize"
      }
    },
    "prefixes": {
      "nobel": "http://data.nobelprize.org/terms/",
      "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    },
    "selectionOrder": [
      "nobel:Laureate",
      "property_nobel:Laureate-nobel:laureate-nobel:NobelPrize",
      "property_nobel:NobelPrize-nobel:laureate-nobel:Laureate"
    ],
    "limit": 100,
    "limitEnabled": false,
    "propertyLanguages": []
  };

  it('should parse optional properties', () => {
    const testData = clone(data);
    testData.limitEnabled = true;
    const actual = indentByBrackets(parseSPARQLQuery(testData));
    const expected = indentByBrackets(`PREFIX nobel: <http://data.nobelprize.org/terms/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    SELECT DISTINCT ?Laureate WHERE {
      ?Laureate a nobel:Laureate.
      ?Laureate nobel:laureate ?data2.
      ?Laureate nobel:laureate ?data1.
      OPTIONAL {
          ?Laureate nobel:laureate ?NobelPrize.
          ?NobelPrize a nobel:NobelPrize.
          ?NobelPrize nobel:laureate2 ?Laureate.
          ?NobelPrize nobel:laureate ?Laureate.
        }
    }
    LIMIT 100
`);
    indentByBrackets(actual).should.eql(expected)
  });

  it('should parse data properties with lang', () => {
    let testData = assocPath(['selectedProperties', 'property_nobel:NobelPrize-nobel:laureate-nobel:Laureate', 'targetType'], 'rdf:langString', data);
    testData = assocPath(['selectedProperties', 'property_nobel:NobelPrize-nobel:laureate-nobel:Laureate', 'dataProperty'], true, testData);
    testData.propertyLanguages = ['en', 'cs'];

    const actual = indentByBrackets(parseSPARQLQuery(testData));
    const expected = indentByBrackets(`PREFIX nobel: <http://data.nobelprize.org/terms/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      SELECT DISTINCT ?Laureate WHERE {
        ?Laureate a nobel:Laureate.
        ?Laureate nobel:laureate ?data2.
        ?Laureate nobel:laureate ?data1.
        OPTIONAL {
            ?Laureate nobel:laureate ?NobelPrize.
            ?NobelPrize a nobel:NobelPrize.
            ?NobelPrize nobel:laureate ?Laureate.
            filter (lang(?Laureate) in ('en','cs')).
            ?NobelPrize nobel:laureate2 ?Laureate.
          }
      }
  `);
    indentByBrackets(actual).should.eql(expected)
  });

  it('should parse sanitize var names', () => {
    let testData = assocPath(['selectedProperties', 'property_nobel:NobelPrize-nobel:laureate-nobel:Laureate', 'varName'], 'needs-to-be-sanitized', data);
    testData = assocPath(['selectedClasses', 'nobel:Laureate', 'varName'], 'needs-to-be-sanitized', testData);
    testData = assocPath(['classes', 'nobel:Laureate', 'varName'], 'needs-to-be-sanitized', testData);

    const actual = indentByBrackets(parseSPARQLQuery(testData));
    const expected = indentByBrackets(`PREFIX nobel: <http://data.nobelprize.org/terms/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      SELECT DISTINCT ?needsToBeSanitized WHERE {
        ?needsToBeSanitized a nobel:Laureate.
        ?needsToBeSanitized nobel:laureate ?data2.
        ?needsToBeSanitized nobel:laureate ?data1.
        OPTIONAL {
            ?needsToBeSanitized nobel:laureate ?NobelPrize.
            ?NobelPrize a nobel:NobelPrize.
            ?NobelPrize nobel:laureate2 ?needsToBeSanitized.
            ?NobelPrize nobel:laureate ?needsToBeSanitized.
          }
      }
  `);
    indentByBrackets(actual).should.eql(expected)
  });
});
