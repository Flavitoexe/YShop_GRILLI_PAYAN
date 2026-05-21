// -------------------- //
// SECTION REQUETES API //
// -------------------- //

const urlAPI = "http://localhost:3000/"

/**
 * getAllInstrument est la fonction qui fait une requête au backend pour avoir tous les instruments.
 * @returns : Tous les instruments dans le fichier backend/data.json.
 */
async function getAllInstruments() {
    try {
        // On fait une requête fetch à l'API,
        const response = await fetch(`${urlAPI}getAllProducts`)
        // On vérifie qu'il y ait bien une réponse, sjnon on renvoie une erreur,
        if (!response.ok) throw new Error(`Error in getAllInstruments : ${response.status}`)
        // On parse l'objet de la répons en un objet JS, 
        const data = await response.json()
        // Et on renvoie les données.
        return data
    } catch (error) {
        console.error(error)
    }
}

/**
 * getFiveRandomInstruments est une fonction qui permet d'obtenir 5 instruments aléatoirement. Elle servira surtout 
 * pour faire le carousel des nouveautés.
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

// -------------------- //


// ------------------------------------ //
// SECTION FAVORIS, PANIER ET RECHERCHE //
// ------------------------------------ //

/**
 * addFavorite est la fonction qui permet d'ajouter un instrument dans sa liste de favoris en appuyant sur un bouton, 
 * grâce au localstorage. 
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
 * addToBasket est la fonction qui permet d'ajouter un instrument dans le panier. 
 * Même principe que pour addFavorite.
 * @param {Object} instrument : L'instrument à rajouter dans le panier.
 */
function addToBasket(instrument) {
    console.log('Entrée dans addToBasket : ')
    console.log(instrument)
    let currentBasket = JSON.parse(localStorage.getItem("basket"))

    if (currentBasket) {
        currentBasket.push(instrument)
        localStorage.setItem("basket", JSON.stringify(currentBasket))
    } else {
        currentBasket = []
        currentBasket.push(instrument)
        localStorage.setItem("basket", JSON.stringify(currentBasket))
    }

    instrument.quantityInBasket = 1
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


// ------------------------------------ //


// ---------------- //
// SECTION CAROUSEL //
// ---------------- //

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
                <h1 class="slide-title"><a href='http://localhost:8000/${data[i].ID}'>${data[i].Name}</a></h1>
                <p>${data[i].Prix} ${data[i].Devise}</p>
            </div>
        `

        // Et enfin, ajout de la slide dans l'élément inner-carousel.
        if (innerCarousel) innerCarousel.appendChild(slide)
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
    if (!slide || !innerCarousel) return

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

    // On appelle generateDots pour générer les dots de navigation à jour et correctement.
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
    if (!carouselDots) return
    // On vide le contenu des dots,
    carouselDots.innerHTML = ''
    // Ensuite, on boucle pour les recréer en vérifiant quel dot est active par rapport à sa slide,
    for (let i = 0; i < 5; i++) {
        if (i === currentSlide) {
            // On crée le dot avec la classe active,
            carouselDots.innerHTML += `<div class="dot active" onclick="goToSlide(${i})"></div>`
        } else {
            // On crée un dot simple.
            carouselDots.innerHTML += `<div class="dot" onclick="goToSlide(${i})"></div>`
        }
    }
}

/**
 * goToSlide est une fonction complémentaire de generateDots qui permet d'aller sur une slide en cliquant sur le dot 
 * lui correspondant.
 * @param {int} index 
 */
function goToSlide(index) {
    // On attribue à currentSlide l'index de la slide qur laquelle on veut aller,
    currentSlide = index
    // On met à jour le carousel.
    updateCarousel()
    // Et on réinitialise le timer pour que quand on appuie sur un dot, on reste 5s sur l'instrument avant de passer au suivant.
    // Si on ne faisait pas ca, en appuyant sur un dot on resterait 5s - le temps passé sur la slide d'avant, ce qui résultait
    // en des slides qui pouvait durer 3s, 1s, voire 0.1s.
    clearInterval(carouselTimer)
    carouselTimer = setInterval(nextSlide, 5000)
}

// ---------------- //

document.querySelector('#category-strings').addEventListener('click', () => document.location.href = 'http://localhost:8000/cordes')
document.querySelector('#category-brasses').addEventListener('click', () => document.location.href = 'http://localhost:8000/vent')
document.querySelector('#category-percussions').addEventListener('click', () => document.location.href = 'http://localhost:8000/percussions')