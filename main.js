const json = "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json";
let idPhotographer = "";

function getPhotographers(){
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            resolve(JSON.parse(this.responseText));
            console.log("Administration : connection ok");
            // Supprimer le message d'erreur si l'appel est réussi
            error = document.getElementById("error");
            // Supprimer le message d'erreur s'il existe
            if (error) {
              error.remove();
            }
          } else {
            console.log("Administration : ERROR connection API");
          }
        };
        request.open("GET", json);
        request.send();
      });    
}

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