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
  //console.log(data.photographers);
  let html = '';
  data.photographers.forEach(photographer => {
      let htmlSegment = 
      `
      <article>
      <a href="">
          <img src="assets/Sample Photos/Photographers ID Photos/${photographer.portrait}" class="photographer">
          <h2>${photographer.name}</h2>
      </a>
      <p>${photographer.city}, ${photographer.country}</p>
      <p class="citation">${photographer.tagline}</p>
      <p class="priceperday">${photographer.price}€/jour</p>
      <span>${photographer.tags}</span>
      </article>`;

      html += htmlSegment;
  });
  list.innerHTML = html;
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
