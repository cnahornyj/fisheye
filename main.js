// Ouvrir index.html avec liveServer pour récupération de la data
// Fonction pour récupérer la data dans le fichier json
async function getPhotographers() {
  let url = 'photographers.json';
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
  let html = '';
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
      tag.innerText = photographer.tags[i];
      item.appendChild(tag);
    }

    photo.src = "assets/Sample Photos/Photographers ID Photos/" + photographer.portrait;
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