/**
 * addFavorite est la fonction qui permet d'ajouter un instrument dans sa liste de favoris en appuyant sur un bouton, grâce au localstorage. 
 * @param {Object} instrument : L'instrument à rajouter dans les favoris.
 */
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

/**
 * removeFavorite est la fonction qui permet de retirer un instrument de sa liste de favoris en appuyant sur un bouton.
 * @param {Object} instrument : L'instrument à retirer des favoris.
 */
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

/**
 * addToBasket est la fonction qui permet d'ajouter un instrument dans le panier. Même principe que pour addFavorite.
 * @param {Object} instrument : L'instrument à rajouter dans le panier.
 */
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

/**
 * removeFromBasket est la fonction qui permet de retirer un instrument du panier. Même principe que removeFavorite.
 * @param {Object} instrument : L'instrument à retirer du panier.
 */
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

/**
 * getFavorites est la fonction qui permet d'obtenir les instruments favoris dans le localstorage.
 * @returns : Les instruments stockés si ils existent, undefined sinon.
 */
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

/**
 * getBasket est la fonction qui permet d'avoir les instruments du panier dans le localstorage. Même principe que getFavorites.
 * @returns : Les instruments stockées si il y en a, undefined sinon.
 */
function getBasket() {
    const currentBasket = JSON.parse(localStorage.getItem("basket"))
    // On vérifie si il y a des instruments dans le panier,
    if (currentBasket.length === 0 || currentBasket === undefined) {
        return undefined
    } else {
        return currentBasket
    }
}

// On ajoute un eventListener pour que quand une recherche se fait, la page ne se recharge pas automatiquement.
document.querySelector('.search-bar').addEventListener('submit', (event) => {
    event.preventDefault()
    getSearchQuery()
})

/**
 * getSearchQuery est la fonction qui permet d'obtenir les résultats d'une recherche effectuée avec la barre de recherche.
 * @returns 
 */
async function getSearchQuery() {
    console.log('Entrée dans getSearchQuery : ')
    // On récupère la valeur de la recherche.
    const query = document.getElementById('search-query').value.toLowerCase()

    if (query.length < 1) return

    const data = await getAllInstruments()
    const instruments = data.productsList
    // console.log(instruments)
    const filteredArr = instruments.filter( elt => 
        elt.Name.toLowerCase().includes(query) ||
        elt.Category.toLowerCase().includes(query)
    )

    return filteredArr
}

async function getAllInstruments() {

    try {
        const response = await fetch("http://localhost:3000/getAllProducts")
        if (!response.ok) throw new Error(`Error in getAllInstruments : ${response.status}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
    
}