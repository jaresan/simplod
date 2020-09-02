---
layout: default
title: Linked data viewer
sidebar:
  nav: "docs"
---
Data schema example:
```ttl
<urn:uuid:1cf291d4-a8ca-478f-bb67-44f4a1738d31> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<http://purl.org/ontology/bibo/Collection/instance> a <http://purl.org/ontology/bibo/Collection> .

<urn:uuid:bbfa34d7-75d6-4973-9771-1ecfb2014614> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#isSubcommunityOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:b98c9a1e-d20c-4a07-a925-87e7e4d07744> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/homepage>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:295002f4-2ab0-49e4-a2d7-f71bbcfd53a7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:058470d9-48cf-413d-babe-4edc76d6ee9b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://rdfs.org/ns/void#sparqlEndpoint>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:bfa27ec7-f8f2-4870-b51f-78ea42d08d10> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#hasCollection>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:a2324027-7580-49d0-abdf-2917b66363ad> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/homepage>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:b322c224-1c3f-45a0-a03b-da1db21a46bb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:1addda77-0b78-49e0-9f6c-e6b290c109a4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#hasItem>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:4f36e5dd-2a25-46f7-9b4f-91b20e985ce2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://rdfs.org/ns/void#sparqlEndpoint>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:11146bc9-f60d-4ccb-bf10-29e6270e042f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:cba0e4fe-4852-498a-94e4-2a29417c5c2b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#isPartOfCommunity>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:4f4faa68-583a-4aa8-a956-c83530eb352e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:14c57522-ce3d-48a7-bb53-0568e478a43b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:1159e7ba-aca7-437f-a439-0ead715dafd1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/homepage>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:9fb3f0ef-5df2-49ba-8884-a0fce9f663fe> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#hasSubcommunity>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:853db21e-deef-4e33-9b4e-9d00f9b09e97> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://rdfs.org/ns/void#sparqlEndpoint>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:a11ea949-05b5-478b-bea0-89783f629847> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#hasCollection>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:7120184c-6fe9-4ff4-bb0b-4b2e409b45b2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#isPartOfRepository>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:79a67cdc-3be6-4852-8559-27e7353711ba> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/homepage>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:f65baa4a-4ed7-4f6c-8598-a07b23ab5848> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:f956e1ac-c7c7-4c17-9548-f07882eef1bb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#hasItem>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:1a9103d7-4b57-4bd7-a1a0-276d12966ec7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://rdfs.org/ns/void#sparqlEndpoint>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:245819f0-ad60-48f0-b260-43b4df456eea> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:5dc60527-f3d9-4288-aea9-6f9174fdabc6> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#isPartOfCommunity>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:5f89400b-c515-4071-b013-777c630ca02e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/homepage>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:1d5b81fc-c81d-4d58-94db-b634eceb76ca> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:ced65c6f-d8cd-4a8e-801b-98bf3eed6f55> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#hasItem>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:2692f91a-9b2a-405d-8479-a0acc40e1785> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://rdfs.org/ns/void#sparqlEndpoint>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:efb03810-a554-46b1-8230-ae51327bb71c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .

<urn:uuid:a51544cd-4525-4293-afca-eab05ed36341> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://purl.org/ontology/bibo/Collection/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://digital-repositories.org/ontologies/dspace/0.1.0#isPartOfCommunity>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://purl.org/ontology/bibo/Collection/instance> .
```