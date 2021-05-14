// Ouvrir index.html avec liveServer pour récupération de la data
// Fonction pour récupérer la data dans le fichier json
async function getPhotographers() {
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
  let data = await getPhotographers();
  let photographers = data.photographers;

  let list = document.querySelector("#list-photographers");
  //console.log(photographers);


  // Pour chaque photographe dans le tableau de photographes création des éléments DOM
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
    tagline.setAttribute("class", "citation");
    price.setAttribute("class", "priceperday");
  });

  function applyFilter(value) {
    let photographers = data.photographers;
    // Modification pour comparaison avec string dans le json
    let category = value.replace("#", "").toLowerCase();
    //console.log(category);
    list.innerHTML = "";
    for (let i = 0; i < photographers.length; i++) {
      for (let j = 0; j < photographers[i].tags.length; j++) {
        // Si l'un des tags d'un photographe === category cliqué alors affichage du nom du photographe
        if (photographers[i].tags[j] === category) {
          // Affiche le nombre de photographes qui ont cette catégorie
          console.log("COUCOU");

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

          for (let i = 0; i < photographers[i].tags.length; i++) {
            let tag = document.createElement("span");
            tag.innerText = `#${photographers[i].tags[j]}`;
            tag.setAttribute("class", "type");
            item.appendChild(tag);
          }

          photo.src =
            "../assets/Sample Photos/Photographers ID Photos/" +
            photographers[i].portrait;
          name.innerText = photographers[i].name;
          location.innerText = `${photographers[i].city}, ${photographers[i].country}`;
          tagline.innerText = photographers[i].tagline;
          price.innerText = `${photographers[i].price}€/jour`;

          link.setAttribute(
            "href",
            "photographer-page.html?id=" + photographers[i].id
          );
          photo.setAttribute("class", "photographer");
          tagline.setAttribute("class", "citation");
          price.setAttribute("class", "priceperday");
        }
      }
    }
  }

  // Fonction pour récupérer la valeur de l'élément cliqué puis application du filtre
  function findValueOfFilter() {
    let type = document.querySelectorAll("li");
    let filters = [];
    for (let i = 0; i < type.length; i++) {
      filters.push(type[i].innerText);
      type[i].addEventListener("click", function () {
        let value = type[i].innerText;
        applyFilter(value);
      });
    }
    // Afficher en console le tableau contenant les catégories
    console.log(filters);
  }
  findValueOfFilter();
}

renderPhotographers();
