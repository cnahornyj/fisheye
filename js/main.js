// Ouvrir index.html avec liveServer pour récupération de la data
// Fonction pour récupérer la data dans le fichier json
async function getData() {
  let url = "../photographers.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// Fonction pour afficher la liste des photographes
async function renderPhotographers() {
  // Récupération de la data
  let data = await getData();
  let photographers = data.photographers;

  let list = document.querySelector("#list-photographers");

  function createView(arrayOfObjects) {
    // Pour chaque photographe création des éléments DOM
    photographers.forEach((photographer) => {
      // Création des balises HTML
      let item = document.createElement("article");
      let link = document.createElement("a");
      let photo = document.createElement("img");
      let name = document.createElement("h2");
      let location = document.createElement("p");
      let tagline = document.createElement("p");
      let price = document.createElement("p");

      list.appendChild(item);
      item.appendChild(link);
      link.appendChild(photo);
      link.appendChild(name);
      item.appendChild(location);
      item.appendChild(tagline);
      item.appendChild(price);

      for (let i = 0; i < photographer.tags.length; i++) {
        let tag = document.createElement("span");
        tag.innerText = `#${photographer.tags[i]}`;
        tag.setAttribute("class", "type");
        item.appendChild(tag);
      }

      photo.src =
        "../assets/Sample Photos/Photographers ID Photos/" +
        photographer.portrait;
      name.innerText = photographer.name;
      location.innerText = `${photographer.city}, ${photographer.country}`;
      tagline.innerText = photographer.tagline;
      price.innerText = `${photographer.price}€/jour`;

      link.setAttribute("href", "photographer-page.html?id=" + photographer.id);
      photo.setAttribute("class", "photographer");
      photo.setAttribute("alt", "");
      tagline.setAttribute("class", "citation");
      price.setAttribute("class", "priceperday");
    });
  }

  createView(photographers);

  function filteredByCategory(category) {
    list.innerHTML = "";
    let newArray = [];
    // Parcourir chaque photographe dans le tableau de photographes
    for (let i = 0; i < photographers.length; i++) {
      // Parcourir chaque tag dans le tableau de tags de chaque photographe
      for (let j = 0; j < photographers[i].tags.length; j++) {
        // Si l'un des tags d'un photographe === category cliqué alors photographe ajouté à un nouveau tableau
        if (photographers[i].tags[j] === category) {
          newArray.push(photographers[i]);
        }
      }
    }
    photographers = newArray;
    createView(photographers);
  }

  const ENTER_KEY_CODE = 13;

  let type = document.querySelectorAll("li");

  for (let i = 0; i < type.length; i++) {
    type[i].setAttribute("tabindex", 0);
    type[i].addEventListener("keydown", (e) => {
      if (e.keyCode === ENTER_KEY_CODE) {
        let value = type[i].innerText;
        // Modification pour comparaison avec string dans le json
        let category = value.replace("#", "").toLowerCase();
        console.log(`Filtre sélectionné : ${category}`);
        filteredByCategory(category);
      }
    });
    type[i].addEventListener("click", function () {
      let value = type[i].innerText;
      // Modification pour comparaison avec string dans le json
      let category = value.replace("#", "").toLowerCase();
      console.log(`Filtre sélectionné : ${category}`);
      filteredByCategory(category);
    });
  }
}

renderPhotographers();
