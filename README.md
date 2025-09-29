# Platform Oncollaboration

Het platform waar radiologen uit Indonesië en Nederland samenkomen om hun kennis te delen en recente ontwikkelingen in hun medische vakgebied te bespreken.

Tijdens sprint 8 lag de focus voor het ontwikkelen van de pagina's op de webinar overzichtspagina en de webinar detailpagina. Alle content wordt dynamisch opgehaald uit een database die ik van de opdrachtgever ontvangen heb.

### Wie is Oncollaboration
Oncollaboration is een ontwerp voor een online platform voor samenwerking en kennisdeling tussen Indoneschische en Nederlandse radiotherapeuten. Oncollaboration is het afstudeerwerk van oud-CMD student Sergio Eijben. Sergio is in opdracht van radiotherapeute Judi van Diessen van het Antoni van Leeuwenhoek ziekenhuis afgestudeerd op de vraag over hoe de samenwerking en kennisdeling tussen Indoneschische en Nederlandse radiotherapeuten te verbeteren.

### Vraag opdrachtgever

Ontwikkel een responsive, toegankelijk en gebruiksvriendelijk platform waar de waarde webinars naar voren komen.

Link naar de website: https://the-web-is-for-everyone-interactive-5eue.onrender.com/

<img width="1470" height="797" alt="image" src="https://github.com/user-attachments/assets/6052ff6b-9468-4dfb-b5c8-a88efbd9bacc" />


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

- Homepagina: Een introductie van Oncollaboration met een overzicht van webinars en contourings. [Linkje naar de homepagina](https://the-web-is-for-everyone-interactive-5eue.onrender.com/)

- Webinar Overzichtspagina: Een overzicht van alle webinars, waarbij gebruikers kunnen zoeken en filteren op categorie. [Linkje naar de Overzichtspagina](https://the-web-is-for-everyone-interactive-5eue.onrender.com/webinars)

- Watchlistpagina: Op deze pagina worden de webinars die door een gebruiker zijn toegevoegd aan de watchlist hier getoond. [Linkje naar de Watchlistpagina](https://the-web-is-for-everyone-interactive-5eue.onrender.com/watchlist)

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

### UI States

### Filter webinar
- **Ideal state:** Wanneer een categorie is geselecteerd en er webinars beschikbaar zijn binnen die categorie, wordt de juiste webinar weergegeven.

**Implementatie:** Dit wordt gerealiseerd met een `if` en `else` tag. Als er één of meerdere webinars beschikbaar zijn, worden deze getoond binnen de geselecteerde categorie. Voorbeeld in mijn code. [Voorbeeld in mijn code](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/a2901cf18ddaa5281a811cfb3aaccabab1a3a0ad/views/webinars.liquid#L52-L53)

- **Empty state:** Wanneer er geen webinars beschikbaar zijn voor een bepaalde categorie, wordt dit duidelijk gecommuniceerd via een melding. De gebruiker krijgt het advies om een andere categorie te kiezen, zodat de volgende stap in het proces wordt gestimuleerd. 

Implementatie: Aan de hand van een `if` en `else` tag. Als er geen webinars beschikbaar zijn laat dan de fallback zien. [Voorbeeld in mijn liquid](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/a2901cf18ddaa5281a811cfb3aaccabab1a3a0ad/views/webinars.liquid#L54-L60)

<img width="264" alt="image" src="https://github.com/user-attachments/assets/e5c3fda7-0efb-4b97-a747-b98a22302a90" />

### Watchlistpagina

-**Ideal state:** Wanneer er een webinar toegevoegd is aan de watchlist wordt alleen deze webinar(s) laten zien.

Implementatie: Aan de hand van een `if` en `else` tag uitgevoerd. Wanneer 1 of meer webinars in de watchlist zijn toon dan de webinars die zijn toegevoegd aan de watchlist. [Voorbeeld in mijn liquid](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/a2901cf18ddaa5281a811cfb3aaccabab1a3a0ad/views/watchlist.liquid#L16-L17)

- **Empty state:** Bij de empty state wordt er aan de hand van een tekst en een icon weergegeven

Implementatie: Uitgevoerd met een `if` en `else` tag. Wanneer er geen webinars zijn toegevoegd aan de watchlist, wordt een fallback weergegeven. Hierin wordt de gebruiker geïnformeerd dat er nog geen webinars in de watchlist staan. Daarnaast wordt de gebruiker gestimuleerd om naar de webinarpagina te gaan via een knop, zodat er eenvoudig webinars aan de watchlist kunnen worden toegevoegd. [Voorbeeld in mijn liquid](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/a2901cf18ddaa5281a811cfb3aaccabab1a3a0ad/views/watchlist.liquid#L18-L25)

<img width="312" alt="image" src="https://github.com/user-attachments/assets/6cb1198a-2f01-49b4-94a7-975a781f440d" />

### Webinar kaartjes

- **Ideal state:** Wanneer er nog geen actie is ondernomen om een webinar toe te voegen aan de watchlist, wordt de knop standaard weergegeven als "Add to watchlist".

**Implementatie:** Dit wordt gerealiseerd met `if` en `else` tags. Als de ID van de webinar nog niet in de watchlist staat, wordt het label "Add to watchlist" weergegeven. [Voorbeeld in mijn liquid](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/c516c8629087afabfec7355cb89047370143ac21/views/partials/webinar-card.liquid#L27-L30)

- **Loading state:** Zodra de gebruiker op "Add to watchlist" of "Remove from watchlist" klikt, verandert het label naar "Loading", inclusief een laadicoon. Dit geeft visuele feedback dat de actie wordt verwerkt, zoals het toevoegen of verwijderen van een webinar uit de watchlist.

**Implementatie:** Dit wordt uitgevoerd met client-side JavaScript, waarbij de klasse "loading" aan de knop wordt toegevoegd tijdens het laden. Met keyframes wordt een animatie toegepast op het laadicoon. [Voorbeeld javascript code](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/c516c8629087afabfec7355cb89047370143ac21/views/webinars.liquid#L86) & [voorbeeld CSS code](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/c516c8629087afabfec7355cb89047370143ac21/public/styles/styles.css#L421-L447)

- **Success state:** Wanneer een webinar succesvol is toegevoegd aan de watchlist, verandert de knop van "Add to watchlist" naar "Remove from watchlist", inclusief een aangepast icoon. Dit laat de gebruiker zien dat de actie is voltooid en de webinar zich nu in de watchlist bevindt.

Implementatie: Dit wordt gerealiseerd met `if` en `else` tags. Zodra de webinar-ID is opgeslagen in de database, wordt het label en icoon aangepast naar "Remove from watchlist". [Voorbeeld in mijn liquid](https://github.com/ambersr/the-web-is-for-everyone-interactive-functionality/blob/c516c8629087afabfec7355cb89047370143ac21/views/partials/webinar-card.liquid#L24-L26)
  
<img width="679" alt="image" src="https://github.com/user-attachments/assets/1de40e76-1294-46b3-a6a2-d17fec3e93f5" />

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
