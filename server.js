// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Functie fetch omzetten naar JSON
async function fetchJson(url) {
  const response = await fetch(url);
  const responseJSON = await response.json();
  return responseJSON
}

// Algemene links
const messagesLink = "https://fdnd-agency.directus.app/items/avl_messages";
const webinarsLink = "https://fdnd-agency.directus.app/items/avl_webinars";
const categoryLink = "https://fdnd-agency.directus.app/items/avl_categories";
const contouringsLink = "https://fdnd-agency.directus.app/items/avl_contourings";
const webinarsField = "?fields=id,duration,title,slug,date,video,thumbnail,.*.*,speakers.*.*,categories.avl_categories_id.*,resources.*.*";
const contouringsField = "?fields=title,image_scan,user_id.fullname,categories.avl_categories_id.*";
const messagesFilter = "?filter[for][_eq]=Watchlist Amber"

// Route voor url /
app.get('/', async function (req, res) {
    // Fetches webinars en categories
    const webinarsResponseJSON = await fetchJson(webinarsLink + webinarsField);
    const contouringsResponseJSON = await fetchJson(contouringsLink + contouringsField);

   res.render("index.liquid", { 
    webinars: webinarsResponseJSON.data,
    contourings: contouringsResponseJSON.data
  })
});

// Route voor url /webinars
app.get("/webinars", async function (req, res) {
  const categoryFilter = req.query.category || ""; // Haalt categorie uit de URL

  // Fetches webinars en categories
  const webinarsResponseJSON = await fetchJson(webinarsLink + webinarsField);
  const categoryResponseJSON = await fetchJson(categoryLink);

  let filteredWebinars = webinarsResponseJSON.data;

  if (categoryFilter) {
    filteredWebinars = filteredWebinars.filter(webinar =>
      webinar.categories.some(category => category.avl_categories_id.name === categoryFilter)
    );
  }

  res.render('webinars.liquid', {
    webinars: filteredWebinars,
    categories: categoryResponseJSON.data,
    selectedCategory: categoryFilter // Zorgt dat de juiste radio button gecheckt blijft
  });
})

// Route voor url /webinar/:slug
app.get("/webinars/:slug", async function (request, response) {
  const slug = request.params.slug

  const webinarResponseJSON = await fetchJson(webinarsLink + `?filter[slug]=${slug}&fields=featured,views,id,description,duration,title,slug,date,thumbnail,video,resources,.*.*,speakers.*.*,resources.*.*,categories.avl_categories_id.*`);
  const allWebinarsResponseJSON = await fetchJson(webinarsLink + `?fields=title,slug,thumbnail,date,speakers.*`);

  response.render("webinar.liquid", {
    webinars: webinarResponseJSON.data,
    allWebinars: allWebinarsResponseJSON.data
  });
})

app.get('/watchlist', async function (req, res) {
  const watchlistResponseJSON = await fetchJson(messagesLink + messagesFilter);
  const webinarsResponseJSON = await fetchJson(webinarsLink + webinarsField);

  // Zet de webinar ID's van de watchlist om in een Set
  const watchlistWebinarIds = new Set(watchlistResponseJSON.data.map(item => String(item.text)));

  // Filter alleen webinars die in de watchlist staan
  const webinarsInWatchlist = webinarsResponseJSON.data.filter(webinar =>
    watchlistWebinarIds.has(String(webinar.id))
  );

  // Zet de Set om naar een Array zodat Liquid de data correct kan weergeven
  const watchlistArrays = Array.from(watchlistWebinarIds);

  res.render("watchlist.liquid", {
    webinars: webinarsInWatchlist,
    watchlistIds: watchlistArrays
  });
});






app.post("/watchlist", async function (req, res) {
  const { textField, forField } = req.body; // textField is de webinar.id

  try {
    // Haal de watchlist op
    const watchlistResponseJSON = await fetchJson(messagesLink + messagesFilter);

    // Check of de webinar al in de watchlist zit
    const existingItem = watchlistResponseJSON.data.find(item => item.text === textField);

    if (existingItem) {
      // Verwijder het item als het al bestaat
      await fetch(`${messagesLink}/${existingItem.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      console.log(`Verwijderd uit watchlist: ${textField}`);
    } else {
      // Voeg het item toe als het niet bestaat
      await fetch(messagesLink, {
        method: "POST",
        body: JSON.stringify({
          text: textField,
          for: forField
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      console.log(`Toegevoegd aan watchlist: ${textField}`);
    }

    // Stuur de gebruiker terug naar de watchlist pagina
    res.redirect(303, "/watchlist");
  } catch (error) {
    console.error("Fout bij toggle van de watchlist:", error);
    res.status(500).send("Er is een fout opgetreden.");
  }
});

app.post("/webinars", async function (req, res) {
  const {
    textField,
    forField
  } = req.body; // textField is de webinar.id

  try {
    // Haal de watchlist op
    const watchlistResponseJSON = await fetchJson(messagesLink + messagesFilter);

    // Check of de webinar al in de watchlist zit
    const existingItem = watchlistResponseJSON.data.find(item => item.text === textField);

    if (existingItem) {
      // Verwijder het item als het al bestaat
      await fetch(`${messagesLink}/${existingItem.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      console.log(`Verwijderd uit watchlist: ${textField}`);
    } else {
      // Voeg het item toe als het niet bestaat
      await fetch(messagesLink, {
        method: "POST",
        body: JSON.stringify({
          text: textField,
          for: forField
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      console.log(`Toegevoegd aan watchlist: ${textField}`);
    }

    // Stuur de gebruiker terug naar de watchlist pagina
    res.redirect(303, "/webinars");
  } catch (error) {
    console.error("Fout bij toggle van de watchlist:", error);
    res.status(500).send("Er is een fout opgetreden.");
  }
});

app.post("/webinars/:slug", async function (req, res) {
  const {
    textField,
    forField
  } = req.body; // textField is de webinar.id

  try {
    // Haal de watchlist op
    const watchlistResponseJSON = await fetchJson(messagesLink + messagesFilter);

    // Check of de webinar al in de watchlist zit
    const existingItem = watchlistResponseJSON.data.find(item => item.text === textField);

    if (existingItem) {
      // Verwijder het item als het al bestaat
      await fetch(`${messagesLink}/${existingItem.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      console.log(`Verwijderd uit watchlist: ${textField}`);
    } else {
      // Voeg het item toe als het niet bestaat
      await fetch(messagesLink, {
        method: "POST",
        body: JSON.stringify({
          text: textField,
          for: forField
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      console.log(`Toegevoegd aan watchlist: ${textField}`);
    }

    // Stuur de gebruiker terug naar de watchlist pagina
    res.redirect(303, "/webinars/:slug");
  } catch (error) {
    console.error("Fout bij toggle van de watchlist:", error);
    res.status(500).send("Er is een fout opgetreden.");
  }
});

app.post("/", async function (req, res) {
  const {
    textField,
    forField
  } = req.body; // textField is de webinar.id

  try {
    // Haal de watchlist op
    const watchlistResponseJSON = await fetchJson(messagesLink + messagesFilter);

    // Check of de webinar al in de watchlist zit
    const existingItem = watchlistResponseJSON.data.find(item => item.text === textField);

    if (existingItem) {
      // Verwijder het item als het al bestaat
      await fetch(`${messagesLink}/${existingItem.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      console.log(`Verwijderd uit watchlist: ${textField}`);
    } else {
      // Voeg het item toe als het niet bestaat
      await fetch(messagesLink, {
        method: "POST",
        body: JSON.stringify({
          text: textField,
          for: forField
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
      console.log(`Toegevoegd aan watchlist: ${textField}`);
    }

    // Stuur de gebruiker terug naar de watchlist pagina
    res.redirect(303, "/");
  } catch (error) {
    console.error("Fout bij toggle van de watchlist:", error);
    res.status(500).send("Er is een fout opgetreden.");
  }
});


app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}`)
})