async function getData() {
  let url = "../photographers.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

let idPhotographer = "";

// Fonction pour récupérer l'index grâce à la paire clé valeur id : idPhotographer
function findIndexByKeyValue(photographer, key, valuetosearch) {
  for (let i = 0; i < photographer.length; i++) {
    if (photographer[i][key] == valuetosearch) {
      return i;
    }
  }
  return null;
}

const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const modal = document.getElementById("form-modal");
const focusableElements =
  'button, input, textarea, [tabindex]:not([tabindex="-1"])';
const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1];
const btnCloseModal = document.getElementById("close-modal");
const form = document.forms["contact"];

async function photographerDetails() {
  // Collecter l'id dans l'URL pour le récupérer sur le fichier json
  idPhotographer = location.search.substring(4);

  const data = await getData();
  const photographers = data.photographers;

  // Appel de la fonction findIndexByKeyValue() avec les paramètres
  const index = findIndexByKeyValue(photographers, "id", idPhotographer);

  // Récupérer les informations du photographe grâce à son index dans le array photographers
  const photographer = data.photographers[index];

  let pageOf = document.querySelector("title");
  let profile = document.querySelector("#photographer-profile");

  // Création des éléments
  let name = document.createElement("h1");
  let localisation = document.createElement("p");
  let quote = document.createElement("p");
  let btnOpenModal = document.createElement("button");
  let btnOpenModalResp = document.createElement("button");
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
  contact.appendChild(btnOpenModalResp);
  image.appendChild(photo);

  // Attribution des class, id, src, innerText, innerHTML
  pageOf.textContent = `${photographer.name} - Photographe - Fisheye`;
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
  btnOpenModalResp.innerText = "Contactez-moi";
  btnOpenModalResp.setAttribute("id","open-form-responsive");
  photo.src =
    "../assets/Sample Photos/Photographers ID Photos/" + photographer.portrait;
  photo.setAttribute("class", "photographer");
  photo.setAttribute("alt","Photo de profil du photographe");
  quote.setAttribute("class", "citation");
  contact.setAttribute("class", "contact");
  image.setAttribute("class", "image");

  let nameOfPhotographer = document.getElementById("name-photographer");
  nameOfPhotographer.innerHTML = `Contactez-moi <br> ${photographer.name}`;

  function openFormModal() {
    // Mise en retrait de l'ensemble du contenu du document, en dehors de la modale
    body.style.overflow = "hidden";
    btnOpenModalResp.style.display = "none";
    header.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    header.style.opacity = "0.5";
    main.style.opacity = "0.5";
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    // Gestion du focus uniquement dans la modale formulaire
    modal.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab" || e.keyCode === 9;
      if (!isTabPressed) {
        return;
      }
      // Si les touches shift + tab sont pressées
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
        // Si la touche tabulation est pressée
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
    firstFocusableElement.focus();
  }
  // Passer la fonction à l'évènement click sur les deux boutons d'ouverture de la form modale
  btnOpenModal.addEventListener("click", openFormModal);
  btnOpenModalResp.addEventListener("click", openFormModal);

  function closeFormModal() {
    // Mise en retrait de la modale à la fermeture de celle-ci
    body.style.overflow = "visible";
    btnOpenModalResp.style.display = "block";
    header.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
    header.style.opacity = "1";
    main.style.opacity = "1";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    let success = document.getElementById("msg-success");
    success.textContent = "";
    success.style.display = "none";
  }
  // Passer la fonction à l'évènement click sur le bouton de fermeture de la form modale
  btnCloseModal.addEventListener("click", closeFormModal);
}

// Vérification des champs saisies par l'utilisateur lors de la soumission du formulaire
function validateForm(event) {
  // REGEX
  let checkString = /^[a-zA-Z]{2}/;
  let checkMail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  let prenom = form.elements["firstname"].value;
  let nom = form.elements["name"].value;
  let email = form.elements["email"].value;
  let message = form.elements["message"].value;

  if (!checkString.test(prenom) || prenom === "") {
    let errorFirstname = document.getElementById("error-firstname");
    errorFirstname.classList.add("input-error");
    errorFirstname.innerText =
      "Veuillez entrer au moins 2 caractères alphabétiques pour le champ du prénom";
    return false;
  } else if (!checkString.test(nom) || nom === "") {
    let errorLastname = document.getElementById("error-lastname");
    errorLastname.classList.add("input-error");
    errorLastname.innerText =
      "Veuillez entrer au moins 2 caractères alphabétiques pour le champ du prénom";
    return false;
  } else if (!checkMail.test(email) || email === "") {
    let errorEmail = document.getElementById("error-mail");
    errorEmail.classList.add("input-error");
    errorEmail.innerText = "Email incorrect";
    return false;
  } else if (!checkString.test(message) || message === "") {
    let errorMessage = document.getElementById("error-textarea");
    errorMessage.classList.add("input-error");
    errorMessage.innerText =
      "Veuillez entrer au moins 2 caractères alphabétiques pour le champ du message";
    return false;
  } else {
    event.preventDefault();
    let spansError = document.querySelectorAll("span.input-error");
    for (let i = 0; i < spansError.length; i++) {
      spansError[i].innerText = "";
    }
    // Affichage des champs saisis par l'utilisateur en console
    console.log(prenom, nom, email, message);
    form.reset();
    // Affichage d'un message de réussite d'envoi à l'utilisateur
    let success = document.getElementById("msg-success");
    success.textContent = "Message envoyé";
    success.style.display = "block";
    let champsSaisies = document.querySelectorAll(
      "input[type=text],input[type=email],textarea"
    );
    for (let i = 0; i < champsSaisies.length; i++) {
      champsSaisies[i].classList.remove("input-error");
    }
  }
}

photographerDetails();

async function photographerMedias() {
  idPhotographer = location.search.substring(4);
  //console.log(typeof idPhotographer); // string

  // Conversion string en number
  let id = parseInt(idPhotographer);

  const data = await getData();

  // Récupération des photographes
  const photographer = data.photographers;

  // Appel de la fonction findIndexByKeyValue() avec les paramètres
  const index = findIndexByKeyValue(photographer, "id", idPhotographer);

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
  let results = medias.filter((media) => media.photographerId === id);

  // Fonction pour créer une légende pour chaque média
  function createLegendForMedia(string) {
    if (string.endsWith(".jpg")) {
      let removeCharacter = string.replaceAll("_", " ").replace(".jpg", " ");
      return removeCharacter;
    } else {
      let removeCharacter = string.replaceAll("_", " ").replace(".mp4", " ");
      return removeCharacter;
    }
  }

  let sectionLikes = document.querySelector("#total-likes");
  let totalOfLikes = document.createElement("h3");

  sectionLikes.appendChild(totalOfLikes);

  // Faire le total des likes avec le nombre de likes par média
  let total = 0;
  for (let i = 0; i < results.length; i++) {
    total += results[i].likes;
  }

  // Afficher le nombre total de likes par artiste + prix de sa prestation à la journée
  totalOfLikes.innerHTML = `${total} <i class="fa fa-heart icon"></i> ${artiste.price}€ / jour`;
  

  let media = document.querySelector("#photographer-medias");

  function createView(arrayOfObjects) {
    // Pour chaque média créé un article avec le média + ses informations
    arrayOfObjects.forEach((result) => {
      // Création des éléments
      let details = document.createElement("article");
      let likes = document.createElement("p");
      let heart = document.createElement("button");

      // Si le media a une clé image création, hiérarchisation des éléments suivants
      if (Object.prototype.hasOwnProperty.call(result, "image")) {
        // Création des éléments
        let item = document.createElement("article");
        media.appendChild(item);
        let link = document.createElement("a");
        let photography = document.createElement("img");
        let detailsOfPhotography = document.createElement("article");
        let legendOfPhotography = document.createElement("p");
        let title = result.image;
        let legend = createLegendForMedia(title);

        // Hiérarchisation des éléments
        item.appendChild(link);
        link.appendChild(photography);
        item.appendChild(detailsOfPhotography);
        detailsOfPhotography.appendChild(legendOfPhotography);
        detailsOfPhotography.appendChild(details);
        details.appendChild(likes);
        details.appendChild(heart);

        // Attribution des class, id, src etc
        item.setAttribute("class", "photoItem");
        link.setAttribute(
          "href",
          `../assets/Sample Photos/${firstname}/${result.image}`
        );
        link.setAttribute("id",`${legend}`);
        link.setAttribute("aria-label",`Lien vers la photo ${legend} dans la lightbox`);
        photography.src = `../assets/Sample Photos/${firstname}/${result.image}`;
        photography.setAttribute("class", "image");
        photography.setAttribute("alt", result.description);
        detailsOfPhotography.setAttribute("class", "details-image");
        legendOfPhotography.innerText = legend;

        // Sinon si le media a une clé video création, hiérarchisation des éléments suivants
      } else if (Object.prototype.hasOwnProperty.call(result, "video")) {
        // Création des éléments
        let item = document.createElement("article");
        media.appendChild(item);
        let link = document.createElement("a");
        let video = document.createElement("video");
        let subtitles = document.createElement("track");
        let detailsOfVideo = document.createElement("article");
        let legendOfVideo = document.createElement("p");
        let title = result.video;
        let legend = createLegendForMedia(title);

        // Hiérarchisation des éléments
        item.appendChild(link);
        link.appendChild(video);
        video.appendChild(subtitles);
        item.appendChild(detailsOfVideo);
        detailsOfVideo.appendChild(legendOfVideo);
        detailsOfVideo.appendChild(details);
        details.appendChild(likes);
        details.appendChild(heart);

        // Attribution des class, id src etc
        item.setAttribute("class", "photoVideo");
        link.setAttribute(
          "href",
          `../assets/Sample Photos/${firstname}/${result.video}`
        );
        link.setAttribute("id",`${legend}`);
        link.setAttribute("aria-label",`Lien vers la vidéo ${legend} dans la lightbox`);
        legendOfVideo.innerText = legend;
        video.setAttribute("width", "313px");
        video.setAttribute("height", "280px");
        video.setAttribute("controls", "");
        detailsOfVideo.setAttribute("class", "details-image");
        video.src = `../assets/Sample Photos/${firstname}/${result.video}`;
        video.setAttribute("type", "video/mp4");
        subtitles.setAttribute("kind", "subtitles");
        subtitles.setAttribute("srclang", "fr");
        subtitles.src = `../tracks/${result.description}`;
      }

      // Partie likes
      details.setAttribute("class", "details-likes");
      likes.innerHTML = `${result.likes}`;
      heart.setAttribute("class", "fa fa-heart like");
      heart.setAttribute("aria-label","Liker le média");

      let count = result.likes;

      heart.addEventListener("click", function () {
        count++;
        likes.innerText = count;
        total++;
        totalOfLikes.innerHTML = `${total} <i class="fa fa-heart icon"></i> ${artiste.price}€ / jour`;
      });
    });

    class Lightbox {
      static init() {
        const links = Array.from(
          document.querySelectorAll('a[href$=".jpg"],a[href$=".mp4"]')
        );

        const gallery = links.map((link) => link.getAttribute("href"));
        const galleryOfAlts = links.map((link) => link.children[0].alt);
        const srcOfVideo = document.querySelector("track").src;

        /* Dans le cas d'une vidéo la valeur vaudra undefined on la remplace
        donc par l'attribut src de la vidéo dans notre cas il n'y en a qu'une seule */
        for (let i = 0; i < galleryOfAlts.length; i++) {
          if (galleryOfAlts[i] === undefined) {
            galleryOfAlts[i] = srcOfVideo;
          }
        }

        links.forEach((link) =>
          link.addEventListener("click", (e) => {
            e.preventDefault();
            //console.log(e.currentTarget);
            new Lightbox(
              e.currentTarget.getAttribute("href"),
              e.currentTarget.children[0].alt,
              gallery,
              galleryOfAlts
            );
          })
        );
      }

      /**
       * @param {string} url URL de l'image
       * @param {string[]} alt Attribut ALT de l'image
       * @param {string[]} images Chemins des images/vidéos de la lightbox
       * @param {string[]} alts Chemins des attributs alt pour les images de la lightbox
       */
      constructor(url, alt, images, alts) {
        this.element = this.buildDOM(url);
        this.alt = alt;
        this.images = images;
        this.alts = alts;
        this.loadImage(url, alt);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        document.addEventListener("keyup", this.onKeyUp);
      }

      /**
       * @param {string} url URL de l'image
       */
      loadImage(url, alt) {
        this.url = null;
        this.alt = null;
        if (url.endsWith(".mp4")) {
          this.url = url;
          this.alt = alt;
          const video = document.createElement("video");
          const subtitles = document.createElement("track");
          let legend = document.createElement("p");
          const container = this.element.querySelector(".lightbox__container");
          container.innerHTML = "";
          container.appendChild(video);
          container.appendChild(legend);
          video.appendChild(subtitles);
          video.setAttribute("width", "40%");
          video.setAttribute("controls", "");
          video.src = url;
          subtitles.setAttribute("kind", "subtitles");
          subtitles.setAttribute("srclang", "fr");
          subtitles.setAttribute("src", this.alt);
          let realLegend = this.createLegend(this.url);
          legend.innerText = realLegend;
        } else {
          this.url = url;
          this.alt = alt;
          const image = new Image();
          let legend = document.createElement("p");
          const container = this.element.querySelector(".lightbox__container");
          container.innerHTML = "";
          container.appendChild(image);
          container.appendChild(legend);
          image.src = url;
          image.setAttribute("alt", this.alt);
          let realLegend = this.createLegend(this.url);
          legend.innerText = realLegend;
        }
      }

      createLegend(url) {
        let array = url.split("/");
        let realLegend = array[array.length - 1].replaceAll("_", " ");
        if (realLegend.endsWith(".jpg")) {
          return realLegend.replace(".jpg", " ");
        } else {
          return realLegend.replace(".mp4", " ");
        }
      }

      /**
       * @param {KeyboardEvent} e
       */
      onKeyUp(e) {
        if (e.key === "Escape") {
          this.close(e);
        } else if (e.key === "ArrowLeft") {
          this.prev(e);
        } else if (e.key === "ArrowRight") {
          this.next(e);
        } else if (e.keyCode == 32) {
          e.preventDefault();
          this.playVideo(e);
        }
      }

      /**
       * Ferme la ligthbox
       * @param {MouseEvent|KeyboardEvent} e
       */
      close(e) {
        e.preventDefault();
        this.element.classList.add("fadeOut");
        window.setTimeout(() => {
          this.element.parentElement.removeChild(this.element);
        }, 500);
        document.removeEventListener("keyup", this.onKeyUp);
      }

      /**
       * @param {MouseEvent|KeyboardEvent} e
       */
      next(e) {
        e.preventDefault();
        let i = this.images.findIndex((image) => image === this.url);
        if (i === this.images.length - 1) {
          i = -1;
        }
        let j = this.alts.findIndex((alt) => alt === this.alt);
        if (j === this.alts.length - 1) {
          j = -1;
        }
        this.loadImage(this.images[i + 1], this.alts[j + 1]);
      }

      /**
       * @param {MouseEvent|KeyboardEvent} e
       */
      prev(e) {
        e.preventDefault();
        let i = this.images.findIndex((image) => image === this.url);
        if (i === 0) {
          i = this.images.length;
        }
        let j = this.alts.findIndex((alt) => alt === this.alt);
        if (j === 0) {
          j = this.alts.length;
        }
        this.loadImage(this.images[i - 1], this.alts[j - 1]);
      }

      playVideo(e) {
        e.preventDefault();
        this.element.querySelector("video").focus();
      }

      keepFocusInLightbox() {
        let lightbox = this.element;
        let focusableElements = "button, video";
        let focusableContent = lightbox.querySelectorAll(focusableElements);
        let firstFocusableElement = focusableContent[0];
        let lastFocusableElement =
          focusableContent[focusableContent.length - 1];

        lightbox.addEventListener("keydown", function (e) {
          let isTabPressed = e.key === "Tab" || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        });
        firstFocusableElement.focus();
      }

      /**
       * @param {string} url URL de l'image
       * @return {HTMLElement}
       */
      buildDOM(url) {
        const dom = document.createElement("section");
        dom.classList.add("lightbox");
        dom.innerHTML = `
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container"></div>
        <button class="lightbox__next">Suivant</button>`;
        dom
          .querySelector(".lightbox__container")
          .addEventListener("mouseover", this.keepFocusInLightbox.bind(this));
        dom
          .querySelector(".lightbox__close")
          .addEventListener("click", this.close.bind(this));
        dom
          .querySelector(".lightbox__next")
          .addEventListener("click", this.next.bind(this));
        dom
          .querySelector(".lightbox__prev")
          .addEventListener("click", this.prev.bind(this));
        return dom;
      }
    }
    Lightbox.init();
  }

  // Appel de la fonction à l'ouverture de la page
  createView(results);

  // Fonctions de filtre pour les médias
  function filteredByTitle() {
    results = results.sort(function compare(a, b) {
      if (a.image < b.image) return -1;
      if (a.image > b.image) return 1;
      return 0;
    });
    // Mise à jour de la vue de la liste des médias
    media.innerHTML = "";
    createView(results);
  }

  function filteredByPopularity() {
    results = results.sort(function compare(a, b) {
      if (a.likes > b.likes) return -1;
      if (a.likes < b.likes) return 1;
      return 0;
    });
    // Mise à jour de la vue de la liste des médias
    media.innerHTML = "";
    createView(results);
  }

  function filteredByDate() {
    results = results.sort(function compare(a, b) {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });
    // Mise à jour de la vue de la liste des médias
    media.innerHTML = "";
    createView(results);
  }

  // A MODIFIER
  function filteredByTag(category) {
    media.innerHTML = "";
    let newArray = [];
    // Parcourir chaque photographe dans le tableau de photographes
    for (let i = 0; i < results.length; i++) {
      // Parcourir chaque tag dans le tableau de tags de chaque photographe
      for (let j = 0; j < results[i].tags.length; j++) {
        // Si l'un des tags d'un photographe === category cliqué alors affichage du photographe
        if (results[i].tags[j] === category) {
          newArray.push(results[i]);
        }
      }
    }
    createView(newArray);
  }

  // Gestion de la liste déroulante pour les filtres sur les médias
  const SPACEBAR_KEY_CODE = [0, 32];
  const ENTER_KEY_CODE = 13;
  const DOWN_ARROW_KEY_CODE = 40;
  const UP_ARROW_KEY_CODE = 38;
  const ESCAPE_KEY_CODE = 27;

  const list = document.querySelector(".dropdown__list");
  const listContainer = document.querySelector(".dropdown__list-container");
  const dropdownArrow = document.querySelector(".dropdown__arrow");
  const listItems = document.querySelectorAll(".dropdown__list-item");
  const dropdownSelectedNode = document.querySelector("#dropdown__selected");
  const listItemIds = [];

  dropdownSelectedNode.addEventListener("click", (e) =>
    toggleListVisibility(e)
  );
  dropdownSelectedNode.addEventListener("keydown", (e) =>
    toggleListVisibility(e)
  );

  listItems.forEach((item) => listItemIds.push(item.id));

  listItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      setSelectedListItem(e);
      closeList();
    });
    item.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case ENTER_KEY_CODE:
          setSelectedListItem(e);
          closeList();
          return;
        case DOWN_ARROW_KEY_CODE:
          focusNextListItem(DOWN_ARROW_KEY_CODE);
          return;
        case UP_ARROW_KEY_CODE:
          focusNextListItem(UP_ARROW_KEY_CODE);
          return;
        case ESCAPE_KEY_CODE:
          closeList();
          return;
        default:
          return;
      }
    });
  });

  function setSelectedListItem(e) {
    let selectedTextToAppend = document.createTextNode(e.target.innerText);
    dropdownSelectedNode.innerHTML = null;
    dropdownSelectedNode.appendChild(selectedTextToAppend);
    let filter = dropdownSelectedNode.textContent;
    switch (filter) {
      case "Popularité":
        console.log("Filtre sélectionné : popularité");
        filteredByPopularity();
        break;
      case "Date":
        console.log("Filtre sélectionné : date");
        filteredByDate();
        break;
      case "Titre":
        console.log("Filtre sélectionné : titre");
        filteredByTitle();
        break;
    }
  }

  function closeList() {
    list.classList.remove("open");
    dropdownArrow.classList.remove("expanded");
    listContainer.setAttribute("aria-expanded", false);
  }

  function toggleListVisibility(e) {
    let openDropDown =
      SPACEBAR_KEY_CODE.includes(e.keyCode) || e.keyCode === ENTER_KEY_CODE;
    if (e.keyCode === ESCAPE_KEY_CODE) {
      closeList();
    }
    if (e.type === "click" || openDropDown) {
      list.classList.toggle("open");
      dropdownArrow.classList.toggle("expanded");
      listContainer.setAttribute(
        "aria-expanded",
        list.classList.contains("open")
      );
    }
    if (e.keyCode === DOWN_ARROW_KEY_CODE) {
      focusNextListItem(DOWN_ARROW_KEY_CODE);
    }
    if (e.keyCode === UP_ARROW_KEY_CODE) {
      focusNextListItem(UP_ARROW_KEY_CODE);
    }
  }

  function focusNextListItem(direction) {
    const activeElementId = document.activeElement.id;
    if (activeElementId === "dropdown__selected") {
      document.querySelector(`#${listItemIds[0]}`).focus();
    } else {
      const currentActiveElementIndex = listItemIds.indexOf(activeElementId);
      if (direction === DOWN_ARROW_KEY_CODE) {
        const currentActiveElementIsNotLastItem =
          currentActiveElementIndex < listItemIds.length - 1;
        if (currentActiveElementIsNotLastItem) {
          const nextListItemId = listItemIds[currentActiveElementIndex + 1];
          document.querySelector(`#${nextListItemId}`).focus();
        }
      } else if (direction === UP_ARROW_KEY_CODE) {
        const currentActiveElementIsNotFirstItem =
          currentActiveElementIndex > 0;
        if (currentActiveElementIsNotFirstItem) {
          const nextListItemId = listItemIds[currentActiveElementIndex - 1];
          document.querySelector(`#${nextListItemId}`).focus();
        }
      }
    }
  }

  function findValueOfFilter() {
    let type = document.querySelectorAll("article > span");
    for (let i = 0; i < type.length; i++) {
      type[i].setAttribute("tabindex", 0);
      type[i].addEventListener("keydown", (e) => {
        if (e.keyCode === ENTER_KEY_CODE) {
          let value = type[i].innerText;
          // Modification pour comparaison avec string dans le json
          let category = value.replace("#", "").toLowerCase();
          console.log(`Filtre sélectionné : ${category}`);
          filteredByTag(category);
        }
      });
      type[i].addEventListener("click", function () {
        let value = type[i].innerText;
        // Modification pour comparaison avec string dans le json
        let category = value.replace("#", "").toLowerCase();
        console.log(`Filtre sélectionné : ${category}`);
        filteredByTag(category);
      });
    }
  }
  findValueOfFilter();
}

photographerMedias();
