# 2019-07-17: Meeting notes
- navrhnout aplikaci s tím, že uživatelé ji budou mít uvedenou jako trusted
- aplikace rámcově obsahuje většinu hlavních featur
    - potřeba dořešit zbylé use case, e.g. ohledně view managementu,
    ale jinak lze začít s kompletním rewritem do finální podoby
        - use casy také doplnit do textu
    - nutno komplet předělat UI/UX
    - potřeba vybrat finální knihovnu na rendering/layouting
    - podívat se blíže na [visualizační knihovnu z graphDB](https://graphdb.opendata.cz/graphs-visualizations?config=8e82dbf8651d4052813e3b1027b1cfa2&uri=https:%2F%2Feon.opendata.cz%2Fresource%2FInstallationVirtualUsagePointForDeregulatedMarket%2F859182400206246955)

- next meeting: ??.09.2019, podle státnic

### Action items:
- [ ] udělat státnice

### TODO:
- [ ] Vytvářet adresář v SOLID podu, pokud non-existent
    - můžeme počítat s tím, že aplikace je trusted
- [ ] zadefinovat use casy v textu
    - view management -> lze mazat, nahrávat a dál?

# 2019-07-08: Meeting notes
- potřeba mít nápovědu/příklad použití při implementování nových featur
    - UX a UI celkově předělám po zprovoznění všech funkčností
- osnovu ještě trochu pozměnit podle poznámek, jinak ok
- view by mělo být ukládáno v RDF formátu, aby s ním mohli pracovat i ostatní aplikace
- potřeba přejmenovat/vysvětlit checkboxy u properties
- přidat do SOLID Podu uri folder, se kterým aplikace může pracovat
    - pravděpodobně do prefs.ttl
- next meeting: 17.07.2019 12:00

### Action items:
- [x] Předávat schema a endpoint url v parametru url aplikace
- [ ] Opravit text dle připomínek + pokračovat

### Bugs noted:
- [ ] Saving view to solid pod with different extensions doesn't work properly

### TODO:
- [ ] Save view in RDF format
- [ ] Rename/give hint for property checkboxes
- [ ] Add app folder uri to SOLID Pod (probably prefs.ttl) on first login, and
    use that as default when saving views


# 2019-06-26: Meeting notes
- diskuze ohledně struktury textu vs Bc. práce
    - požadavky součástí analýzy
    - \+ admin dokumentace (jak nasadit lokálně, co potřebuji)
    - \+ kapitola testování
    - \+ vyhodnocení
        - jak byly splněny požadavky?
        - [System usability scale form](https://www.measuringux.com/SUS.pdf) &rarr; dotazník pro testery
        \+ připravit testovací scénáře, podle kterých bude postupovat i oponent
    - \+ kapitola testování - unit testy, automatizované testy
- jak zakomponovat SOLID do aplikace?
    - SOLID pody jako úložiště pro jednotlivé naklikané náhledy od uživatelů
    - úložiště ttl struktur
    - [SOLID Community](https://solid.community) - free hostovaný solid pod
- next meeting: 08.07.2019 12:00

### Action items:
- [x] Zpracování náhledů naklikaných uživateli přes SOLID
    - [x] ukládání/parsování náhledů
    - [x] přihlášení
    - [x] ukládání views do SOLID podů
    - (aplikace by měla být použitelná i bez přihlašování)
- [x] Pracovat na textu práce
    - lze již psát úvod, motivaci, analýzu, design

# 2019-06-17: Meeting notes
- refresh, co od aplikace očekáváme
- předpokládaný termín obhajoby leden 2020
- next meeting: 26.06.2019, to be confirmed

### Bugs noted:
- [x] yasgui &rarr; ctrl + space autocomplete not working

### Action Items:
- [x] Remove BE entirely (can keep simple script as a cors proxy deployed somewhere)
    - [x] Move all logic to the JS app
    - [ ] Initial loading screen when the app is fetching data
- [x] Read up on [Solid](https://solid.mit.edu/)
- [x] Create Github pages for the project
    - [x] Basic documentation (deployment & info)
    - [x] App demo &rarr; static version deployed on the pages
- [x] Start working on the text in LaTeX
    - [x] Online LaTeX editor &rarr; [Overleaf](https://www.overleaf.com/)
        - [x] import MFF template

# 2018-07-11: Meeting notes
- nejdříve pevný základ a komplet funkčnost pro běžné use casy, až pak složitější
- aplikace dostane uri zdroje SPO deskriptorů a endpoint
- next meeting: ~08.08.2018~ 22.08.2018 9:15

### Action Items:
- [x] předávat TTL a endpoint jako parametr aplikaci
- upravit výpis zvolených properties
  - [ ] k jakým třídam patří
  - [ ] jaký to je predikát (ne pouze variable name)
    - také prefixovat
  - stromová struktura?
- [ ] možnost ukládání nastavení (výběru uživatele)
# 2018-06-07: Meeting notes
- použité rdfjs, n3 na parsování :+1:
- SPO deskriptory se parsují ok
- do příštího meetingu udělat checklist, kde si uživatel bude moct zaklikávat property
  - při UI interakci se prozatím celá query nahradí nově vygenerovanou
- přepsat architekturu + refactoring tak, aby se aplikace už dala někam nasadit
- graf je celkem nepřehledný, ale vyřešíme až po business logice
- next meeting: ~04.07.2018~ 11.7.2018 9:15

### Action Items:
- [x] zkusit lépe handlovat prefixy
  - buď přes servicu (e.g. [PrefixCC](https://prefix.cc/), [RDF Translator](https://rdf-translator.appspot.com/), nebo manuálně parsovat)
- [x] opravit OPTIONAL generování
  - [x] ne 1 velký OPTIONAL, ale každý zvlášť
  - [x] duplicity proměnných
- [x] checklist pro uživatele na jednotlivé property 
  - [x] změna názvu proměnné, OPTIONAL, zobrazení v result setu, odstranění z dotazu
- [x] refactoring, aby se dala aplikace někam nasadit pro účely testování
# 2018-05-14: Meeting notes
- vybrané věci by měly být vizuálně zvýrazněné
- v SPO deskriptorech jsou i váhy hran, lze později zakomponovat<br>(aplikace musí být schopna pracovat i bez vah)
- transformace dat vstup &rarr; interní reprezentace musí být zcela oddělená
  - datové property tříd jsou ty, které jsou např. typu z xsd namespacu
    - bude dáno výčtem typů/popisem
- použít yasgui na generování SPARQL dotazů v postranní liště
  - ruční zadání endpointu uživatelem
  - generování v průběhu klikání v grafu, RUN button
- při vybrání classy generovat dotaz na get všech property dané třídy (ve where, jako optional)
- next meeting: ~04.06.2018~ 07.06.2018 09:15

### Action Items:
- [x] Zobrazení dat z SPO deskriptorů
  - oddělená logika transformace vstup &rarr; schéma
- [x] Generování SPARQL dotazu pomocí yasgui při klikání v grafu
  - specifikace endpointu + run a zobrazení resultu

### SPO deskriptory
- využití náhodně generovaných id uzlů pro každý predikát zvlášť &rarr; potřeba agregovat
- IRI s rdf:predicate určuje typ predikátu. Stejná IRI pak má i rdf:object, rdf:subject, eventuelně váhu
# 2018-04-09: Meeting notes
- UML zobrazení se zdá ok
  - další úpravy vzhledu podle typu vstupních dat
  - datové atributy v těle elementu, ostatní odkazované přes hrany?
- používaná knihovna JointJS
- další meeting 14.5.2018 13:00

### Action Items:
- [ ] naučit se [SPARQL](https://www.w3.org/TR/rdf-sparql-query/)
  - [W3 resource](https://www.w3.org/2009/Talks/0615-qbe/)
  - [Slajdy](https://docs.google.com/presentation/d/1G5pZhrrQ7N8wMFbcHJ6hF9N7EktNIk4SZwDMCq4pTgk/edit#slide=id.p3)
  - [Sparqlab Cvičení](http://doc.lmcloud.vse.cz/sparqlab)
- [ ] Přemýšlet, co znamená, když si uživatel něco nakliká ve schématu
  - where x select
  - nabídnout toolbar s možnými reprezentacemi výsledných query, kde si uživatel bude moct vybrat/odebrat co potřebuje?
# 2018-03-19: Meeting notes
- technologie: React, Redux
- Pohled na data by měl být editovatelný (uživatel může uzly hýbat, schovávat části view..)
- na zkoušku více zobrazení dat - e.g. UML diagram, Síť ~ ER diagram
- aplikace by měla fungovat i na mobilech

### Action Items:
- Na příště příklad použití vizualizačních knihoven
    - měly by být mobile friendly ([D3.js](https://d3js.org/), [JointJS](https://www.jointjs.com/opensource), ?)
    - [x] připravit příklad pro mock data
        - alespoň 2 různá zobrazení
        - jak reprezentovat objekty v JSON pro danou knihovnu?
        - evidence klikání na objekty
- [x] podívat se na [LODLive](http://en.lodlive.it/)
- [x] podívat se na [Wikidata query service](https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/Wikidata_Query_Help) -> generování SPARQL dotazů pomocí formuláře
