/**
 * removeFromBasket est la fonction qui permet de retirer un instrument du panier. 
 * Même principe que removeFavorite dans scripts/favoris.js.
 * @param {Object} instrument : L'instrument à retirer du panier.
 */
function removeFromBasket(instrument) {
    console.log('Entrée dans removeFromBasket : ')
    let currentBasket = JSON.parse(localStorage.getItem("basket"))
    if (!currentBasket || !currentBasket.some(elt => elt.ID === instrument.ID)) {
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
 * getBasket est la fonction qui permet d'avoir les instruments du panier dans le localstorage. 
 * Même principe que getFavorites dans scripts/favoris.js.
 * @returns : Les instruments stockées si il y en a, undefined sinon.
 */
function getBasket() {
    const currentBasket = JSON.parse(localStorage.getItem("basket"))
    // On vérifie si il y a des instruments dans le panier,
    if (!currentBasket || currentBasket.length === 0) {
        return undefined
    } else {
        return currentBasket
    }
}

/**
 * displayBasket est la fonction qui permet d'afficher les instruments dans le panier sur la page du panier.
 * Même principe que displayFavorites dans scripts/favoris.js.
 */
function displayBasket() {
    const div_panier = document.querySelector('.div_panier')
    if (!div_panier) return;
    div_panier.innerHTML = ""

    const inBasket = getBasket()

    if (!inBasket) {
        const mess_vide = document.createElement('div')
        mess_vide.className = "mess_vide"
        mess_vide.textContent = "Aucun élément dans votre panier pour le moment."
        div_panier.append(mess_vide)
        return
    }

    inBasket.forEach(product => {
        const div_prod = document.createElement('div')
        div_prod.className = "div_prod"
        div_prod.id = `${product.ID}`

        const div_img = document.createElement('div')
        div_img.className = "div_img"

        const img = document.createElement('img')
        img.src = product.Images[0]
        img.alt = product.Name
        div_img.appendChild(img)
        img.addEventListener("mouseenter", () => img.src = product.Images[1])
        img.addEventListener("mouseleave", () => img.src = product.Images[0])

        const div_carac = document.createElement('div')
        div_carac.className = "div_carac"

        const div_nom = document.createElement('div')
        const nom = document.createElement('h3')
        nom.textContent = `${product.Name}`

        const prix = document.createElement('div')
        prix.textContent = `${product.Prix} €`

        const btn = document.createElement('button')
        btn.className = "btn"
        btn.type = "button"
        const lien = document.createElement('a')
        lien.title = `Voir plus d'informations sur ${product.Name}`
        lien.href = `http://localhost:8000/getDetailsProduct/:${product.ID}`
        lien.textContent = `Voir`
        const btn_supp = document.createElement('button')
        btn_supp.className = "btn"
        btn_supp.type = "button"
        btn_supp.textContent = "Supprimer"

        btn_supp.addEventListener("click", () => {
            removeFromBasket(product)
            displayBasket()         
        })

        div_panier.append(div_prod)
        div_prod.append(div_img, div_carac)
        
        div_carac.append(div_nom, prix, btn, btn_supp);
        div_nom.append(nom)
    })
}
