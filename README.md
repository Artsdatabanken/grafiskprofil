# Ferdige design til bruk for Artsdatabanken

## Nytt design
Det nye designet er ennå ikke helt på plass, men det vil bli lagt ferdige stilsett her når den biten er på plass.
Per nå er auto-deployment ikke fungerende, som må på plass før dette kan tas i bruk igjen.

## Header og footer
Inne på [scripts](https://design.artsdatabanken.no/scripts) og [styling](https://design.artsdatabanken.no/styling)
vil du finne filer som du kan bruke til header og footer. De er nå slik at du må kombinere dem med header og footer
som du vil finne i templates-mappa her inne. Det hadde vært fint å fått inn en minified versjon med kun ett element
for header og ett for footer, men enn så lenge tar ikke scriptene de jobbene.

## Lokasjon
Prosjektets datafiler og referansesett kan refereres direkte til filene som hostes på:
- https://design.artsdatabanken.no/

Konklusjoner om (per nå utelukkende gammelt design) finner du her:
- WIKIEN VÅR: https://github.com/Artsdatabanken/grafiskprofil/wiki

## Ikoner
Det ligger en drøss med ikoner i dette prosjektet, slik som artsikonene som benyttes i blant annet rødlista 2021.

- Artsikoner: https://design.artsdatabanken.no/icons/
- Påvirkningsfaktor-ikoner: https://design.artsdatabanken.no/impact-icons/ (Utgått fra bruk)
- Rødliste/Fremmedartsliste-ikoner: https://design.artsdatabanken.no/list-icons/ (siden funker ikke)
- Illustrasjoner fra Rødlista 2006: https://design.artsdatabanken.no/2006-icons/ (siden funker ikke)
- Oversikt over ikonbruk på artsdatabanken: https://design.artsdatabanken.no/icons.html (Under revidering)

## Gamle templates
Alt som ikke er kompilert kode kan anses som gammelt og ikke en del av den nye grafiske profilen.
Det som er kompilert kode er ut ifra ny profil - bruk denne fremover!

## Bidra inn
Legg gjerne inn templates, styling og script som følger profilmanualen og som kan være til nytte for andre. 
Dette vil alltid være WIP så nye element vil tilkomme den som venter.

### Prosjekt som benytter header + footer + templates av dette i bruk:
- https://github.com/Artsdatabanken/doi-frontend

# Deployment av design.artsdatabanken.no
- sees nevnt på https://design.artsdatabanken.no/
- deployes på innsjekk til master. 
- Kjører kun én versjon og denne kjører på testserver.
- Per nå er dette ikke fungerende pga. flytting, og alt må kopieres over manuelt. Må fikses!

