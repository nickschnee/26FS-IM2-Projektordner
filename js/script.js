console.log("Hello World!");

const searchForm = document.querySelector("#searchForm");
const submitButton = document.querySelector("#submitButton");
const searchBar = document.querySelector("#searchBar");
const gallery = document.querySelector("#gallery");

async function searchCocktail(suchbegriff) {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${suchbegriff}`,
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

function createCard(cocktail) {
  const name = cocktail.strDrink;
  console.log(name);

  const image = cocktail.strDrinkThumb;
  console.log(image);

  //create card
  const card = document.createElement("div");
  card.classList.add("card");
  //   gallery.appendChild(img);

  // h2 appenden
  const h2 = document.createElement("h2");
  h2.innerHTML = name;
  card.appendChild(h2);

  const img = document.createElement("img");
  img.src = image;
  card.appendChild(img);

  return card;
}

searchForm.addEventListener("submit", async (event) => {
  // prevent reload of form
  event.preventDefault();

  gallery.innerHTML = "";

  // hier holen wir den suchbegriff aus dem html
  let suchbegriff = searchBar.value;

  // wir testen, ob wir den suchbegriff geholt haben
  console.log("SearchTerm is:", suchbegriff);

  // wir rufen die funktion zum fetch auf
  // wir geben einen suchbegriff rein
  // wir erhalten eine liste von cocktails zurück
  let cocktails = await searchCocktail(suchbegriff);

  // wir zeigen die liste von cocktails an
  console.log(cocktails);

  cocktails.forEach((cocktail, index) => {
    // neue funktion für card von diesem einen cocktail
    let card = createCard(cocktail);

    gallery.appendChild(card);
  });
});
