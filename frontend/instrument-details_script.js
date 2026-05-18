// On récupère l'id de l'instrument qui est dans l'url, et on le parse en entier.
const idUrl = document.location.pathname
const id = parseInt(idUrl.slice(1))

/**
 * getInstrumentById est la fonction qui permet d'obtenir un instrument en fonction de son id en faisant une requête à l'API (localhost:3000).
 * Même principe que getAllInstruments dans script.js.
 * @returns : L'instrument ayant l'id dans l'url.
 */
async function getInstrumentById() {
    try {
        const response = await fetch(`http://localhost:3000/getProductById/${id}`)
        if (!response.ok) throw new Error(`Error in getInstrumentById : ${response.status}`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

/**
 * displayInstrument est la fonction qui affiche les détails d'un instrument dans la page html.
 */
async function displayInstrument() {
    // On récupère l'instrument,
    const data = await getInstrumentById() 
    const instrument = data.product

    // On récupère tous les placeholders de la page html pour y insérer les bonnes valeurs,
    let principalImage = document.querySelector('.instrument-image')
    let namePlaceholder = document.querySelector('.name-placeholder')
    let categoryPlaceholder = document.querySelector('.category-placeholder')
    let descPlaceholder = document.querySelector('.desc-placeholder')
    let imagesContainer = document.querySelector('.images-container')
    let pricePlaceholder = document.querySelector('.price-placeholder')
    let quantityPlaceholder = document.querySelector('.quantity-placeholder')

    // Et on effectue les changements.
    principalImage.src = instrument.Images[0]
    namePlaceholder.innerHTML = instrument.Name 
    categoryPlaceholder.innerHTML = instrument.Categorie
    descPlaceholder.innerHTML = instrument.Description
    imagesContainer.innerHTML = ''
    pricePlaceholder.innerHTML = `${instrument.Prix} ${instrument.Devise}`
    quantityPlaceholder.innerHTML = `${instrument.Quantity} restant(e)s`

    // On fait une boucle pour afficher les différentes images du produit.
    for (let i = 0; i < instrument.Images.length; i++) {
        imagesContainer.innerHTML += `<img class='instrument-images-other' src='${instrument.Images[i]}'>`
    }

    // On récupère aussi le container du symbole des favoris,
    let favoriteContainer = document.querySelector('.favorite-container')
    const currentFavorites = JSON.parse(localStorage.getItem("favorites"))
    let favorite = false
    for (let i = 0; i < currentFavorites.length; i++) {
        if (currentFavorites[i].ID === instrument.ID) {
            favorite = true
        }
    }

    if (favorite) {
        favoriteContainer.innerHTML = `
            <svg viewBox="0 0 20 20" class="shrink-1 active" onclick='toggleFavorite(${instrument})'>
                <path fill="currentColor" d="M10.02 18.25c-.377 0-.743-.161-1.003-.441l-6.68-7.154C1.396 9.647.877 8.255.912 6.839c.036-1.42.625-2.78 1.616-3.733.9-.87 2.08-1.32 3.349-1.296 1.352.035 2.677.644 3.635 1.67l.509.545.676-.724c.954-1.022 2.253-1.596 3.638-1.548 1.355.039 2.649.678 3.55 1.752 1.727 2.053 1.573 5.273-.348 7.33l-6.513 6.975c-.261.28-.627.44-1.004.44Z"></path>
            </svg>
            <p>Sauvegarder dans les favoris</p>
        `
    } else {
        favoriteContainer.innerHTML = `
            <svg viewBox="0 0 20 20" class="shrink-1" onclick="toggleFavorite(${instrument})">
                <path fill="currentcolor" d="M10.02 18.25c-.377 0-.743-.161-1.003-.441l-6.68-7.154C1.396 9.647.877 8.255.912 6.839c.036-1.42.625-2.78 1.616-3.733.9-.87 2.08-1.32 3.349-1.296 1.352.035 2.677.644 3.635 1.67l.509.545.676-.724c.954-1.022 2.253-1.596 3.638-1.548 1.355.039 2.649.678 3.55 1.752 1.727 2.053 1.573 5.273-.348 7.33l-6.513 6.975c-.261.28-.627.44-1.004.44ZM5.752 3.307c-.821 0-1.594.31-2.183.878-.71.682-1.131 1.663-1.157 2.69-.026 1.028.346 2.032 1.02 2.755l6.588 7.055 6.42-6.875c1.389-1.487 1.522-3.883.297-5.342-.627-.747-1.518-1.19-2.445-1.217a3.326 3.326 0 0 0-2.5 1.072l-1.224 1.31a.75.75 0 0 1-1.096 0L8.415 4.503c-.685-.734-1.625-1.17-2.578-1.194h-.085v-.001Z"></path>
            </svg>
            <p>Sauvegarder dans les favoris</p>
        `
    }
    document.querySelector('.shrink-1').addEventListener('click', toggleFavorite(instrument))


}


function toggleFavorite(instrument) {
    let currentFavorites = JSON.parse(localStorage.getItem("favorites"))
    let favorite = false
    for (let i = 0; i < currentFavorites.length; i++) {
        if (currentFavorites[i].ID === instrument.ID) {
            favorite = true
        }
    }

    if (favorite) {
        addFavorite(instrument)
    } else {
        removeFavorite(instrument)
    }
    

}

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
window.addEventListener('load', displayInstrument)