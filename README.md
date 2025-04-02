# Platform Oncollaboration

Het platform waar radiologen uit Indonesië en Nederland samenkomen om hun kennis te delen en recente ontwikkelingen in hun medische vakgebied te bespreken.

Tijdens sprint 8 lag de focus voor het ontwikkelen van de pagina's op de webinar overzichtspagina en de webinar detailpagina. Alle content wordt dynamisch opgehaald uit een database die ik van de opdrachtgever ontvangen heb.

### Wie is Oncollaboration
Oncollaboration is een ontwerp voor een online platform voor samenwerking en kennisdeling tussen Indoneschische en Nederlandse radiotherapeuten. Oncollaboration is het afstudeerwerk van oud-CMD student Sergio Eijben. Sergio is in opdracht van radiotherapeute Judi van Diessen van het Antoni van Leeuwenhoek ziekenhuis afgestudeerd op de vraag over hoe de samenwerking en kennisdeling tussen Indoneschische en Nederlandse radiotherapeuten te verbeteren.

### Vraag opdrachtgever

Ontwikkel een platform waar de focus op webinars ligt.

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
### Het ontwerp
Éen van de belangrijkste feedbackpunten van afgelopen sprintreview was dat in de styling van de website meer de samenwerking van beide ziekenhuizen naar voren komen. Dit heb ik aangepakt door prominente kleuren te veranderen. Daarnaast heb ik wel de consistent UI aangehouden van de huidige website. Dit zorgt ervoor dat beide websites naar voren komen.

- [Bekijk hier het Figma ontwerp](https://www.figma.com/proto/1ALElL2SuXZRghkAgXv2C7/Webdesign-Oncollaboration?node-id=46-5732&viewport=167%2C-1978%2C0.09&t=XD9l1bJE54nAqMwR-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=46%3A5732&show-proto-sidebar=1)
  
### Ontwerpkeuzes

- **Kleurgebruik**: Blauw als hoofdkleur: Straalt vertrouwen uit en wordt vaak door medische instellingen gebruikt. Felgroene call-to-action knoppen: Vallen goed op en verbeteren de gebruikerservaring.
- **Typografie**: Duidelijke, moderne lettertype met een goed contrast om de leesbaarheid te verbeteren. De koppen zijn vetgedrukt ze extra te laten opvallen.
- **Consistene UI**: De afgeronde randen maken de scheiding tussen elementen subtieler, waardoor de pagina minder hoekig en strenger aanvoelt. En komt ook terug op de website van het AvL ziekenhuis.
- **Branding & Partnerschap**: Beide logo’s in de header: Versterkt de zichtbaarheid van de samenwerking.
<br>
<img width="950" alt="image" src="https://github.com/user-attachments/assets/3dddad5e-67fa-4e84-9920-1d21617f294f" />

<img width="950" alt="image" src="https://github.com/user-attachments/assets/89c6e1f0-5934-4b50-9a82-1afaaff6cfa7" />

### Het ontwikkelde platform
In de afgelopen sprint zijn de volgende pagina's ontwikkeld:

- Homepagina: Een introductie van Oncollaboration met een overzicht van webinars en contourings.

[Linkje naar de homepagina](https://the-web-is-for-everyone-interactive-5eue.onrender.com/)

- Webinar Overzichtspagina: Een overzicht van alle webinars, waarbij gebruikers kunnen zoeken en filteren op categorie.

[Linkje naar de Overzichtspagina](https://the-web-is-for-everyone-interactive-5eue.onrender.com/webinars)

- Watchlistpagina: Op deze pagina worden de webinars die door een gebruiker zijn toegevoegd aan de watchlist hier getoond. 

[Linkje naar de Watchlistpagina](https://the-web-is-for-everyone-interactive-5eue.onrender.com/watchlist)

### Belangrijke features:

- Filteren op categorie webinars

Op de webinar overzichtspagina is een er een filter functie waarbij je kunt filteren op cateogrie m.b.t de webinars. Op deze manier kan de gebruiker gericht de juiste webinar vinden.

https://github.com/user-attachments/assets/e66c5398-42b7-42f2-b330-eed25b208254

- Mobile first ontwikkeld (reponsive)

Het platform is volledig mobile-first ontwikkeld, waardoor het goed werkt op verschillende schermgroottes van mobiel tot desktop.

https://github.com/user-attachments/assets/06518f76-15d0-4d28-9fa3-97eaec13d460

- Functie webinar toevoegen aan watchlist

Is er een nieuwe functie toegevoegd waarbij de gebruiker een webinar die hij/zij interessant vindt kan toevoegen aan de watchlist. Dit is pagina waarop alle webinars worden getoont die een gebruiker later wilt terugkijken. Je kunt de webinar ook weer verwijderen uit de watchlist door nog een keer op de knop te klikken.

https://github.com/user-attachments/assets/c5ecf363-d118-47e0-af0c-91304651aaac

## Kenmerken
In dit project wordt er gebruik gemaakt van Node.js en Express om de webserver te beheren. Voor het genereren van dynamische HTML-pagina's wordt Liquid gebruikt, wat de webpagina's flexibel en makkelijk te onderhouden maakt.

### Route-configuraties
- Homepagina [`/`](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/main/views/index.liquid): De webserver haalt gegevens op via de Directus API en toont deze op de hoofdpagina [`index.liquid`](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/main/views/index.liquid).
- Webinars overzichtspagina [`/webinars/`](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/main/views/webinars.liquid): Hier worden webinars opgehaald en kunnen gebruikers deze filteren op categorie. De data wordt weergegeven in de template [`webinars.liquid`](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/main/views/webinars.liquid).
- Watchlistpagina [`/watchlist/`](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/main/views/watchlist.liquid) : Deze route haalt de webinars op die opgeslagen zijn in de database en toont deze op de [`watchlist.liquid`](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/main/views/watchlist.liquid).

### Data ophalen, opslaan en verwijderen uit database
- Data ophalen via API: De server maakt een API-aanroep om de benodigde gegevens op te halen in JSON-formaat. [Voorbeeld](https://github.com/ambersr/server-side-rendering-server-side-website/blob/79784183415e43f6b3c67195dfdd1da05259c14e/server.js#L77)
- Data doorgeven aan Liquid: De opgehaalde data wordt doorgegeven aan de Liquid-template via response.render(). [Voorbeeld](https://github.com/ambersr/server-side-rendering-server-side-website/blob/79784183415e43f6b3c67195dfdd1da05259c14e/server.js#L81-L85)
- Data verwerken in Liquid: In de Liquid-template wordt de data met behulp van loops en variabelen verwerkt en weergegeven. [Voorbeeld](https://github.com/ambersr/server-side-rendering-server-side-website/blob/79784183415e43f6b3c67195dfdd1da05259c14e/views/webinar.liquid#L52-L53)
- HTML genereren en tonen: Liquid genereert de HTML, die naar de browser wordt gestuurd en zichtbaar wordt voor de gebruiker.
- Data opslaan wordt uitgevoerd via een POST-aanroep. De server maakt een API-aanroep om de benodigde gegevens op te halen in JSON-formaat en slaat deze op in de database. [Voorbeeld](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/0b078ab3d4ce033dbd3151874ab99308c668009e/server.js#L187-L222)
- Data verwijderen wordt uitgevoerd via een DELETE-aanroep. De server controleert de aanroep en als deze bestaat verwijderd hij de post uit de database. [Voorbeeld](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/0b078ab3d4ce033dbd3151874ab99308c668009e/server.js#L187-L222)

## Installatie

De meeste informatie is te vinden bij het kopje kenmerken. Voor verdere gebruik van mijn project zijn dit nog een paar handige benodigdheden.

#### `npm i` of `npm install`
Hiermee installeer je de benodigde packages zoals express & cookie-parser.

#### `npm start`
Hiermee start je het project.

Open vervolgens [http://localhost:8000](http://localhost:8000) om het project te zien in de browser.

Om edits te zien moet je de pagina refreshen omdat het geen hot-reload bevat.

## Bronnen

- Design Styling: [Design challenge](https://github.com/fdnd-agency/oncollaboration/wiki/Design-Challenge)
- Content: [Repository Oncollaboration](https://github.com/fdnd-agency/oncollaboration)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
