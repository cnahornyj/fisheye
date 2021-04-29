// Ouvrir index.html avec liveServer pour récupération de la data
// Fonction pour récupérer la data dans le fichier json
async function getPhotographers() {
  let url = '../photographers.json';
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
  let list = document.querySelector('#list-photographers');
  data.photographers.forEach(photographer => {
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

    for(let i = 0; i < photographer.tags.length; i++){
      let tag = document.createElement("span");
      tag.innerText = `#${photographer.tags[i]}`;
      item.appendChild(tag);
    }

    photo.src = "../assets/Sample Photos/Photographers ID Photos/" + photographer.portrait;
    name.innerText = photographer.name;
    location.innerText = `${photographer.city}, ${photographer.country}`;
    tagline.innerText = photographer.tagline;
    price.innerText = `${photographer.price}€/jour`;

    link.setAttribute("href", "photographer-page.html?id="+photographer.id);
    photo.setAttribute("class","photographer");
    tagline.setAttribute("class","citation");
    price.setAttribute("class","priceperday");
  });
}

renderPhotographers();

let idPhotographer = "";

async function photographerDetails() {
  // Collecter l'URL après le ?id= pour le récupérer uniquement sur le fichier json
  idPhotographer = location.search.substring(4);

  const data = await getPhotographers();
  const photographers = data.photographers;

  // Récupérer l'index grâce à la paire clé valeur id : idPhotographer 
  function functiontofindIndexByKeyValue(photographers, key, valuetosearch) {
    for (let i = 0; i < photographers.length; i++) {
      if (photographers[i][key] == valuetosearch) {
      return i;
    }
  }
return null;
}

// Appel de la fonction avec les paramètres
let index = functiontofindIndexByKeyValue(photographers, "id", idPhotographer);
// console.log(index);

// Récupérer les informations du photographe grâce à son index dans le array photographers
const photographer = data.photographers[index];
//console.log(photographer.name);

let profile = document.querySelector('#photographer-profile');

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

for(let i = 0; i < photographer.tags.length; i++){
  let tag = document.createElement("span");
  tag.innerText = `#${photographer.tags[i]}`;
  presentation.appendChild(tag);
}

button.innerText = "Contactez-moi";
photo.src = "../assets/Sample Photos/Photographers ID Photos/" + photographer.portrait;
photo.setAttribute("class","photographer");
quote.setAttribute("class","citation");
contact.setAttribute("class","contact");
image.setAttribute("class","image");
}

async function photographerMedias(){
  idPhotographer = location.search.substring(4);
  //console.log(typeof idPhotographer); // string

  // Conversion string en number
  let id = parseInt(idPhotographer);
  //console.log(id);

  const data = await getPhotographers();

  // Récupération du prénom du photographe pour src des images
  const photographer = data.photographers;
  //console.log(photographer);

  // Récupérer l'index grâce à la paire clé valeur id : idPhotographer 
  function functiontofindIndexByKeyValue(photographer, key, valuetosearch) {
    for (let i = 0; i < photographer.length; i++) {
      if (photographer[i][key] == valuetosearch) {
      return i;
    }
  }
return null;
}

// Appel de la fonction avec les paramètres
let index = functiontofindIndexByKeyValue(photographer, "id", idPhotographer);
//console.log(index);

// Récupérer les informations du photographe grâce à son index dans le array photographers
const artiste = data.photographers[index];

// Récupération prénom + nom
const fullname = artiste.name;
//console.log(fullname);

// Tableau avec prénom + nom
const array = fullname.split(' ');

// Récupération du prénom
const firstname = array[0];
// console.log(firstname);

// Retirer le tiret si le prénom est composé
const firstnameOfPhotographer = firstname.replace('-', ' ');
// console.log(firstnameOfPhotographer);

const medias = data.media;
//console.log(typeof medias);

// Récupérer un tableau avec les images/vidéos du photographe
const results = medias.filter(media => media.photographerId === id);
//console.log(results);

// Pour chaque image/vidéo créée un article avec l'image + les informations de l'image
  results.forEach(result => {
    let media = document.querySelector("#photographer-medias");
    let item = document.createElement("article");
    let date = document.createElement("img");
    let legendOfImage = document.createElement("p");
    let likes = document.createElement("p");
    let heart = document.createElement("button");

    // Récupération du titre de l'image
    // Création d'une fonction pour la récupération du titre ?
    let title = result.image;
    const legend = title.replace('_', ' ');
    const titleOfImage = legend.replace('.jpg',' ');
    //console.log(titleOfImage);

    media.appendChild(item);
    item.appendChild(date);
    item.appendChild(legendOfImage);
    item.appendChild(likes);
    item.appendChild(heart);
    heart.setAttribute("class","fa fa-heart");
    heart.setAttribute("id","like");

    item.setAttribute("class","photoItem");
    date.src = `../assets/Sample Photos/${firstnameOfPhotographer}/${result.image}`;
    date.setAttribute("class","image");
    legendOfImage.innerText = titleOfImage;
    likes.innerHTML = `${result.likes}`;

    let count = result.likes;
    function increment(){
      likes.innerText = count++;
    }
    heart.addEventListener("click", increment);
    // Pb à chaque clic incrémentation alors que reclique devrait retirer le like non ?
  });
}



/* récupération du tableau de tags
let tags = document.querySelectorAll("li");
console.log(tags);

for(let i = 0; i < tags.length; i++){
  console.log(tags[i].textContent);
}
*/

/* au clic sur un tag appliquer un filter avec le textContent de l'élément
li cliqué
*/