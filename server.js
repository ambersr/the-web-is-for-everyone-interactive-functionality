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

/*
// Zie https://expressjs.com/en/5x/api.html#app.get.method over app.get()
app.get(…, async function (request, response) {
  
  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  response.render(…)
})
*/

/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/

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
app.get("/webinars", async function (req, res){
 
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
app.get("/webinars/:slug", async function (request, response){
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

  const watchlistWebinarIds = new Set(watchlistResponseJSON.data.map(item => String(item.text))); 

  // Filter de webinars die in de watchlist staan
  const webinarsInWatchlist = webinarsResponseJSON.data.filter(webinar => watchlistWebinarIds.has(String(webinar.id)));

  res.render("watchlist.liquid", { 
    webinars: webinarsInWatchlist, 
    watchlist: watchlistResponseJSON.data
  });
});

app.post('/watchlist', async function (req, res) {
  await fetch(messagesLink, {
    method: "POST",
    body: JSON.stringify({
     text: req.body.text,
      for: req.body.forField,
    }),
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
  res.redirect(303, '/watchlist');
});

app.post('/webinars', async function (req, res) {
  await fetch(messagesLink, {
    method: "POST",
    body: JSON.stringify({
     text: req.body.text,
      for: req.body.forField,
    }),
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
  res.redirect(303, '/webinars');
});

// via deze route gaan wij de webinars opslaan
app.post('/', async function (req, res) {
  console.log("📩 Ontvangen POST-data:", req.body);

  const webinarId = req.body.text;  // Hier zou nu de ID goed moeten binnenkomen!
  const userWatchlist = "Watchlist Amber";

  if (!webinarId) {
    console.error("❌ Geen webinarId ontvangen!");
    return res.redirect(303, '/'); // Stop de functie als er geen ID is
  }

  const watchlistItems = await fetchJson(`${messagesLink}?filter[text][_eq]=${webinarId}&filter[for][_eq]=${userWatchlist}`);

  if (watchlistItems.data.length > 0) {
    const itemId = watchlistItems.data[0].id;
    await fetch(`${messagesLink}/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    });
    console.log(`🚮 Webinar ${webinarId} verwijderd uit de watchlist.`);
  } else {
    await fetch(messagesLink, {
      method: "POST",
      body: JSON.stringify({
        text: webinarId,
        for: userWatchlist,
      }),
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    });
    console.log(`✅ Webinar ${webinarId} toegevoegd aan de watchlist.`);
  }

  const updatedWatchlist = await fetchJson(`${messagesLink}?filter[for][_eq]=${userWatchlist}`);
  console.log("📜 Actuele watchlist:", updatedWatchlist.data);

  res.redirect(303, '/');
});




app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})
