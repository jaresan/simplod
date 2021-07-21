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

Querying for the Nobel prizes and their laureates would then be as easy as doing the following:

![Selected Nobel prize data](https://jaresan.github.io/simplod/images/selected.png)


# Navigation
- Data schema example &rarr; example data schema describing Nobel prize information
- Live Demo &rarr; Live demo of the application with Nobel prize data schema loaded
- Development &rarr; How to start developing the application
- Deployment &rarr; How to deploy the application
- JSDoc &rarr; JavaScript generated documentation
- PDF Documentation &rarr; Extensive PDF documentation describing the application, its the means of deployment and development 
