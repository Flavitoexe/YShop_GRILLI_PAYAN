const urlAPI = "http://localhost:3000/"

// addFavorite est la fonction qui permet d'ajouter un instrument dans sa liste de favoris en appuyant sur un bouton, grâce au localstorage. 
function addFavorite(instrument) {
    console.log('Entrée dans addFavorite : ')

    // On transforme le tableau du localstorage en un tableau JSON pour pouvoir le manipuler en JavaScript.
    let currentFavorites = JSON.parse(localStorage.getItem("favorites"))

    // On vérifie si il y a quelque chose dans le tableau
    if (currentFavorites) {
        // Si il y a quelque chose, on met le nouvel instrument dans le tableau,
        currentFavorites.push(instrument)
        // Puis on le reconvertit en string pour pouvoir le mettre dans le localstorage.
        localStorage.setItem("favorites", JSON.stringify(currentFavorites))
    } else {
        // Si il y a rien, on initialise le tableau en y ajoutant l'instrument,
        currentFavorites = []
        currentFavorites.push(instrument)
        // Puis on le met dans le localstorage
        localStorage.setItem("favorites", JSON.stringify(currentFavorites))
    }

}

// removeFavorite est la fonction qui permet de retirer un instrument de sa liste de favoris en appuyant sur un bouton.
function removeFavorite(instrument) {
    console.log('Entrée dans removeFavorite : ')
    let currentFavorites = JSON.parse(localStorage.getItem("favorites"))
    // On vérifie si l'instrument est bien dans les favoris, et on sort de la fonction sinon.
    if (!currentFavorites.includes(instrument)) {
        console.error('Erreur : Instrument pas dans les favoris')
        return
    }

    if (currentFavorites.length > 0) {
        // On enlève l'instrument du tableau.
        currentFavorites.splice(currentFavorites.indexOf(instrument), 1)
        localStorage.setItem("favorites", JSON.stringify(currentFavorites))
    } else if (currentFavorites.length === 0) {
        alert('Pas de favoris')
    }
}

// addToBasket est la fonction qui permet d'ajouter un instrument dans le panier. Même principe que pour addFavorite.
function addToBasket(instrument) {
    console.log('Entrée dans addToBasket : ')
    let currentBasket = JSON.parse(localStorage.getItem("basket"))

    if (currentBasket) {
        currentBasket.push(instrument)
        localStorage.setItem("basket", JSON.stringify(currentBasket))
    } else {
        currentBasket = []
        currentBasket.push(instrument)
        localStorage.setItem("basket", JSON.stringify(currentBasket))
    }
}

// removeFromBasket est la fonction qui permet de retirer un instrument du panier. Même principe que removeFavorite.
function removeFromBasket(instrument) {
    console.log('Entrée dans removeFromBasket : ')
    let currentBasket = JSON.parse(localStorage.getItem("basket"))
    if (!currentBasket.includes(instrument)) {
        console.error('Erreur : Instrument pas dans le panier')
        return
    }

    if (currentBasket.length > 0) {
        currentBasket.splice(currentBasket.indexOf(instrument), 1)
        localStorage.setItem("basket", JSON.stringify(currentBasket))
    } else {
        alert('Rien dans le panier à supprimer')
    }
}

// getFavorites est la fonction qui permet d'avoir les instruments favoris dans le localstorage.
function getFavorites() {
    // On récupère les instruments favoris dans le localstorage.
    const currentFavorites = JSON.parse(localStorage.getItem("favorites"))
    // On vérifie si il y a des favoris,
    if (currentFavorites.length === 0 || currentFavorites === undefined) {
        // Si il n'y en a pas, on renvoie undefined pour faire des vérifications ailleurs,
        return undefined
    } else {
        // Si il y en a, on renvoie les favoris.
        return currentFavorites
    }
}

// getBasket est la fonction qui permet d'avoir les instruments du panier dans le localstorage. Même principe que getFavorites.
function getBasket() {
    const currentBasket = JSON.parse(localStorage.getItem("basket"))
    // On vérifie si il y a des instruments dans le panier,
    if (currentBasket.length === 0 || currentBasket === undefined) {
        return undefined
    } else {
        return currentBasket
    }
}

function getAllProducts() {
    fetch(urlAPI + "getAllProducts")
        .then(response => response.json())
        .then(data => {
            console.log(data.productsList)
            displayProduct(data.productsList)
        })
        .catch(error => console.error('Error fetching data : ', error))
}

function displayProduct(products) {
    const div_cat = document.querySelector('.div_cat')
    div_cat.innerHTML = ""

    products.forEach(product => {
        const div_prod = document.createElement('div')
        div_prod.className = "div_prod"

        const div_img = document.createElement('div')
        div_img.className = "div_img"

        const img = document.createElement('img')
        img.src = product.Images[0]
        img.alt = product.Name
        div_img.appendChild(img)
        img.addEventListener("mouseenter", () => {
            img.src = product.Images[1]
            
        });

        img.addEventListener("mouseleave", () => {
            img.src = product.Images[0] 
        });

        const div_carac = document.createElement('div')
        div_carac.className = "div_carac"
        const div_nom = document.createElement('div')
        const nom = document.createElement('h3')
        nom.textContent = `${product.Name}`
        const prix = document.createElement('div')
        prix.textContent = `${product.Prix} €`
        const btn = document.createElement('button')
        btn.textContent = `Voir`
        btn.className = "btn"

        div_cat.append(div_prod)
        div_prod.append(div_img, div_carac)
        div_carac.append(div_nom, prix, btn)
        div_nom.append(nom)
    });
}

