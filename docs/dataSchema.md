---
layout: default
title: Linked data viewer
sidebar:
  nav: "docs"
---
Data schema example:
```ttl

<urn:uuid:baf770fd-fe82-4467-be0b-9f158f38583e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/FileType/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/fileType>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<http://data.nobelprize.org/terms/AwardFile/instance> a <http://data.nobelprize.org/terms/AwardFile> .

<http://data.nobelprize.org/terms/FileType/instance> a <http://data.nobelprize.org/terms/FileType> .

<urn:uuid:e6670b14-b31e-4177-82d8-d34c1efc154d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:d1691dab-514c-40e4-9ba2-349763ba5b98> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<http://data.nobelprize.org/terms/Category/instance> a <http://data.nobelprize.org/terms/Category> .

<urn:uuid:6cb1056b-fb58-4731-a7a2-f51da278ea80> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#seeAlso>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:d14fb8f8-e015-45c5-a245-19180ecd7238> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:7f16aa90-1d8b-4e1d-9dee-0d276513c8db> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<http://xmlns.com/foaf/0.1/Person/instance> a <http://xmlns.com/foaf/0.1/Person> .

<urn:uuid:277c38f0-c27d-45c8-b250-c5ef5fa5701f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/gender>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:b7ac784a-9021-4610-92dd-24212f0db5b7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<http://data.nobelprize.org/terms/LaureateAward/instance> a <http://data.nobelprize.org/terms/LaureateAward> .

<urn:uuid:d475c4da-8086-49e0-a5e3-0ac5c00b18b5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<http://dbpedia.org/ontology/Award/instance> a <http://dbpedia.org/ontology/Award> .

<urn:uuid:028441b4-7479-4c08-93f2-552f3448c9e9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:d987549b-018d-4090-ad68-c6d408eb8ac5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<http://data.nobelprize.org/terms/NobelPrize/instance> a <http://data.nobelprize.org/terms/NobelPrize> .

<urn:uuid:19950838-1ffd-4cf1-9a5a-172b05163b1a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<http://dbpedia.org/ontology/City/instance> a <http://dbpedia.org/ontology/City> .

<urn:uuid:2b86c2bb-713f-4a34-a419-649934fb680c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/familyName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:071371aa-5602-4f20-bca5-9d0b50252c6e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:d1d0e1cb-9cce-495a-afdc-b5ae7faef590> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:cc57712c-c505-49ee-ac00-37745bd6d490> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/birthday>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:e9b124b1-d5a7-4786-b5cc-223e66926539> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfBirth>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:7cbe90a2-bfd4-4bd0-8039-3ab93defac21> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<http://dbpedia.org/ontology/Country/instance> a <http://dbpedia.org/ontology/Country> .

<urn:uuid:efa45057-a97b-4556-affa-1c0abf30735f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/University/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/affiliation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<http://dbpedia.org/ontology/University/instance> a <http://dbpedia.org/ontology/University> .

<urn:uuid:24e8c211-60b1-45f4-b4e0-6ce5b9b4322f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:4b2087eb-4a2a-4377-95e4-c3c7e53fece4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/share>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:d6d1c5bb-042b-47ae-b0d4-1c63eb296478> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/motivation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:b13eb97f-8a82-45b6-a675-74ebe3b46b29> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/AwardFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/awardFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:5cda191a-d4f5-4518-8363-7ea21762fd9d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:c8ec05ca-e5da-44f4-9007-5007f1b451ca> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:943a8c52-6067-45ef-a05a-08a117a8afca> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/field>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:9c1dcee2-ab5f-4440-8938-5da76a1b6356> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:89d1b2f7-0b5d-42a8-a504-900461f1f408> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/University/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/university>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:c00a0a11-6233-4315-9fdc-0acd70c171da> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<http://data.nobelprize.org/terms/Laureate/instance> a <http://data.nobelprize.org/terms/Laureate> .

<urn:uuid:ed4263d4-815b-4297-8ada-99320e251464> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Person/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:328f63a1-2400-418c-a068-de290defb75c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:07d92c1b-d150-4792-82a9-38cb24fc79f0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:c33f4f62-e70b-4532-a807-9aa6de106350> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:073009c4-2f64-403e-9572-0e8cb92b8f17> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#seeAlso>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:a24208d2-c075-4aea-a875-74c4c39f7245> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:e3a6505e-0f59-4489-bb6f-7c226fe20f59> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/FileType/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/fileType>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:268941d1-a51b-4032-9437-377b9e78dad1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<http://xmlns.com/foaf/0.1/Organization/instance> a <http://xmlns.com/foaf/0.1/Organization> .

<urn:uuid:d31986d9-5616-4ccc-96eb-5419ec98149c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:658cec7e-e06e-438a-89e9-6c0eb1f40661> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:9c6d3bf3-9ce1-4ec1-9563-5076534ad1e9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:520fe82c-70e4-4d87-8cb5-e1fbd2d0375e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:8af8ac86-1b6b-4e91-8fd4-fe0cee97d933> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:f225c343-c9c1-40e6-b19a-315da3df3254> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:fdcced11-9644-45ba-93d0-fa2501cd3d65> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:3e2f8f70-132c-43e4-9ebb-3a797a2aef89> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#hiddenLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:072cc1fe-d7a1-4128-9f98-206452ee3ede> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:0b707518-d733-49df-b51c-7b77e141befe> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:862f5d48-5f40-4ce1-9069-3ea6379b5172> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#prefLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:e37eb9df-3739-488d-ac8a-69b9b70dcb53> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#value>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:1ecefd86-e2dd-4bf8-927a-39b3201bffe7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#altLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:8d0b4a7a-b103-44ce-a82c-cb19602c7938> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/FileType/instance> .

<urn:uuid:7d84b14b-e85b-44b3-95b1-a56e766ee04f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/PrizeFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/prizeFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<http://data.nobelprize.org/terms/PrizeFile/instance> a <http://data.nobelprize.org/terms/PrizeFile> .

<urn:uuid:931267ab-747d-472c-b32c-374adbbd4cbe> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:7f04c9ce-3608-4099-99d6-a4994e148660> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:15c6cb28-210d-473e-ba72-561ffcf3451f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:781b580b-0274-48b4-b33e-8ed5e11fb717> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:7268e0f8-6dd3-41df-af7a-75ae17cb3c63> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:1886209a-05f0-4ee0-a08a-16bad9db77b8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:113a219a-1156-4f60-a6a2-ea6f2298d5cf> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Person/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:2e82d233-6657-4055-a70c-1741ecaba837> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://www.w3.org/2000/01/rdf-schema#Class/instance> .

<http://www.w3.org/2000/01/rdf-schema#Class/instance> a <http://www.w3.org/2000/01/rdf-schema#Class> .

<urn:uuid:e999257d-89b5-473a-8e0f-c14db7822eeb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:42df497b-d1ce-4d82-bc69-2ad0eb4168cd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:3d70e7e0-f406-4415-91cd-b1c91e6b11bd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:0d7d4327-1d99-42f8-8ddc-faf2e32e8a32> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:03ca81f1-1891-4acd-97a3-ff8fc27d9b9f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:338e6fb3-da92-40f4-b83d-e50585ca0b3f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:b275117e-1a26-4dbd-99c7-51dd9ac457c0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/PrizeFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/prizeFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:090e99e7-0da3-44e6-b6ef-dacb48ac0b49> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Person/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:976ae809-9746-4a72-9a0d-17cdafa679ae> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:5ba128fe-8687-4b19-a0af-8440c88eda3b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/birthday>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:02dc8437-a60c-41bc-b17e-f480faa0aaab> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/University/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/affiliation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:d28b6e06-079d-4fe7-8f12-7e1ae1b7e26c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:d8f5b4a7-2e49-4ccd-a48b-63f97fb92c50> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfDeath>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:4248f0c0-2c09-4aa5-856e-b0aa35a7fd59> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:3bc47da2-7654-4e36-b07a-a20299c1cb4d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/gender>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:191f82a2-5d51-4546-8f86-d391ad19d4ec> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:67ec98fc-c6f0-4159-ae9f-be5d4baa39e4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:45a43dd1-35f3-476c-a9a6-1c600a8e7e3c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:7de06970-e577-4bb7-8d17-fb26dcf2ec12> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfBirth>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:9e0b766a-daec-4998-aa3e-dd6e38089f71> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:444f1145-cc43-4714-a304-f9be2888996a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:49212c34-b9b8-4c31-b92d-cae4da5c1ccd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/familyName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:8b465c8a-f946-4097-94ce-3f993d31afae> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:d2f78ee2-f825-424d-864e-6dae56d058ab> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:7ac2f5e5-57bc-434c-a996-cc88ccb38ef8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:c30980eb-e001-4462-a289-e600db0cdc3c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:96978343-0610-412a-9ee6-a01ec9804618> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:67d72c8e-1e00-4333-b188-08dc4b42e09f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#altLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:18eaa3e8-b11e-4e37-8855-3195b7bb9dfd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:7190328d-a86d-459c-bb71-e0f959fa9583> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#prefLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:3bd1bf94-095c-45d8-a540-ce84d7f5a8ec> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#value>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:ab61bec7-f00d-4ef3-a1d4-ecd36c433c89> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://www.w3.org/2000/01/rdf-schema#Class/instance> .

<urn:uuid:dd889645-5306-45bb-a2bd-3c0dad1f6e88> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://www.w3.org/2000/01/rdf-schema#Class/instance> .

<urn:uuid:06e7ca84-ea05-4f5c-ab9d-9e6fe7cc26cb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:04f709d0-acdb-471a-8699-0127a7388062> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:817125a8-25c3-4857-9407-02ad35502dba> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/birthday>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:ee0fff8f-5c23-4850-8f8e-951dfaeb09a9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:6d77651a-4821-41a4-863f-5880d819fa23> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/gender>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:300a67e0-fef9-4680-aaf6-aa372330f51a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:c83067b7-d393-4101-85bc-7bfa441a2313> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfDeath>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:ab74e14a-4034-431a-9800-81feb41436f5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:aa2dd58f-74cc-494b-8233-91fc50fd9098> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfBirth>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:9fbe8827-041d-4088-a240-524843667cf3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:a2e835b5-8558-4bf2-88fb-30dccd48e667> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:fc3ef2c5-b92f-4555-8aa0-af82845c7460> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:b5c46919-0ed0-4c98-816f-52d4c2bd5d3d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:8314a253-9988-4077-bcd9-3606114498d3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:9827a475-8c8f-4d8e-b798-6221a46b9fee> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:dc4e5c42-b4fd-4750-9f61-93829d9e27fe> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:82e6daba-e86b-4111-b400-d75760bdb80c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/familyName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:cfbf21e8-9474-419a-8b5f-b747235a3362> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/FileType/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/fileType>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:69daa8eb-e6af-419e-8239-b974f1fb46b1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:6b581d82-f78f-4075-9a55-aea606350f87> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:bf21242b-4fd2-4f9b-83d1-d6d5e686e61a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:12bdb8c0-7e4c-4ad7-97df-3be47225819d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#seeAlso>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:7ed5196d-5950-40f8-ae03-817be3696884> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:243e28f1-726f-4199-a511-faa8fc6fc7f8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:0af57c95-4a7e-4875-9711-58a32c700247> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:0e6e4790-8ae9-4574-9f89-cb86f77a53c6> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:d688c941-0b95-491d-a6ef-8e293f212a88> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:88fbf8c6-a222-465f-9007-59854625d550> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:f41da2a1-824b-4e5c-a8d8-5af9f86e5d52> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:76d4b0d3-31cf-4493-ba7e-46d10380a1db> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:1c080217-2f5e-4f1f-ae39-b885dff1bb26> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:26ca4e43-0f5a-4164-af12-cd857f264adb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:0a3b754f-1c8c-4291-b9dc-52018aab73c8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:4804e73e-bfce-4a7f-ac28-befc8e8e2d32> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:b171f07c-4696-4224-8342-253ada83d2de> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:c74f7614-d986-4c97-b1bb-99295af7e84d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:11df97dc-b50e-4fd0-b233-d1ef7f8ace52> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:a893672a-bb24-4341-bdfa-92c4a48e25f8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#seeAlso>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:1da83a5a-cb66-47f7-bf24-0b5fb33e46bd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/FileType/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/fileType>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:ff74314d-407e-4770-9cd7-d72f74548ae9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:bee7f4b8-196b-4ef1-82a9-d1039aef7258> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:e258c4fe-1586-400e-adb9-66c8e4d52e3e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:4fe8b0d6-4419-49fe-b67d-91c8a80e4f83> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/city>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:559aadc6-32c5-4d87-9bdd-3af131b351cb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:a1ec0c95-5b3b-4ede-99c5-35571f52fee9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/country>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:202c5249-4759-499b-b6c2-c7ac3c3fe526> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/city>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:7f19b7f6-a64c-4acb-8802-77e662e8d83a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:07ae49cc-59c6-4f1e-8d0e-3e209013d9f7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/country>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:35b2481a-2c72-4b97-8041-f553d4213a21> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:16c3b761-1f48-4d9d-9b64-660340bd2aba> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:def03ed8-fb1f-47a0-8c59-d496700f32bb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:a97c922a-c518-4866-9f00-a44d5b7f48eb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/University/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/affiliation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:f294afad-735b-4c4a-99a1-407daed02ff4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:f52fa2a9-ef54-4f8c-a85d-013ed7a0686c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:f76217d7-cfc0-4517-b0a6-3edc7287f8b0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfDeath>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:f1b0438b-838d-4428-b7b6-623933edc103> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:21f8e10c-163d-4cc4-ba75-1f439dbde640> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/gender>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:b852902c-1ec0-4851-8158-c96dff5d2814> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:4b6a9696-8c7d-4a79-b8ae-f964f4314904> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/birthday>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:e8ce506e-47d8-464c-b83a-9a67bfd48506> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfBirth>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:acb7d43e-87dd-4e46-8044-4f42bc41e70b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:41b2e0d6-9758-4ec2-aeaa-e073fc61cb04> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:58600a3d-2e5c-40bf-a103-8c519e4bfe6f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:b9f60f3a-be10-47db-bff1-a51e886d022f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:15caf7b0-5fcc-4506-b708-18fbbd2597a3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/familyName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:fb4752df-8956-491c-8575-31c03fc89f1d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:42f66ed0-4a51-4e1a-8ce8-39b1a3974d2a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:55a0f5a0-d0f5-429b-9411-aadbc182c4e3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:8f46d4b6-082b-4a1e-9631-588a8b224ff2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:f62ffb62-e7e5-4c9d-a98d-b7001fad99bf> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:fc92ae42-3136-40b6-855d-98999afb0142> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#prefLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:5ab3d7b0-23a7-41cd-98a5-4190408e252e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#value>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:60dc4746-f629-4e52-98fa-56095a250815> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:d91abdd3-6a37-43b8-8250-51fa7150dc49> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#altLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:cdea90c3-dc2c-4fd9-88fc-0f6f664c3397> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#value>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:e0b848a4-7c39-4d52-9a4f-aacd285b19e9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:75434294-ac19-4784-84ea-d7dd33732569> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:8dcda0f4-ecc4-4259-9a4c-d8100c4349cf> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#altLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:d8d7a755-6dd2-47fc-919e-6a6adf5d380b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#prefLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:8c7b0f3c-fd5c-4fc1-a383-e3b4d5193681> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/FileType/instance> .

<urn:uuid:e6392b21-e118-464a-b3b1-4e100b801996> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:b9efe9ea-c8d5-44ac-90b0-449a32aacc76> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Organization/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:3a1d22e8-093b-458f-9dea-a972d7beda7b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/share>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:a602eb10-9c06-42d2-86df-8c5282a99446> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:39074165-301b-4e12-85a4-3a61bcde587b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/motivation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:ca03cb99-56d5-4259-854a-ae015b98c847> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:e4aa36ca-fb6d-4dc5-bfb3-49d1b6e0ced8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:644acc9e-636f-404f-9e1c-e33d3af322f4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/AwardFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/awardFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:8f672ecb-39ad-4109-8717-0629d3fddfc4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:b736f380-e741-467f-bf8a-c13b3dd0eebd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:daf87651-002a-4148-ac53-9ee72b5a57ae> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:e6702622-087a-4fb7-bc3c-d3d08464a0ec> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:4abbc646-3214-4120-9b4e-3c6c9e96009e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:c45bb448-459c-48e2-ad3e-bec71dc16813> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfBirth>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:e7c37c8c-a821-4d15-9ebe-6e5bb3529113> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/birthday>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:3a13b71e-ed7a-49c3-a2aa-315cf3207691> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/gender>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:ca1530a6-66ad-4e62-a6bc-09532dcebc2f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/University/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/affiliation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:7d78f75e-ca51-41c0-bb84-170f2ffeaf5a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:3593d6a7-f297-4a1c-b97b-66367de7d6a6> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:49b13e64-8935-4eb8-8384-b5aa6642d6c0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfDeath>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:f2a143c9-55dd-4aec-88cf-3599cfee0ab0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:9dc6b5c1-305d-44b9-8cbf-717e1c9036e5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:f2250e8d-d854-49f3-987b-6ca33dbaa0f8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:85685862-539b-42ba-8dfe-7794c511f0f9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/familyName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:c41d4d0e-e14c-4c12-8f4d-33f84692dba1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:198c8ea2-8ab0-46a9-aae5-7310b71b9c7a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:12710d40-cdfc-4c61-a814-f4593cf0eb2e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:ddf861f2-3361-4b02-9b4d-05f2145c84bf> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:07936d0d-0aab-41b1-bae2-05e9c2013b04> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:bb97acea-b7df-483c-bf65-1c7d801f2a82> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:093d5e43-3082-4307-94a1-ba2e502573ce> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:11427faf-b5b4-4bab-b326-44d434236df7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:0344ea06-221b-48d8-bda7-fffd7c92df48> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#seeAlso>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:702033a9-2c88-4021-9779-be29aecb454d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/FileType/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/fileType>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:7b036014-ad48-4abd-9868-1e65852ed08d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:3b36e000-7815-47cc-8846-bdfa69068880> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:74439419-3692-479f-b64a-2dcc18f93407> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:73f137d2-e390-404f-8c91-44bb23d3ba04> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/birthday>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:6c59fd04-6c47-4215-ac98-4b0e0824b0f3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:00a75ac7-da7b-4d71-adf4-6974755a5da3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/University/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/affiliation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:3b7219fb-7919-4185-8fd0-d4a989427ab2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:2ddd2905-3f04-406e-a4a1-ef4387849d52> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/gender>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:feb5ca77-89a6-4b9b-a706-fbd4af8993a3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:aab573d7-a651-4c84-aeca-e4468df08357> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:5c8c6f7f-448c-45e1-9f58-c0f99804e233> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:ec2b38af-781a-4a55-b66f-964b97514edf> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/familyName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:2a05556c-a3a0-4f80-8b99-9dcabf5d028e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:3ab8c812-a68a-4970-a885-cdf17226a275> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfBirth>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:72125cbd-424e-4b47-9991-bac76214911e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:8daf202b-2abd-41b4-9f86-84e6c7c116c6> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/FileType/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/fileType>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:22305de3-6bdc-4f5e-868f-b2c46b6fb599> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:6e7b6f06-b4eb-458d-86fb-a67a556a995c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:3bef278a-8966-4b10-b885-08a0e8dc384d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:c3270263-0e89-49ec-b6ed-46e89e9a2652> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#seeAlso>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:7e9f6fe9-1581-4aba-ade7-c1f4eda0da0e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#seeAlso>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:6afde9cb-3145-4b07-b4c0-63b261e98fad> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:361873cc-04e0-4d41-9027-ed01eee2adc0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:f785b64b-dc93-4038-92e8-51a37e535073> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:9f7ccc88-ed2d-4a2b-ad2b-e830fc367df8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/FileType/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/fileType>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:1cb86349-c6f4-4414-87ec-7370c0eb26bd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:2284a9d2-901e-4128-955d-a5b226e2145c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:fa5a6140-fbe5-46db-bdce-94a684a7b2cd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:a6ea3586-55d7-40b3-8fd1-9cddb626a656> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:5dcc4271-e654-4595-8c85-daf2a81d7ea2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:6fcfd4c3-0a3f-409d-b2cb-8f5fa4190c4a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:750aa47b-24ce-409a-92da-b95619f9686a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:1b90ace9-353b-47ae-ab88-45fc4c83c25b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:3d06c14c-d219-4828-ae75-332eb3286c12> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:9065aae2-1864-4c5e-969d-f5fcdf313e1d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:467e0784-8a26-41ec-bb7e-7516ddf334be> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:601ff970-16a7-45eb-aac0-0792de739f4b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:7565e837-28ea-4362-9a46-679e2c5ddbd2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Person/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:6a8c8f0c-0e1c-41dd-ab8d-6553b9dc30b7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:acabf6ff-1d16-47ad-9f2b-cede908dc53c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:271978d0-438d-4b2f-999d-d8cecd5cbc48> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/PrizeFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/prizeFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:c7a1740e-7ad7-4876-ab1c-fda10b2b92ee> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/FileType/instance> .

<urn:uuid:dc0c95a8-dcfc-4387-afb6-95184fe292ff> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:750e30d4-cc01-4139-b507-db5530c2080b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/successor>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:b5096531-bbc7-46ac-acb9-89731d0a85b1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:ded69b82-38db-4af6-ad0c-4dd9526a1383> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:6f719493-9ea3-47e8-b350-7dba4b2ec63c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:da5efc04-6127-4b7e-b574-b50c09c6377f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:cde43ca7-07b1-44c6-8357-e2bff0c26bc3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:8f94cc45-6857-45b9-9711-0c297e393169> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Organization/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:d3afb47e-c58f-4d11-8319-6d395484f714> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/PrizeFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/prizeFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:a7dd2587-326f-4632-bd29-50eaab8593db> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:9fb81c03-1c4e-45d0-97a5-b9ef578607ba> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:6570ad07-b7a3-4ffa-8425-654425647243> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:d043f5c3-2f62-4280-8952-4f8ef8925911> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:86b67543-776a-4cab-9dbe-d1e76d329bc5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:b651b987-724f-46d8-aa20-49c8fd86f238> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:4a60e3fd-2130-4786-95ff-12af2b3230c4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:ef83749b-61a2-477e-8f8a-4907ccef720e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:ba7f1897-f6ed-4c02-a2f5-61b825d0018d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:946e3736-9f1a-4d83-b44c-78a56b7e2ff1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfBirth>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:844efe45-7217-4075-b368-1478b0509de1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:58cbb52a-1aec-4092-a7a1-ae9ec1dfcea1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/gender>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:b9353670-6d18-4329-8537-a83fea774f56> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:2d65d668-537c-4dfa-aec7-ba83042af991> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfDeath>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:1056da02-50f7-439e-b640-e6d614b2526e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:eb843ff1-c919-4a6b-ae66-1de7322130fa> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/birthday>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:3d6e506d-ec1a-45b1-ac43-51d717f5d1e0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/familyName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:6f482dea-7d43-4641-b0d4-7b783f2978f2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:fb62fcfd-b72d-4d5f-be4f-e89fad4e2b00> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:c3cd1071-b793-4d8d-8334-90085ba1d5c1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:92f36306-f198-415d-aab3-53f161980e41> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:350714c6-3624-4002-b6bc-3f178ef17e42> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:240b422d-1554-4d83-9829-7d3595feda35> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:4c5a4013-558c-4b1b-b44a-94888d8268b3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Person/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:18b9e551-8dfc-4a36-9b0b-d8d65f252398> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/PrizeFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/prizeFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:522f4c21-da92-4ea7-a784-f2828a83a4cf> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:af0ec356-d585-4f80-bc6e-1ad3f4e90890> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:57b8cd3e-5d26-4e32-ac6b-1d422afaee60> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#seeAlso>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:338dd401-fb38-410c-a9e3-1010431ccaef> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:e398fdba-798c-4d74-bbdb-026cdfd7b6b1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/FileType/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/fileType>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:5b634db6-8ff5-4957-b62b-022aac2e18c9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:a96c1323-8287-4cfc-8f11-49fe996fc01a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:340fc40a-9289-4a15-9507-c468731c9a11> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://www.w3.org/2000/01/rdf-schema#Class/instance> .

<urn:uuid:f3c5e417-080e-4ad4-b84d-b7a27a90ce31> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:cd36093b-a702-4aa1-a977-7d60a761d266> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:48c73918-f11e-4769-97d5-3b041d261ea6> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:7fe008be-cef9-4d4d-a7f9-4cc97181179d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:2a8e93a4-51dd-4b95-9773-30292fd84923> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:a215cd71-1147-4f46-b387-a7e36e373473> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:dcf43915-7ac0-4c85-af8c-ac04c6ac70c1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:13113418-6847-4418-91ca-3ac7cbcd2b02> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:1daa0659-99d8-4807-8e53-65b5bbc8b5d9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:c8a787d3-58b1-4218-afc6-dbf198355e74> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:c8fe0161-5523-48bb-afc4-48c4ebbdff26> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/AwardFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/awardFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:26914ed2-c0f9-4dbe-8243-5aebee476856> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:a5e578a7-d85b-49cf-9817-a68ae86c44eb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:27a0dde4-11e9-43fd-8842-8d52747721c0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/share>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:709a300b-664d-40fa-9ed7-1a66691faaa5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Person/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:d7294a88-8dfe-446d-9067-0a8face43fbc> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:3ba5030e-0a5c-432d-8db2-53adeef8163c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/field>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:6579bc0d-6351-4f19-a48e-634291cff5fc> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:da86d24f-3b2f-4032-93d9-4f8d96c03375> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:3fda2291-4054-4d12-99ab-7e8c9dc75b8d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:83b5a943-aa46-45c2-b455-352243c9f3f5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/successor>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:a6461420-3388-448b-84d6-1442921732bf> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:867b3e20-978f-454e-afa1-660ea113ddaf> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/motivation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:1489b37f-25a5-4efc-a762-e9d9175caf63> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:6a708d9f-05ee-4e7c-b12b-d74add405b01> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:933fd243-3a2b-42d5-a4f6-8b7e03012c0b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/AwardFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/awardFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:a4e92f34-f83d-4b16-9148-4ba694b41e99> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/University/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/university>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:671d0da2-e669-4c5b-add4-0a7310b57009> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:48697c86-ee3c-4d13-8244-98e3504ed135> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:7791803e-b153-48ce-ac36-3f377fabee75> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:01da3a0a-0f8b-47e3-be7c-8a84a21bf366> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:4777eeae-7f1a-49d7-9b45-35e72dbdfb43> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/share>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:2a53f9d2-8afc-402c-8835-55fdfbfa3375> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Person/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:3ed2d02a-bb90-46d3-b804-1e44bd522825> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/FileType/instance> .

<urn:uuid:70f50af5-d453-4b45-ae34-c205e05af029> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/description>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/FileType/instance> .

<urn:uuid:1eece4c2-1f9f-4283-8633-516f89b992a1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/city>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:da90dad7-459b-48f5-aaad-ae7639cece72> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:6c798622-3e94-45a9-a3bf-9275c04cc397> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/country>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:f6dba7cd-b627-4128-85a5-db927bd61efa> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Organization/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:e5eaef9e-6f79-4ddc-8903-97f758227789> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:cc0a549e-cba0-4f72-b793-291bea755da3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:f71687aa-e156-4b0a-802a-8ddb917f24d8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:5a841f63-b014-443d-893f-24125167039e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/field>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:4ac3b72e-31c9-485f-b590-94795b4c0254> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:ae6c9171-5550-4501-a015-1661983a33f5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/AwardFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/awardFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:05e85551-c7ac-4a74-819f-8339aaca24f1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:dcb57102-2088-4782-842f-beeb41728134> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:dd4fe1dd-17c8-4d9d-ae43-da3c1f86de11> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/share>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:228b09da-53a0-430f-b7ff-833b9f07e03c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:9455d90b-8e33-49fb-ae49-2e8ab934921b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#seeAlso>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:af5438bd-9fc2-4f8d-8750-96a406a03664> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/FileType/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/fileType>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:ce4325ca-838c-4828-9f47-ed4a34fc58a4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:eff0b376-57f3-44ce-a0bf-0d05326481ac> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:5939cfdb-10a8-4c26-83c5-2d5acf3e67c8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:285bb13b-4a2a-486a-aed3-5de2d3f7ece9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:89b61a83-b44f-4c4e-b327-b16596c19e9b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:058e4a59-b314-477f-9037-2f212be034e7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:47e01c99-f618-4452-9a64-7ac7a83bd832> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:97556505-5774-4592-bd05-3895eddf6215> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:371e2d36-2a29-47fe-9d9c-29e292d26f0e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:3fb7b4ab-9d6b-45f1-9956-554e3c25436a> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:7714ccf2-3d1d-40cb-9969-97d63d505516> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:1a9d024b-095c-4930-9bee-eefae61aa3f8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfBirth>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:60448799-a9c1-40c9-8fe7-b15edc84aacb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/familyName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:aa34af20-317c-4bcd-a824-34335d9e4ba3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:dddfc2c2-116b-4fd2-b8d0-b3c41a58cfc4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:c0db830b-ff7e-4925-8eef-9a70db3db2c1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:d3678a97-8f9b-417d-8289-0ff78388dd63> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:faef8e22-fd4d-4858-bcbe-060f01f1c2a0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:e11185fa-0835-4172-986d-c0e9b1080c5b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:a3ddbfc1-ce35-4e0d-9b15-e777edbc0107> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/birthday>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:5df449cc-91a1-4898-a189-d4f5011022c7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/gender>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:f9ef4391-d21a-4b94-9627-382d7cd5b2cc> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:f08b9489-63a8-4dfb-85fd-9ac7b01bbe67> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:bda32290-379a-41c7-bc5d-28eeae945f5f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:81ef9117-6b63-4661-812f-ba3dd0318591> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/AwardFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/awardFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:d746c5d0-cf49-416e-9d0a-113af0d1c8a8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:143f6a71-cdc8-481d-95cc-e44671ed873e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/field>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:50d8c0fc-72c1-469f-9386-23e73284b3f0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:07364d48-a837-4579-880d-d6bdaf1d70a6> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:5f16023f-49ba-4eea-ae9f-36c772a18dda> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/University/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/university>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:c86b7058-eefe-4292-9937-4fb598e0d3b8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/isPartOf>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:3a9ba75c-3d2b-4a6c-83b2-9b78c74c04cd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Person/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:512a4fdf-e78b-4934-bd77-2a0e39c86a63> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:8aa4cdf8-d3f2-4750-88fb-da406d654618> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:6fd40497-3463-47c6-adbd-0cd87cea2e3e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/share>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:eec319ed-095a-40e9-a0a8-e40b00e5ec8b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/motivation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:d5849d46-5b2f-42ad-94d5-24f2761e14f7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:90b687b0-8e3d-4b24-8def-1a92087c5432> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/successor>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:e2cc97fb-6750-41f3-93dd-c2a447551798> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:03e5c9aa-4a47-4a38-967b-8820767ace73> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:bae730c3-82bf-4867-a492-b68cdb43de19> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:df7b161b-067f-4868-a2e1-335375f73f35> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:4f28b15e-1e1b-469a-b9c8-692c9e51286d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:eda02ff5-c6aa-4db4-95e4-dc903c175bf1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/dc/terms/hasPart>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:010c19b4-c013-48fe-b536-5cddab0aeb7c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://xmlns.com/foaf/0.1/Person/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:a4ed77e6-4f6b-441b-a094-1153f4865635> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/PrizeFile/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/prizeFile>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:a7136e8a-2c38-4bb9-9771-a9e696454f6b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:95449974-398c-49b2-936c-5b4297ca2a95> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Laureate/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureate>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:b3cc69c0-fbfd-47c0-a67e-134ac441487f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/FileType/instance> .

<urn:uuid:f9e24383-91ab-4c29-8b30-deb09c988a85> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/country>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:a39bcc4e-1ee8-43a9-b2e9-b7fd4e57e970> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/city>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:f1f946df-3ae1-48d9-ae1e-37c769d7aef8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:981f22de-1235-4864-a080-5ec11f37ebd5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#altLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:b20afc32-8307-48b3-b403-cb5cf5692d9d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:9623b6ec-0b0b-4425-98b7-ddd0e683dcc1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:1b1e889e-e474-4027-85f4-5820f0295141> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2004/02/skos/core#prefLabel>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:6c3fc89d-123a-4267-8bc6-1edc21cc013f> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#value>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Category/instance> .

<urn:uuid:a6a49cab-d20a-468a-a065-df3b9e6238dc> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfBirth>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:6eaee4e9-d661-47ac-ba47-e7bb86ad9556> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:1859cdff-2e2a-4325-bf34-13a7892dd299> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:86ddc2b4-c795-419f-b79a-0857ad716ce7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/University/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/affiliation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:a59266d4-eff7-413d-926d-68bce7fe071e> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:17ce84bf-ca77-42df-9f2c-e9ee6132c453> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/familyName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:246c9ed0-672e-47ab-b84d-4830aea5be37> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/gender>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:5a7ca78b-0bf7-4203-9ce4-6ee10f7567bc> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:91ffe0ee-b0db-4b53-95e9-965c6c132db8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/birthday>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:debd1ff6-8fba-4fbc-b30c-3a006f255aaf> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:386726ce-4eab-4b87-966e-dfbd56bee259> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:872d2392-3e1c-45c0-a7ac-09f55026faf1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:7ba3e0bf-b9d2-4061-b831-f1cbff47f0a4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:3cfeaad8-1a70-4613-8cdf-bf13d1426a13> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:53c16444-691a-4c1b-9dd6-c670fcb681d4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:810bf8ec-c4e5-4066-ab1e-1918aa758662> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:5c993737-d47a-4339-90d7-d375bfbc53f2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:ddef2628-62a2-4bc8-a5be-7cace2adf543> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:e5a81f0a-9058-449e-8c68-03f48b5faefb> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/name>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:00d4c8f5-c5d5-44ea-a6be-78e6e1d4d89d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Award/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:6d946857-1eb9-4a4a-910f-aee88cbf36e0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/LaureateAward/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/laureateAward>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:29bb3144-6379-45b5-a998-022998bf4b82> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/NobelPrize/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/nobelPrize>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:031e9968-034e-4085-94ba-642342274c1d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfBirth>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:366515c0-6c89-476f-951d-f85890ec13e2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/deathPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:db448988-c557-4fc2-98e1-4594aabe121b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:052b233e-e7cc-4c79-bf54-83324f5ea7e2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/birthPlace>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:fb976503-58ed-481e-bb41-dd2ebf8dbf76> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/givenName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:3f6f31ef-cd89-4160-97a9-653d4d373ffc> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/property/dateOfDeath>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:3989e56c-82e8-403a-8191-e02d482eb38b> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/birthday>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:747ae37b-5b65-486d-a2c8-5533f02420d0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/familyName>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:9c2ab3ca-6a2e-4585-b66b-e9eaadc3e3c7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://xmlns.com/foaf/0.1/gender>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:c5e2c89d-f969-44f2-9a36-d0ea7da0722d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/University/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/affiliation>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:20314c33-c409-4a94-99be-2ceb6751f5d4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:c73a5707-bb8d-4d46-bf9a-54bec6015dd0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://www.w3.org/2000/01/rdf-schema#Class/instance> .

<urn:uuid:780ddc52-1548-4668-9bae-8aaf52076c14> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:2190282e-6d36-4ea7-83ae-9f2211c27f96> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:05279f1e-3d3f-4f12-bbc3-3477983e6915> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/Country/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/country>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:6f793b28-e77c-4beb-84cd-77ad68f8b4a2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://dbpedia.org/ontology/City/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://dbpedia.org/ontology/city>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:817649f9-1800-47bd-a364-803de4e614a0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:3b7f9925-7dd3-4854-b6ec-593eb90a91a1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/Category/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/category>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:facb81f1-4dd6-4483-be5b-cf42a52b5630> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:874a7240-06ca-4e1a-8f83-6431d88ce1bc> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#seeAlso>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:ef275fc8-6368-4001-937f-be961a2e4389> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://data.nobelprize.org/terms/FileType/instance>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/fileType>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:889287c3-db7f-495c-91c3-f3c8a3088a0d> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://data.nobelprize.org/terms/year>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:38208bce-ea65-4493-b613-9f7d7e736f86> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2000/01/rdf-schema#label>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:bf0d6f11-37ad-4f3f-ab60-8c2953e5f598> <http://www.w3.org/1999/02/22-rdf-syntax-ns#object>
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#Literal>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://www.w3.org/2002/07/owl#sameAs>;
  <http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <http://dbpedia.org/ontology/Country/instance> .
```
