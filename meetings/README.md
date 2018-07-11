# 2018-07-11: Meeting notes
- nejdříve pevný základ a komplet funkčnost pro běžné use casy, až pak složitější
- aplikace dostane uri zdroje SPO deskriptorů a endpoint
- next meeting: 08.08.2018 9:15

### Action Items:
- [ ] předávat TTL a endpoint jako parametr aplikaci
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
