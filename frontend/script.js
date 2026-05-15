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
 * @returns : Les instruments recherchés.
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

/**
 * getAllInstrument est la fonction qui fait une requête au backend pour avoir tous les insrtuments.
 * @returns : Tous les instruments dans le fichier backend/data.json.
 */
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

/**
 * getFiveRandomInstruments est une fonction qui permet d'obtenir 5 instruments aléatoirement. Elle servira surtout pour faire le carousel des nouveautés.
 * @returns : 5 instruments.
 */
async function getFiveRandomInstruments() {

    // On récupère tous les instruments et on initialise le tableau qui contiendra les 5 instruments.
    const data = await getAllInstruments()
    let randoms = []

    // On fait une boucle qui génère aléatoirement à chaque tour un nombre compris entre 0 et l'ID du dernier produit (Au moment de l'écriture, 45).
    for (let i = 0; i < 5; i++) {
        // On génère aléatoirement un nombre compris entre 0 et l'ID du dernier produit (Actuellement, 45),
        let randomId = Math.floor(Math.random() * data.productsList.length)
        // Et on ajoute le produit dans le tableau des randoms.
        randoms.push(data.productsList[randomId])
    }

    return randoms
}

// On récupère l'élément inner-carousel dans une variable globale pour l'utiliser dans les fonctions concernant le carousel.
let innerCarousel = document.querySelector('.inner-carousel')

/**
 * carousel est une fonction qui permet l'initialisation du carousel des nouveautés.
 */
async function carousel() {

    // On appelle getFiveRandomInstruments pour obtenir les instruments,
    const data = await getFiveRandomInstruments()

    // On fait une boucle qui va créer les 5 slides comportant les nouveautés,
    for (let i = 0; i < 5; i++) {
        // Création de l'élément,
        let slide = document.createElement('div')
        // Attribution de la classe,
        slide.classList.add('slide')
        // Remplissage de la slide,
        slide.innerHTML = `
            <div class="left-slide">
                <img class="product-img" src="../${data[i].Images[0]}">
            </div>
            <div class="right-slide">
                <h1><a href='localhost:8000/test'>${data[i].Name}</a></h1>
                <p>${data[i].Prix} ${data[i].Devise}</p>
            </div>
        `
        // Et enfin, ajout de la slide dans l'élément inner-carousel.
        innerCarousel.appendChild(slide)
    }

}
// On met une event listener pour qu'à chaque fois que l'utilisateur recharge la page, la fonction carousel se lance.
window.addEventListener('load', () => {
    carousel()
    generateDots()
})

// On initialise la variable globale qui contiendra l'index de la slide actuelle.
let currentSlide = 0

/**
 * updateCarousel est une fonction qui ajuste la position des slides en fonction de la slide actuelle.
 */
function updateCarousel() {
    // On récupère une slide et on vérifie si il y en a une, sinon on quitte la fonction,
    const slide = document.querySelector('.slide')
    if (!slide) return

    // On récupère les données CSS finales de l'élément inner-carousel avec getComputedStyle,
    const style = window.getComputedStyle(innerCarousel)
    // On récupère la taille finale du gap,
    const gap = parseFloat(style.gap) 
    // Et on récupère la taille réelle d'une slide en pixels avec offsetWidth.
    const slideWidth = slide.offsetWidth

    // Avec tous les éléments récupérés, on peut calculer le offset qui servira à faire glisser les slides dans le carousel.
    let offset = -currentSlide * (slideWidth + gap)
    
    // Enfin, on applique le offset dans un translateX pour faire glisser la slide.
    innerCarousel.style.transform = `translateX(${offset}px)`

    generateDots()
}

/**
 * nextSlide est une fonction qui calcule l'index de la prochaine slide.
 */
function nextSlide() {
    currentSlide = (currentSlide + 1) % 5
    // On appelle updateCarousel pour appliquer les changements directement.
    updateCarousel()
}

// On met un interval pour automatiser le carousel, qui passera à la slide suivante toutes les 5 secondes.
let carouselTimer = setInterval(nextSlide, 5000)

/**
 * prevSlide est une fonction qui calcule l'index de la slide précédente. Même principe que poour nextSlide.
 */
function prevSlide() {
    currentSlide = (currentSlide - 1 + 5) % 5
    updateCarousel()
}

// On récupère la div qui contiendra les dots de navigation du carousel.
let carouselDots = document.querySelector('.carousel-dots')

/**
 * generateDots est une fonction qui permet la création des dots de navigation pour le carousel.
 */
function generateDots() {
    console.log('Entrée dans generateDots : ')
    console.log('currentSlide : ', currentSlide)
    // On vide le contenu des dots,
    carouselDots.innerHTML = ''
    // Ensuite, on boucle pour les recréer en vérifiant quel dot est active par rapport à sa slide,
    for (let i = 0; i < 5; i++) {
        if (i === currentSlide) {
            console.log('cond ok')
            // On crée le dot avec la classe active,
            carouselDots.innerHTML += `<div class="dot active" onclick="goToSlide(${i})"></div>`
        } else {
            // On crée un dot simple.
            carouselDots.innerHTML += `<div class="dot" onclick="goToSlide(${i})"></div>`
        }
    }
}

/**
 * goToSlide est une fonction complémentaire de generateDots qui permet d'aller sur une slide en cliquant sur le dot lui correspondant.
 * @param {int} index 
 */
function goToSlide(index) {
    // On attribue à currentSlide l'index de la slide qur laquelle on veut aller,
    currentSlide = index
    // Puis on met à jour le carousel.
    updateCarousel()
    clearInterval(carouselTimer)
    carouselTimer = setInterval(nextSlide, 5000)
}