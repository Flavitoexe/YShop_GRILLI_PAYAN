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

    for (let i = 0; i < instrument.Images.length; i++) {
        imagesContainer.innerHTML += `<img class='instrument-images-other' src='${instrument.Images[i]}'>`
    }
}

window.addEventListener('load', displayInstrument)