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
  // https://etienner.github.io/les-filtres-en-java-script/
  // https://gist.github.com/EtienneR/92726bcd596ff5265b625f8865f8bb13
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

  // Cette fonction doit appliquer un filtre sur le tableau d'origine des photographes
  function applyFilter(find){
    let photographers = data.photographers;
    // Modification pour comparaison avec string dans le json
    let category = find.replace("#","").toLowerCase();
    //console.log(category);
    list.innerHTML="";
    for(let i = 0; i < photographers.length; i++){
      for(let j = 0; j < photographers[i].tags.length; j++){
        // Si l'un des tags d'un photographe === category cliqué alors affichage du nom du photographe
        if(photographers[i].tags[j] === category){
          // Affiche le nombre de photographes qui ont cette catégorie
          console.log("COUCOU");
          let name = document.createElement("h2");
          list.appendChild(name);
          name.innerText = photographers[i].name;
        }
      }
    }
  }

  // Fonction pour récupérer la valeur de l'élément cliqué puis application du filtre
  function displayFilters() {
    let type = document.querySelectorAll("li");
    let filters = [];
    for (let i = 0; i < type.length; i++) {
      filters.push(type[i].innerText);
      type[i].addEventListener('click', function(){
        let find = type[i].innerText;
        applyFilter(find);
      });
    }
    // Afficher en console le tableau contenant les catégories
    console.log(filters);
  }
  displayFilters();
}

renderPhotographers();

let idPhotographer = "";

// Récupérer l'index grâce à la paire clé valeur id : idPhotographer
function findIndexByKeyValue(photographer, key, valuetosearch) {
  for (let i = 0; i < photographer.length; i++) {
    if (photographer[i][key] == valuetosearch) {
      return i;
    }
  }
  return null;
}

// async function photographerDetails() et async function photographerMedias()
// possible en une seule fonction ?

async function photographerDetails() {
  // Collecter l'URL après le ?id= pour le récupérer uniquement sur le fichier json
  idPhotographer = location.search.substring(4);

  const data = await getPhotographers();
  const photographers = data.photographers;

  // Appel de la fonction avec les paramètres
  let index = findIndexByKeyValue(photographers, "id", idPhotographer);
  // console.log(index);

  // Récupérer les informations du photographe grâce à son index dans le array photographers
  const photographer = data.photographers[index];
  //console.log(photographer.name);

  let profile = document.querySelector("#photographer-profile");

  // Création des balises HTML
  let name = document.createElement("h1");
  let localisation = document.createElement("p");
  let quote = document.createElement("p");
  let button = document.createElement("button");
  let photo = document.createElement("img");
  let presentation = document.createElement("article");
  let contact = document.createElement("article");
  let image = document.createElement("article");

  // Hiérarchisation des balises
  profile.appendChild(presentation);
  profile.appendChild(contact);
  profile.appendChild(image);
  presentation.appendChild(name);
  presentation.appendChild(localisation);
  presentation.appendChild(quote);
  contact.appendChild(button);
  image.appendChild(photo);

  name.innerText = photographer.name;
  localisation.innerText = `${photographer.city}, ${photographer.country}`;
  quote.innerText = photographer.tagline;

  for (let i = 0; i < photographer.tags.length; i++) {
    let tag = document.createElement("span");
    tag.innerText = `#${photographer.tags[i]}`;
    presentation.appendChild(tag);
  }

  button.innerText = "Contactez-moi";
  photo.src =
    "../assets/Sample Photos/Photographers ID Photos/" + photographer.portrait;
  photo.setAttribute("class", "photographer");
  quote.setAttribute("class", "citation");
  contact.setAttribute("class", "contact");
  image.setAttribute("class", "image");
}

async function photographerMedias() {
  idPhotographer = location.search.substring(4);
  //console.log(typeof idPhotographer); // string

  // Conversion string en number
  let id = parseInt(idPhotographer);
  //console.log(id);

  const data = await getPhotographers();

  // Récupération des photographes
  const photographer = data.photographers;

  // Appel de la fonction avec les paramètres
  let index = findIndexByKeyValue(photographer, "id", idPhotographer);

  // Récupérer les informations du photographe grâce à son index dans le array photographers
  const artiste = data.photographers[index];

  // Fonction pour récupérer UNIQUEMENT le prénom du photographe pour src des images/vidéos
  function replaceFullnameByFirstname(string) {
    let array = string.split(" ");
    let firstname = array[0];
    // Si prénom composé retiré le tiret
    let prenom = firstname.replace("-", " ");
    return prenom;
  }

  // Récupérer le prénom + nom du photographe
  const fullname = artiste.name;

  // Récupérer le prénom du photographe
  let firstname = replaceFullnameByFirstname(fullname);

  const medias = data.media;

  // Récupérer un tableau avec les images/vidéos du photographe
  const results = medias.filter((media) => media.photographerId === id);
  console.log(results);

  function createLegendForMedia(string) {
    let removeCharacter = string.replaceAll("_", " ").replace(".jpg", " ");
    console.log(removeCharacter);
    return removeCharacter;
  }

  //
  let essai = document.querySelector("#try");
  let totalOfLikes = document.createElement("h3");

  essai.appendChild(totalOfLikes);

  let total = 0;
  for (let i = 0; i < results.length; i++) {
    total += results[i].likes;
    console.log(total);
  }

  totalOfLikes.innerText = `${total} ${artiste.price}€/jour`;

  //

  // Pour chaque image/vidéo créée un article avec l'image + les informations de l'image
  results.forEach((result) => {
    let media = document.querySelector("#photographer-medias");
    let item = document.createElement("article");
    let date = document.createElement("img");

    let legendOfImage = document.createElement("p");
    let likes = document.createElement("p");
    let heart = document.createElement("button");

    // Récupération du titre de l'image
    let title = result.image;
    let legend = createLegendForMedia(title);

    media.appendChild(item);
    item.appendChild(date);
    item.appendChild(legendOfImage);
    item.appendChild(likes);
    item.appendChild(heart);

    item.setAttribute("class", "photoItem");
    date.src = `../assets/Sample Photos/${firstname}/${result.image}`;
    date.setAttribute("class", "image");
    legendOfImage.innerText = legend;
    likes.innerHTML = `${result.likes}`;
    heart.setAttribute("class", "fa fa-heart");
    heart.setAttribute("id", "like");

    let count = result.likes;

    function increment() {
      likes.innerText = count++;
      total++;
      totalOfLikes.innerHTML = `${total} ${artiste.price}€/jour`;
    }

    heart.addEventListener("click", increment);
  });
}
