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

let list = document.querySelector("#list-photographers");

// Fonction pour créer les éléments du DOM selon ce qu'il reçoit
function createElements(object) {
  //console.log(photographers);

  // Pour chaque photographe dans le tableau de photographes création des éléments DOM
  object.forEach((photographer) => {
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
}

// Fonction pour afficher la liste des photographes
async function renderPhotographers() {
  // Récupération de la data
  let data = await getPhotographers();
  let photographers = data.photographers;
  //console.log(photographers);
  //console.log(typeof photographers);
  createElements(photographers);

  let selectedFilter = [];
  let arrayFiltered = [];

  // Fonction pour récupérer la valeur de l'élément cliqué puis application du filtre (pas tout à fait)
  function applyFilter() {
    let type = document.querySelectorAll("input[type=checkbox]");
    /*let span = document.querySelectorAll("span.filter");
    console.log(span);*/
    for (let i = 0; i < type.length; i++) {
      type[i].addEventListener("change", function () {
        if (this.checked) {
          //console.log(`${type[i].value} is checked..`);
          selectedFilter.push(type[i].value);
          let filter = type[i].value;
          for (let j = 0; j < photographers.length; j++) {
            for (let h = 0; h < photographers[j].tags.length; h++) {
              if (photographers[j].tags[h] === filter) {
                arrayFiltered.push(photographers[j]);
              }
            }
          }
          list.innerHTML = "";
          createElements(arrayFiltered);
          /*console.log(arrayFiltered);
          console.log(selectedFilter);*/
        } else {
          console.log(`${type[i].value} is not anymore checked..`);
          arrayFiltered = [];
          list.innerHTML = "";
          selectedFilter.shift();
          createElements(photographers);
          /*console.log(selectedFilter);
          console.log(arrayFiltered);*/
        }
      });
    }
  }
  applyFilter();
}

renderPhotographers();
