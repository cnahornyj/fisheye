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

const profilePhotographer = document.getElementById("photographer-profile");
const medias = document.getElementById("photographer-medias");
const totalLikes = document.getElementById("total-likes");
const modal = document.getElementById("form-modal");
const btnCloseModal = document.getElementById("close-modal");
const form = document.querySelector("form");
modal.style.display = "none";

// async function photographerDetails() et async function photographerMedias()
// possible en une seule fonction ?

async function photographerDetails() {
  // Collecter l'URL après le ?id= pour le récupérer uniquement sur le fichier json
  idPhotographer = location.search.substring(4);

  const data = await getPhotographers();
  const photographers = data.photographers;

  // Appel de la fonction avec les paramètres
  let index = findIndexByKeyValue(photographers, "id", idPhotographer);
  //console.log(index);

  // Récupérer les informations du photographe grâce à son index dans le array photographers
  const photographer = data.photographers[index];
  //console.log(photographer.name);

  let profile = document.querySelector("#photographer-profile");

  // Création des éléments
  let name = document.createElement("h1");
  let localisation = document.createElement("p");
  let quote = document.createElement("p");
  let btnOpenModal = document.createElement("button");
  let btnOpenModalResp = document.getElementById("open-form-responsive");
  let photo = document.createElement("img");
  let presentation = document.createElement("article");
  let contact = document.createElement("article");
  let image = document.createElement("article");

  // Hiérarchisation des éléments
  profile.appendChild(presentation);
  profile.appendChild(contact);
  profile.appendChild(image);
  presentation.appendChild(name);
  presentation.appendChild(localisation);
  presentation.appendChild(quote);
  contact.appendChild(btnOpenModal);
  image.appendChild(photo);

  // Attribution des class, id, src, innerText, innerHTML
  name.innerText = photographer.name;
  localisation.innerText = `${photographer.city}, ${photographer.country}`;
  quote.innerText = photographer.tagline;

  for (let i = 0; i < photographer.tags.length; i++) {
    let tag = document.createElement("span");
    tag.innerText = `#${photographer.tags[i]}`;
    presentation.appendChild(tag);
  }

  btnOpenModal.innerText = "Contactez-moi";
  btnOpenModal.setAttribute("id", "btn-open-modal");
  photo.src =
    "../assets/Sample Photos/Photographers ID Photos/" + photographer.portrait;
  photo.setAttribute("class", "photographer");
  quote.setAttribute("class", "citation");
  contact.setAttribute("class", "contact");
  image.setAttribute("class", "image");

  // Faut il vérifier les champs saisies par l'utilisateur ?

  let nameOfPhotographer = document.getElementById("name-photographer");
  nameOfPhotographer.innerHTML = `Contactez-moi <br> ${photographer.name}`;

  function openFormModal() {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "true");
    btnCloseModal.focus();
    profilePhotographer.setAttribute("aria-hidden", "false");
    medias.setAttribute("aria-hidden", "false");
    totalLikes.setAttribute("aria-hidden", "false");
  }

  // Passer la fonction à l'évènement click
  btnOpenModal.addEventListener("click", openFormModal);
  btnOpenModalResp.addEventListener("click", openFormModal);

  /* Voir si l'exécution par défaut de la soumission du formulaire doit elle se faire ?
  + ou faut il ajouter un message de réussite ?
  */
  function closeFormModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "false");
    profilePhotographer.setAttribute("aria-hidden", "true");
    medias.setAttribute("aria-hidden", "true");
    totalLikes.setAttribute("aria-hidden", "true");
  }

  btnCloseModal.addEventListener("click", closeFormModal);

  // Afficher les champs saisis par l'utilisateur dans le formulaire de contact sur la page d'un photographe
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let prenom = form.elements["firstname"].value;
    let nom = form.elements["name"].value;
    let email = form.elements["email"].value;
    let message = form.elements["message"].value;
    console.log(prenom, nom, email, message);
    closeFormModal();
  });
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

  /* Récupérer le prénom du photographe en faisant appel à la fonction replaceFullnameByFirstname 
  avec le nom complet en paramètre */
  let firstname = replaceFullnameByFirstname(fullname);

  const medias = data.media;

  // Récupérer un tableau avec les images/vidéos du photographe
  const results = medias.filter((media) => media.photographerId === id);
  //console.log(results);

  // Fonction pour créer une légende pour chaque média
  function createLegendForMedia(string) {
    let removeCharacter = string.replaceAll("_", " ").replace(".jpg", " ");
    //console.log(removeCharacter);
    return removeCharacter;
  }

  let sectionLikes = document.querySelector("#total-likes");
  let totalOfLikes = document.createElement("h3");

  sectionLikes.appendChild(totalOfLikes);

  // Faire le total des likes avec le nombre de likes par média
  let total = 0;
  for (let i = 0; i < results.length; i++) {
    total += results[i].likes;
    //console.log(total);
  }

  // Afficher le nombre total de likes par artiste + prix de sa prestation à la journée
  totalOfLikes.innerHTML = `${total} <i class="fa fa-heart icon"></i> ${artiste.price}€ / jour`;

  //

  // Pour chaque média créé un article avec le media + ses informations
  results.forEach((result) => {
    // Création des éléments
    let media = document.querySelector("#photographer-medias");
    let item = document.createElement("article");
    let date = document.createElement("img");
    let detailsOfImage = document.createElement("aside");
    let legendOfImage = document.createElement("p");
    let details = document.createElement("aside");
    let likes = document.createElement("p");
    let heart = document.createElement("button");

    // Récupération du titre de l'image
    let title = result.image;
    let legend = createLegendForMedia(title);

    // Hiérarchisation des éléments
    media.appendChild(item);
    item.appendChild(date);
    item.appendChild(detailsOfImage);
    detailsOfImage.appendChild(legendOfImage);
    detailsOfImage.appendChild(details);
    details.appendChild(likes);
    details.appendChild(heart);

    // Attribution des class, id, src, innerText, innerHTML
    item.setAttribute("class", "photoItem");
    date.src = `../assets/Sample Photos/${firstname}/${result.image}`;
    date.setAttribute("class", "image");
    detailsOfImage.setAttribute("class", "details-image");
    legendOfImage.innerText = legend;
    details.setAttribute("class", "details-likes");
    likes.innerHTML = `${result.likes}`;
    heart.setAttribute("class", "fa fa-heart");
    heart.setAttribute("id", "like");

    let count = result.likes;

    function incrementLikes() {
      likes.innerText = count++;
      total++;
      totalOfLikes.innerHTML = `${total} <i class="fa fa-heart icon"></i> ${artiste.price}€ / jour`;
    }

    heart.addEventListener("click", incrementLikes);

    // onclick sur l'image ouverture de la light-box
  });
}
