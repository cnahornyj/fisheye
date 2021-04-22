// Ouvrir index.html avec liveServer pour récupération de la data
let section = document.getElementById("list-photographers");

function getData(){
  fetch("photographers.json")
  .then(function(resp) {
  return resp.json();
  })
  .then(function(data) {
  console.log(data.photographers);
  let photographers = data.photographers;
  for(let i = 0; i < photographers.length; i++){
    console.log(photographers[i].name);
  }
  
  })
  .catch(error => {
    console.log(`${error} - L'objet n'a pas été trouvé.`)
  })
}

getData();

/*
async function allPhotographersList(){
  const photographers = await getPhotographers();
  console.log(photographers);
  let list = document.getElementById("list-photographers");
  photographers.forEach(photographer => {
        
    // Création des balises HTML
    let item = document.createElement("article");
    let link = document.createElement("a");
    let photo = document.createElement("img");
    let name = document.createElement("h2");
    let city = document.createElement("p");
    let country = document.createElement("p");
    let tagline = document.createElement("p");
    let price = document.createElement("p");
    // let tags = document.createElement("?"); 

    // Attribution des classes
    // Voir pour city + country
    photo.setAttribute("class","photographer");
    name.setAttribute("class","name");

    // Hiérarchisation des balises HTML
    item.appendChild(list);
    link.appendChild(item);
    photo.appendChild(link);
    name.appendChild(link);
    city.appendChild(item);
    country.appendChild(item);
    tagline.appendChild(item);
    price.appendChild(item);
    //tags.appendChild(item);

    // Remplissage du contenu texte des balises HTML
    // photo.src = "assets"+photographers.portrait
    name.textContent = photographer.photographers.name;
    
  });
}
*/

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

/*
async function allPhotographersList(){
    const photographers = await getPhotographers();

    let list = document.getElementById("list-photographers");

    photographers.forEach(photographer => {
        
        // Création des balises HTML
        let item = document.createElement("article");
        let link = document.createElement("a");
        let photo = document.createElement("img");
        let name = document.createElement("h2");
        let city = document.createElement("p");
        let country = document.createElement("p");
        let tagline = document.createElement("p");
        let price = document.createElement("p");
        // let tags = document.createElement("?"); 

        // Attribution des classes
        // Voir pour city + country
        photo.setAttribute("class","photographer");
        name.setAttribute("class","name");

        // Hiérarchisation des balises HTML
        item.appendChild(liste);
        link.appendChild(item);
        photo.appendChild(link);
        name.appendChild(link);
        city.appendChild(item);
        country.appendChild(item);
        tagline.appendChild(item);
        price.appendChild(item);
        //tags.appendChild(item);

        // Remplissage du contenu texte des balises HTML
        photo.src = "assets"+photographers.portrait
        

    });
}
*/