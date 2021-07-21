---
layout: default
title: Simplod
sidebar:
  nav: "docs"
---
Visualization tool for simplifying access to Linked Data.

The goal of this application is to provide users with a visualization tool which
would allow them to query basic data without the need to learn SPARQL or
understand RDF.

Consider the following example data schema described in [an example .ttl file](https://jaresan.github.io/simplod/example.ttl)
containing a description of Nobel Prize data schema.

To query for Nobel prizes and their laureates, the users would
first have to have an understanding of what the data schema represents
and would have to know how to write the following SPARQL query:
```sql
PREFIX nobel: <http://data.nobelprize.org/terms/>
SELECT DISTINCT ?NobelPrize ?Laureate WHERE {
  ?NobelPrize a nobel:NobelPrize.
  ?NobelPrize nobel:laureate ?Laureate.
  ?Laureate a nobel:Laureate.
} 
```

With the application, the data schema in question would be visualized as follows:

![Data schema visualization](https://jaresan.github.io/simplod/images/default_view.png)

The user can immediately see the connections between the entities and
can create selections to query for the data they are interested in.

Querying for the Nobel prizes and their laureates would then be as easy as doing the following,
which would in turn create the query mentioned above:

<img src="https://jaresan.github.io/simplod/images/selected.png" alt="drawing" width="512"/>

The user can then just run the query using the
<img src="https://cdn3.iconfinder.com/data/icons/iconic-1/32/play_alt-512.png" alt="drawing" width="16"/> button
to produce the following results:
![Query results](https://jaresan.github.io/simplod/images/query.png)

Additional examples providing a closer look at the functionality of the application can be found
in the [PDF Documentation](https://jaresan.github.io/simplod/documentation.pdf) under 5.1.5 Examples.


# Navigation
- [Data schema example](https://jaresan.github.io/simplod/dataSchema.html) &rarr; example data schema describing Nobel prize information
- [Live Demo](https://jaresan.github.io/simplod/demo.html?schemaURL=https%3A%2F%2Fjaresan.github.io%2Fsimplod%2Fexamples%2Fexample.ttl&endpointURL=http%3A%2F%2Fdata.nobelprize.org%2Fstore%2Fsparql) &rarr; Live demo of the application with Nobel prize data schema loaded
- [Development](https://jaresan.github.io/simplod/development.html) &rarr; How to start developing the application
- [Deployment](https://jaresan.github.io/simplod/deployment.html) &rarr; How to deploy the application
- [JSDoc](https://jaresan.github.io/simplod/documentation/index.html) &rarr; JavaScript generated documentation
- [PDF Documentation](https://jaresan.github.io/simplod/documentation.pdf) &rarr; Extensive PDF documentation describing the application, its means of deployment and development 
