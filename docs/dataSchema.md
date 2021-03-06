---
layout: default
title: Linked data viewer
sidebar:
nav: "docs"
---
Data schema example:
```ttl
# Prefixes
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix nobel: <http://data.nobelprize.org/terms/> .
@prefix onto: <http://dbpedia.org/ontology/> .
@prefix purl: <http://purl.org/dc/terms/> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix dbpedia: <http://dbpedia.org/property/> .

<urn:uuid:baf770fd-fe82-4467-be0b-9f158f38583e>
  rdf:object <http://data.nobelprize.org/terms/FileType/instance>;
  rdf:predicate nobel:fileType;
  rdf:subject <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:e6670b14-b31e-4177-82d8-d34c1efc154d>
  rdf:object rdf:Literal;
  rdf:predicate nobel:year;
  rdf:subject <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:d1691dab-514c-40e4-9ba2-349763ba5b98>
  rdf:object <http://data.nobelprize.org/terms/Category/instance>;
  rdf:predicate nobel:category;
  rdf:subject <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:6cb1056b-fb58-4731-a7a2-f51da278ea80>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:seeAlso;
  rdf:subject <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:d14fb8f8-e015-45c5-a245-19180ecd7238>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://data.nobelprize.org/terms/AwardFile/instance> .

<urn:uuid:7f16aa90-1d8b-4e1d-9dee-0d276513c8db>
  rdf:object rdf:Literal;
  rdf:predicate foaf:givenName;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:277c38f0-c27d-45c8-b250-c5ef5fa5701f>
  rdf:object rdf:Literal;
  rdf:predicate foaf:gender;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:b7ac784a-9021-4610-92dd-24212f0db5b7>
  rdf:object <http://data.nobelprize.org/terms/LaureateAward/instance>;
  rdf:predicate nobel:laureateAward;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:d475c4da-8086-49e0-a5e3-0ac5c00b18b5>
  rdf:object <http://dbpedia.org/ontology/Award/instance>;
  rdf:predicate nobel:laureateAward;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:028441b4-7479-4c08-93f2-552f3448c9e9>
  rdf:object <http://dbpedia.org/ontology/Award/instance>;
  rdf:predicate nobel:nobelPrize;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:d987549b-018d-4090-ad68-c6d408eb8ac5>
  rdf:object <http://data.nobelprize.org/terms/NobelPrize/instance>;
  rdf:predicate nobel:nobelPrize;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:19950838-1ffd-4cf1-9a5a-172b05163b1a>
  rdf:object <http://dbpedia.org/ontology/City/instance>;
  rdf:predicate onto:birthPlace;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:2b86c2bb-713f-4a34-a419-649934fb680c>
  rdf:object rdf:Literal;
  rdf:predicate foaf:familyName;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:071371aa-5602-4f20-bca5-9d0b50252c6e>
  rdf:object rdf:Literal;
  rdf:predicate foaf:name;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:d1d0e1cb-9cce-495a-afdc-b5ae7faef590>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:cc57712c-c505-49ee-ac00-37745bd6d490>
  rdf:object rdf:Literal;
  rdf:predicate foaf:birthday;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:e9b124b1-d5a7-4786-b5cc-223e66926539>
  rdf:object rdf:Literal;
  rdf:predicate dbpedia:dateOfBirth;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:7cbe90a2-bfd4-4bd0-8039-3ab93defac21>
  rdf:object <http://dbpedia.org/ontology/Country/instance>;
  rdf:predicate onto:birthPlace;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:efa45057-a97b-4556-affa-1c0abf30735f>
  rdf:object <http://dbpedia.org/ontology/University/instance>;
  rdf:predicate onto:affiliation;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:24e8c211-60b1-45f4-b4e0-6ce5b9b4322f>
  rdf:object <http://data.nobelprize.org/terms/NobelPrize/instance>;
  rdf:predicate purl:isPartOf;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:4b2087eb-4a2a-4377-95e4-c3c7e53fece4>
  rdf:object rdf:Literal;
  rdf:predicate nobel:share;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:d6d1c5bb-042b-47ae-b0d4-1c63eb296478>
  rdf:object rdf:Literal;
  rdf:predicate nobel:motivation;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:b13eb97f-8a82-45b6-a675-74ebe3b46b29>
  rdf:object <http://data.nobelprize.org/terms/AwardFile/instance>;
  rdf:predicate nobel:awardFile;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:5cda191a-d4f5-4518-8363-7ea21762fd9d>
  rdf:object <http://data.nobelprize.org/terms/Category/instance>;
  rdf:predicate nobel:category;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:c8ec05ca-e5da-44f4-9007-5007f1b451ca>
  rdf:object <http://dbpedia.org/ontology/Award/instance>;
  rdf:predicate purl:isPartOf;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:943a8c52-6067-45ef-a05a-08a117a8afca>
  rdf:object rdf:Literal;
  rdf:predicate nobel:field;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:9c1dcee2-ab5f-4440-8938-5da76a1b6356>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:89d1b2f7-0b5d-42a8-a504-900461f1f408>
  rdf:object <http://dbpedia.org/ontology/University/instance>;
  rdf:predicate nobel:university;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:c00a0a11-6233-4315-9fdc-0acd70c171da>
  rdf:object <http://data.nobelprize.org/terms/Laureate/instance>;
  rdf:predicate nobel:laureate;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:ed4263d4-815b-4297-8ada-99320e251464>
  rdf:object <http://xmlns.com/foaf/0.1/Person/instance>;
  rdf:predicate nobel:laureate;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:328f63a1-2400-418c-a068-de290defb75c>
  rdf:object rdf:Literal;
  rdf:predicate nobel:year;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:268941d1-a51b-4032-9437-377b9e78dad1>
  rdf:object rdf:Literal;
  rdf:predicate foaf:givenName;
  rdf:subject <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:d31986d9-5616-4ccc-96eb-5419ec98149c>
  rdf:object <http://data.nobelprize.org/terms/NobelPrize/instance>;
  rdf:predicate nobel:nobelPrize;
  rdf:subject <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:658cec7e-e06e-438a-89e9-6c0eb1f40661>
  rdf:object <http://dbpedia.org/ontology/Award/instance>;
  rdf:predicate nobel:laureateAward;
  rdf:subject <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:9c6d3bf3-9ce1-4ec1-9563-5076534ad1e9>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:520fe82c-70e4-4d87-8cb5-e1fbd2d0375e>
  rdf:object <http://data.nobelprize.org/terms/LaureateAward/instance>;
  rdf:predicate nobel:laureateAward;
  rdf:subject <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:8af8ac86-1b6b-4e91-8fd4-fe0cee97d933>
  rdf:object rdf:Literal;
  rdf:predicate owl:sameAs;
  rdf:subject <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:f225c343-c9c1-40e6-b19a-315da3df3254>
  rdf:object rdf:Literal;
  rdf:predicate foaf:name;
  rdf:subject <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:fdcced11-9644-45ba-93d0-fa2501cd3d65>
  rdf:object <http://dbpedia.org/ontology/Award/instance>;
  rdf:predicate nobel:nobelPrize;
  rdf:subject <http://xmlns.com/foaf/0.1/Organization/instance> .

<urn:uuid:8d0b4a7a-b103-44ce-a82c-cb19602c7938>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://data.nobelprize.org/terms/FileType/instance> .

<urn:uuid:7d84b14b-e85b-44b3-95b1-a56e766ee04f>
  rdf:object <http://data.nobelprize.org/terms/PrizeFile/instance>;
  rdf:predicate nobel:prizeFile;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:931267ab-747d-472c-b32c-374adbbd4cbe>
  rdf:object <http://data.nobelprize.org/terms/Laureate/instance>;
  rdf:predicate nobel:laureate;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:7f04c9ce-3608-4099-99d6-a4994e148660>
  rdf:object <http://dbpedia.org/ontology/Award/instance>;
  rdf:predicate purl:hasPart;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:15c6cb28-210d-473e-ba72-561ffcf3451f>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:781b580b-0274-48b4-b33e-8ed5e11fb717>
  rdf:object rdf:Literal;
  rdf:predicate nobel:year;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:7268e0f8-6dd3-41df-af7a-75ae17cb3c63>
  rdf:object <http://data.nobelprize.org/terms/Category/instance>;
  rdf:predicate nobel:category;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:1886209a-05f0-4ee0-a08a-16bad9db77b8>
  rdf:object <http://data.nobelprize.org/terms/LaureateAward/instance>;
  rdf:predicate purl:hasPart;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:113a219a-1156-4f60-a6a2-ea6f2298d5cf>
  rdf:object <http://xmlns.com/foaf/0.1/Person/instance>;
  rdf:predicate nobel:laureate;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:2e82d233-6657-4055-a70c-1741ecaba837>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://www.w3.org/2000/01/rdf-schema#Class/instance> .

<urn:uuid:e999257d-89b5-473a-8e0f-c14db7822eeb>
  rdf:object <http://data.nobelprize.org/terms/Laureate/instance>;
  rdf:predicate nobel:laureate;
  rdf:subject <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:42df497b-d1ce-4d82-bc69-2ad0eb4168cd>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:3d70e7e0-f406-4415-91cd-b1c91e6b11bd>
  rdf:object <http://data.nobelprize.org/terms/Category/instance>;
  rdf:predicate nobel:category;
  rdf:subject <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:0d7d4327-1d99-42f8-8ddc-faf2e32e8a32>
  rdf:object rdf:Literal;
  rdf:predicate nobel:year;
  rdf:subject <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:03ca81f1-1891-4acd-97a3-ff8fc27d9b9f>
  rdf:object <http://dbpedia.org/ontology/Award/instance>;
  rdf:predicate purl:hasPart;
  rdf:subject <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:338e6fb3-da92-40f4-b83d-e50585ca0b3f>
  rdf:object <http://data.nobelprize.org/terms/LaureateAward/instance>;
  rdf:predicate purl:hasPart;
  rdf:subject <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:b275117e-1a26-4dbd-99c7-51dd9ac457c0>
  rdf:object <http://data.nobelprize.org/terms/PrizeFile/instance>;
  rdf:predicate nobel:prizeFile;
  rdf:subject <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:090e99e7-0da3-44e6-b6ef-dacb48ac0b49>
  rdf:object <http://xmlns.com/foaf/0.1/Person/instance>;
  rdf:predicate nobel:laureate;
  rdf:subject <http://data.nobelprize.org/terms/NobelPrize/instance> .

<urn:uuid:d28b6e06-079d-4fe7-8f12-7e1ae1b7e26c>
  rdf:object <http://dbpedia.org/ontology/Country/instance>;
  rdf:predicate onto:deathPlace;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:d8f5b4a7-2e49-4ccd-a48b-63f97fb92c50>
  rdf:object rdf:Literal;
  rdf:predicate dbpedia:dateOfDeath;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:4248f0c0-2c09-4aa5-856e-b0aa35a7fd59>
  rdf:object <http://dbpedia.org/ontology/City/instance>;
  rdf:predicate onto:deathPlace;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:45a43dd1-35f3-476c-a9a6-1c600a8e7e3c>
  rdf:object rdf:Literal;
  rdf:predicate owl:sameAs;
  rdf:subject <http://xmlns.com/foaf/0.1/Person/instance> .

<urn:uuid:cfbf21e8-9474-419a-8b5f-b747235a3362>
  rdf:object <http://data.nobelprize.org/terms/FileType/instance>;
  rdf:predicate nobel:fileType;
  rdf:subject <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:69daa8eb-e6af-419e-8239-b974f1fb46b1>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:6b581d82-f78f-4075-9a55-aea606350f87>
  rdf:object rdf:Literal;
  rdf:predicate nobel:year;
  rdf:subject <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:bf21242b-4fd2-4f9b-83d1-d6d5e686e61a>
  rdf:object <http://data.nobelprize.org/terms/Category/instance>;
  rdf:predicate nobel:category;
  rdf:subject <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:12bdb8c0-7e4c-4ad7-97df-3be47225819d>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:seeAlso;
  rdf:subject <http://data.nobelprize.org/terms/PrizeFile/instance> .

<urn:uuid:7ed5196d-5950-40f8-ae03-817be3696884>
  rdf:object rdf:Literal;
  rdf:predicate owl:sameAs;
  rdf:subject <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:243e28f1-726f-4199-a511-faa8fc6fc7f8>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://dbpedia.org/ontology/City/instance> .

<urn:uuid:4fe8b0d6-4419-49fe-b67d-91c8a80e4f83>
  rdf:object <http://dbpedia.org/ontology/City/instance>;
  rdf:predicate onto:city;
  rdf:subject <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:559aadc6-32c5-4d87-9bdd-3af131b351cb>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:a1ec0c95-5b3b-4ede-99c5-35571f52fee9>
  rdf:object <http://dbpedia.org/ontology/Country/instance>;
  rdf:predicate onto:country;
  rdf:subject <http://dbpedia.org/ontology/University/instance> .

<urn:uuid:b9efe9ea-c8d5-44ac-90b0-449a32aacc76>
  rdf:object <http://xmlns.com/foaf/0.1/Organization/instance>;
  rdf:predicate nobel:laureate;
  rdf:subject <http://data.nobelprize.org/terms/LaureateAward/instance> .

<urn:uuid:daf87651-002a-4148-ac53-9ee72b5a57ae>
  rdf:object <http://dbpedia.org/ontology/Award/instance>;
  rdf:predicate nobel:laureateAward;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:e6702622-087a-4fb7-bc3c-d3d08464a0ec>
  rdf:object rdf:Literal;
  rdf:predicate foaf:name;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:4abbc646-3214-4120-9b4e-3c6c9e96009e>
  rdf:object <http://dbpedia.org/ontology/City/instance>;
  rdf:predicate onto:birthPlace;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:c45bb448-459c-48e2-ad3e-bec71dc16813>
  rdf:object rdf:Literal;
  rdf:predicate dbpedia:dateOfBirth;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:e7c37c8c-a821-4d15-9ebe-6e5bb3529113>
  rdf:object rdf:Literal;
  rdf:predicate foaf:birthday;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:3a13b71e-ed7a-49c3-a2aa-315cf3207691>
  rdf:object rdf:Literal;
  rdf:predicate foaf:gender;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:ca1530a6-66ad-4e62-a6bc-09532dcebc2f>
  rdf:object <http://dbpedia.org/ontology/University/instance>;
  rdf:predicate onto:affiliation;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:7d78f75e-ca51-41c0-bb84-170f2ffeaf5a>
  rdf:object rdf:Literal;
  rdf:predicate foaf:givenName;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:3593d6a7-f297-4a1c-b97b-66367de7d6a6>
  rdf:object rdf:Literal;
  rdf:predicate rdfs:label;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:49b13e64-8935-4eb8-8384-b5aa6642d6c0>
  rdf:object rdf:Literal;
  rdf:predicate dbpedia:dateOfDeath;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:f2a143c9-55dd-4aec-88cf-3599cfee0ab0>
  rdf:object <http://dbpedia.org/ontology/Country/instance>;
  rdf:predicate onto:deathPlace;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:9dc6b5c1-305d-44b9-8cbf-717e1c9036e5>
  rdf:object <http://dbpedia.org/ontology/Award/instance>;
  rdf:predicate nobel:nobelPrize;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:f2250e8d-d854-49f3-987b-6ca33dbaa0f8>
  rdf:object <http://data.nobelprize.org/terms/LaureateAward/instance>;
  rdf:predicate nobel:laureateAward;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:85685862-539b-42ba-8dfe-7794c511f0f9>
  rdf:object rdf:Literal;
  rdf:predicate foaf:familyName;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:c41d4d0e-e14c-4c12-8f4d-33f84692dba1>
  rdf:object <http://dbpedia.org/ontology/City/instance>;
  rdf:predicate onto:deathPlace;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:198c8ea2-8ab0-46a9-aae5-7310b71b9c7a>
  rdf:object <http://data.nobelprize.org/terms/NobelPrize/instance>;
  rdf:predicate nobel:nobelPrize;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:12710d40-cdfc-4c61-a814-f4593cf0eb2e>
  rdf:object <http://dbpedia.org/ontology/Country/instance>;
  rdf:predicate onto:birthPlace;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:ddf861f2-3361-4b02-9b4d-05f2145c84bf>
  rdf:object rdf:Literal;
  rdf:predicate owl:sameAs;
  rdf:subject <http://data.nobelprize.org/terms/Laureate/instance> .

<urn:uuid:dc0c95a8-dcfc-4387-afb6-95184fe292ff>
  rdf:object rdf:langString;
  rdf:predicate rdfs:label;
  rdf:subject <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:750e30d4-cc01-4139-b507-db5530c2080b>
  rdf:object rdf:Literal;
  rdf:predicate onto:successor;
  rdf:subject <http://dbpedia.org/ontology/Country/instance> .

<urn:uuid:8f94cc45-6857-45b9-9711-0c297e393169>
  rdf:object <http://xmlns.com/foaf/0.1/Organization/instance>;
  rdf:predicate nobel:laureate;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:867b3e20-978f-454e-afa1-660ea113ddaf>
  rdf:object rdf:Literal;
  rdf:predicate nobel:motivation;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:1489b37f-25a5-4efc-a762-e9d9175caf63>
  rdf:object <http://dbpedia.org/ontology/Award/instance>;
  rdf:predicate purl:isPartOf;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:933fd243-3a2b-42d5-a4f6-8b7e03012c0b>
  rdf:object <http://data.nobelprize.org/terms/AwardFile/instance>;
  rdf:predicate nobel:awardFile;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:a4e92f34-f83d-4b16-9148-4ba694b41e99>
  rdf:object <http://dbpedia.org/ontology/University/instance>;
  rdf:predicate nobel:university;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:671d0da2-e669-4c5b-add4-0a7310b57009>
  rdf:object <http://data.nobelprize.org/terms/NobelPrize/instance>;
  rdf:predicate purl:isPartOf;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:4777eeae-7f1a-49d7-9b45-35e72dbdfb43>
  rdf:object rdf:Literal;
  rdf:predicate nobel:share;
  rdf:subject <http://dbpedia.org/ontology/Award/instance> .

<urn:uuid:70f50af5-d453-4b45-ae34-c205e05af029>
  rdf:object rdf:Literal;
  rdf:predicate purl:description;
  rdf:subject <http://data.nobelprize.org/terms/FileType/instance> .

<urn:uuid:03e5c9aa-4a47-4a38-967b-8820767ace73>
  rdf:object rdf:Literal;
  rdf:predicate owl:sameAs;
  rdf:subject <http://dbpedia.org/ontology/Country/instance> .

<http://data.nobelprize.org/terms/AwardFile/instance> a nobel:AwardFile .
<http://data.nobelprize.org/terms/FileType/instance> a nobel:FileType .
<http://data.nobelprize.org/terms/Category/instance> a nobel:Category .
<http://xmlns.com/foaf/0.1/Person/instance> a foaf:Person .
<http://data.nobelprize.org/terms/LaureateAward/instance> a nobel:LaureateAward .
<http://dbpedia.org/ontology/Award/instance> a onto:Award .
<http://data.nobelprize.org/terms/NobelPrize/instance> a nobel:NobelPrize .
<http://dbpedia.org/ontology/City/instance> a onto:City .
<http://dbpedia.org/ontology/Country/instance> a onto:Country .
<http://dbpedia.org/ontology/University/instance> a onto:University .
<http://data.nobelprize.org/terms/Laureate/instance> a nobel:Laureate .
<http://xmlns.com/foaf/0.1/Organization/instance> a foaf:Organization .
<http://data.nobelprize.org/terms/PrizeFile/instance> a nobel:PrizeFile .
<http://www.w3.org/2000/01/rdf-schema#Class/instance> a rdfs:Class .
```
