/**
 * updateBasket est une fonction qui fait une requête PUT à l'API pour modifier les stocks.
 * @param {Object} instrument 
 * @returns Un code de status ainsi que l'instrument modifié.
 */
async function updateBasket(instrument) {
    // On initialise un objet avec notre nouvelle quantité de stocks,
    const newVariables = {
        Quantity: instrument.Quantity - instrument.quantityInBasket
    }

    // On fait la requête à l'API,
    try {
        // On envoie une requête PUT avec nos nouvelles valeurs dans le body,
        const response = await fetch(`http://localhost:3000/updateProduct/${instrument.ID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVariables)
        })

        // On vérifie le statut de la réponse,
        if (response.ok) {
            // Si le statut de la réponse est ok, càd que tout s'est bien passé,
            // On transforme la réponse en objet Javascript,
            const data = await response.json()
            // On réaffiche le panier, sans les instruments achetés,
            displayBasket()
            // Et on renvoie la réponse.
            return data
        } else {
            // Sinon on envoie une erreur.
            throw new Error(`Error : updateProduct. Response status : ${response.status}`)
        }

    } catch (error) {
        console.error(error)
        return
    }
}

/**
 * getBasket est la fonction qui permet d'avoir les instruments du panier dans le localstorage. 
 * Même principe que getFavorites dans scripts/favoris.js.
 * @returns : Les instruments stockées si il y en a, undefined sinon.
 */
function getBasket() {
    // On récupère le panier dans le localStorage,
    const currentBasket = JSON.parse(localStorage.getItem("basket"))
    // On vérifie si il y a des instruments dans le panier,
    if (!currentBasket || currentBasket.length === 0) {
        // Si non, on retourne undefined pour faire des vérifications, 
        return undefined
    } else {
        // Si oui on renvoie la panier.
        return currentBasket
    }
}

/**
 * removeFromBasket est la fonction qui permet de retirer un instrument du panier. 
 * Même principe que removeFavorite dans scripts/favoris.js.
 * @param {Object} instrument : L'instrument à retirer du panier.
 */
function removeFromBasket(instrument) {
    // On récupère le panier,
    let currentBasket = getBasket()
    // On vérifie si il y a quelque chose dedans et si l'instrument y est,
    if (!currentBasket || !currentBasket.some(elt => elt.ID === instrument.ID)) {
        // Si non, on affiche une erreur dans la console et on quitte la fonction.
        console.error('Erreur : Instrument pas dans le panier')
        return
    }

    // On vérifie si il y a quelque chose dans le panier,
    if (currentBasket.length > 0) {
        // Si oui, alors on supprime l'instrument dans le tableau,
        currentBasket.splice(currentBasket.findIndex( elt => elt.ID === instrument.ID), 1)
        // Puis on le réécrit dans le localStorage.
        localStorage.setItem("basket", JSON.stringify(currentBasket))
    } else {
        // Si non, on alerte l'utilisateur.
        alert('Rien dans le panier à supprimer')
    }
}

/**
 * displayBasket est la fonction qui permet d'afficher les instruments dans le panier sur la page du panier.
 * Même principe que displayFavorites dans scripts/favoris.js.
 */
function displayBasket() {
    // On récupère le container du panier,
    const div_panier = document.querySelector('.div_panier')
    // Si le container n'existe pas, alors on quitte la fonction,
    if (!div_panier) return;
    // Sinon, on le vide.
    div_panier.innerHTML = ""

    // On récupère le panier,
    const inBasket = getBasket()
    // On vérifie si le panier existe ou est vide,
    if (!inBasket || inBasket.length <= 0) {
        // Si oui, alors on crée une div qui affichera un message à l'utilisateur lui disant qu'il n'a rien dans le panier.
        const mess_vide = document.createElement('div')
        mess_vide.className = "mess_vide"
        mess_vide.textContent = "Aucun élément dans votre panier pour le moment."
        div_panier.append(mess_vide)
        return
    }

    // Sinon, on crée toutes les container nécessaires pour tout afficher,
    // En commençant par la div qui contiendra le total du panier, ainsi que le bouton pour acheter,
    const div_total = document.createElement('div')
    div_total.className = "div_total"
    const sous_total = document.createElement('div')
    sous_total.className = "sous_total"
    const mess_total = document.createElement('div')
    mess_total.textContent = "Total de votre panier :"
    mess_total.className = "mess_total"
    const prix_total = document.createElement('div')
    prix_total.textContent =`${getBasketPrice()} €  `
    prix_total.className = "prix_total"
    const div_btn_total = document.createElement('div')
    div_btn_total.className = "div_btn_total"
    const btn_total = document.createElement('button')
    btn_total.className = "btn_total"
    btn_total.textContent = "Acheter"
    
    // Ensuite, on crée l'élément qui contiendra la liste des instruments dans le panier,
    const div_ele = document.createElement('div')
    div_ele.className = "div_ele"
    // On boucle sur la panier pour crée un container spécifique à chaque instrument,
    inBasket.forEach(product => {
        // Assignation au container d'une classe générale pour le CSS, ainsi que d'un id 
        // représentant l'id de l'instrument affiché,
        const div_prod = document.createElement('div')
        div_prod.className = "div_prod"
        div_prod.id = `product${product.ID}`

        // Ajout de l'image
        const div_img = document.createElement('div')
        div_img.className = "div_img"
        const img = document.createElement('img')
        img.src = product.Images[0]
        img.alt = product.Name
        div_img.appendChild(img)

        // Création et assignation des emplacement des différentes informations de l'instrument,
        const div_carac_1 = document.createElement('div')
        div_carac_1.className = "div_carac_1"

        const div_carac_2 = document.createElement('div')
        div_carac_2.className = "div_carac_2"

        const sous_carac_1_1 = document.createElement('div')
        sous_carac_1_1.className = "sous_carac_1_1"

        const sous_carac_1_2 = document.createElement('div')
        sous_carac_1_2.className = "sous_carac_1_2"

        const sous_carac_2_1 = document.createElement('div')
        sous_carac_2_1.className = "sous_carac_2_1"

        const sous_carac_2_2 = document.createElement('div')
        sous_carac_2_2.className = "sous_carac_2_2"

        const div_nom = document.createElement('div')
        const nom = document.createElement('h3')
        nom.textContent = `${product.Name}`

        const prix = document.createElement('div')
        prix.className = "prix"
        prix.textContent = `${product.Prix} €`

        // Création des boutons pour voir les détails de l'instrument, le supprimer,
        // l'ajouter en favori ou pour ajouter/réduire la quantité dans le panier,
        const btn = document.createElement('button')
        btn.className = "btn"
        btn.type = "button"
        const lien = document.createElement('a')
        lien.title = `Voir plus d'informations sur ${product.Name}`
        lien.href = `http://localhost:8000/${product.ID}`
        lien.textContent = `Voir`

        const div_supp = document.createElement('div')
        div_supp.className = "div_supp"
        const btn_supp = document.createElement('button')
        btn_supp.className = "btn_supp"
        btn_supp.type = "button"
        btn_supp.textContent = "✖"
        btn_supp.title = `Supprimer ${product.Name} du panier`

        const favoriteContainer = document.createElement('div')
        favoriteContainer.className = 'favorite-container'
        favoriteContainer.id = `fav${product.ID}`

        // Ajout de l'eventListener pour supprimer un élément du panier,
        btn_supp.addEventListener("click", () => {
            removeFromBasket(product)
            // Après la suppression, on réaffiche le panier pour que la modification 
            // soit directe.
            displayBasket()
        })

        const div_quant = document.createElement('div')
        div_quant.className = "div_quant"

        const btn_moins = document.createElement('button')
        btn_moins.className = "btn_moins"
        btn_moins.id =`rm${product.ID}`
        btn_moins.textContent = product.quantityInBasket > 1 ? "-" : "🗑️"

        const btn_chiffre = document.createElement('span')
        btn_chiffre.className = "btn_chiffre"
        btn_chiffre.id = `curr${product.ID}`
        btn_chiffre.textContent = product.quantityInBasket

        const btn_plus = document.createElement('button')
        btn_plus.className = "btn_plus"
        btn_plus.id = `add${product.ID}`
        btn_plus.textContent = "+"

        // On ajoute les éléments à leur élément parent pour afficher le tout.
        div_panier.append(div_ele, div_total)
        div_total.append(sous_total)
        sous_total.append(mess_total, prix_total, div_btn_total)
        div_btn_total.append(btn_total)
        div_ele.append(div_prod)
        div_prod.append(div_img, div_carac_1, div_carac_2)

        div_carac_1.append(sous_carac_1_1, sous_carac_1_2)
        sous_carac_1_1.append(div_nom, btn)
        sous_carac_1_2.append(div_supp)
        sous_carac_1_2.append(favoriteContainer)

        div_supp.append(btn_supp)
        div_carac_2.append(sous_carac_2_1, sous_carac_2_2)
        sous_carac_2_1.append(prix)
        sous_carac_2_2.append(div_quant)
        div_quant.append(btn_moins, btn_chiffre, btn_plus)

        div_nom.append(nom)
        btn.append(lien)

        // Pour l'affichage du favori,
        // On récupère les favoris pour pouvoir faire les vérifications,
        const currentFavorites = getFavorites()
        // Si il n'y a pas de favoris, ou que l'instrument n'y figure pas, on affiche le coeur vide,
        if (!currentFavorites || !currentFavorites.some( elt => product.ID === elt.ID)) {
            document.querySelector(`#fav${product.ID}`).innerHTML = `
                <svg viewBox="0 0 20 20" class="shrink-1 out-favorite">
                    <path fill="currentcolor" d="M10.02 18.25c-.377 0-.743-.161-1.003-.441l-6.68-7.154C1.396 9.647.877 8.255.912 6.839c.036-1.42.625-2.78 1.616-3.733.9-.87 2.08-1.32 3.349-1.296 1.352.035 2.677.644 3.635 1.67l.509.545.676-.724c.954-1.022 2.253-1.596 3.638-1.548 1.355.039 2.649.678 3.55 1.752 1.727 2.053 1.573 5.273-.348 7.33l-6.513 6.975c-.261.28-.627.44-1.004.44ZM5.752 3.307c-.821 0-1.594.31-2.183.878-.71.682-1.131 1.663-1.157 2.69-.026 1.028.346 2.032 1.02 2.755l6.588 7.055 6.42-6.875c1.389-1.487 1.522-3.883.297-5.342-.627-.747-1.518-1.19-2.445-1.217a3.326 3.326 0 0 0-2.5 1.072l-1.224 1.31a.75.75 0 0 1-1.096 0L8.415 4.503c-.685-.734-1.625-1.17-2.578-1.194h-.085v-.001Z"></path>
                </svg>
            `
        // Si il y est, on affiche le coeur rouge.
        } else {
            document.querySelector(`#fav${product.ID}`).innerHTML = `
                <svg viewBox="0 0 20 20" class="shrink-1 in-favorite">
                    <path fill="currentColor" d="M10.02 18.25c-.377 0-.743-.161-1.003-.441l-6.68-7.154C1.396 9.647.877 8.255.912 6.839c.036-1.42.625-2.78 1.616-3.733.9-.87 2.08-1.32 3.349-1.296 1.352.035 2.677.644 3.635 1.67l.509.545.676-.724c.954-1.022 2.253-1.596 3.638-1.548 1.355.039 2.649.678 3.55 1.752 1.727 2.053 1.573 5.273-.348 7.33l-6.513 6.975c-.261.28-.627.44-1.004.44Z"></path>
                </svg>
            `
        }

        // On met un eventListener pour faire basculer le favori en fonction de son état actuel,
        document.querySelector(`#fav${product.ID}`).addEventListener('click', () => toggleFavorite(product))
        // Ainsi que des eventListeners pour ajouter/réduire la quantité dans le panier.
        document.querySelector(`#rm${product.ID}`).addEventListener('click', () => removeOneFromBasket(product))
        document.querySelector(`#add${product.ID}`).addEventListener('click', () => addOneToBasket(product))
    })
    // On ajoute un eventListener sur le bouton 'Acheter' pour qu'au clic, la fonction buyBasket soit appelée.
    document.querySelector('.btn_total').addEventListener('click', () => buyBasket())
}

/**
 * buyBasket est une fonction qui permet d'acheter des instruments, gérant en même temps leur stock.
 */
function buyBasket() {
    // On récupère le panier,
    const currentBasket = getBasket()

    // On boucle sur la panier,
    for (let i = 0; i < currentBasket.length; i++) {
        // On appelle updateBasket en passant l'instrument à l'index i en paramètre,
        updateBasket(currentBasket[i])
    }
    // On vide le localStorage,
    localStorage.setItem('basket', JSON.stringify([]))
    // Et on affiche à l'utilisateur que l'achat s'est bien passé.
    alert('Achat effectué !')
}

/**
 * removeOneFromBasket est une fonction qui permet d'enlever une unité d'un instrument dans le panier.
 * @param {Object} instrument 
 */
function removeOneFromBasket(instrument) {
    // On récupère le panier,
    let currentBasket = getBasket()
    // On vérifie si il existe et si l'instrument y est, sinon on arrête la fonction.
    if (!currentBasket || !currentBasket.some(elt => elt.ID === instrument.ID)) {
        console.error('Erreur : Instrument pas dans le panier')
        return
    }

    // Si il y a quelque chose,
    if (currentBasket.length > 0) {
        // On cherche l'instrument,
        let product = currentBasket.find( elt => elt.ID === instrument.ID)
        // On retire une unité du panier,
        product.quantityInBasket--
        // On vérifie si la quantité est nulle,
        if (product.quantityInBasket <= 0) {
            // Si oui, alors on enlève la div contenant l'instrument,
            document.querySelector(`#product${instrument.ID}`).remove()
            // On l'enlève du panier dans le localstorage,
            removeFromBasket(instrument)
            // Et on actualise le panier.
            displayBasket()
            return
        }
        // Sinon, on sauvegarde la nouvelle quantité dans le localstorage, 
        localStorage.setItem("basket", JSON.stringify(currentBasket))
        // Puis on réactualise la page.
        displayBasket()

    } else {
        alert('Rien dans le panier à supprimer')
    }
}

/**
 * addOneToBasket est une fonction qui permet d'ajouter une unité d'un instrument dans le panier.
 * Même principe que removeOneFromBasket, mais en ajoutant au lieu de soustraire.
 * @param {Object} instrument 
 */
function addOneToBasket(instrument) {
    // On récupère le panier,
    let currentBasket = getBasket()
    // On vérifie si il existe et si l'instrument y est, sinon on arrête la fonction.
    if (!currentBasket || !currentBasket.some(elt => elt.ID === instrument.ID)) {
        console.error('Erreur : Instrument pas dans le panier')
        return
    }

    // Si il y a quelque chose,
    if (currentBasket.length > 0) {
        // On cherche l'instrument,
        let product = currentBasket.find( elt => elt.ID === instrument.ID)
        
        // On vérifie si la quantité est supérieure au stock,
        if (product.quantityInBasket + 1 > instrument.Quantity) {
            // Si oui, on alerte l'utilisateur et on arrête la fonction pour empêcher l'ajout.
            alert('Limite de produits atteinte')
            return
        }
        // Sinon on ajoute une unité du panier,
        product.quantityInBasket++
        // On sauvegarde la nouvelle quantité dans le localstorage, 
        localStorage.setItem("basket", JSON.stringify(currentBasket))
        // Puis on réactualise la page.
        displayBasket()
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
    if (!currentFavorites || currentFavorites.length === 0) {
        // Si il n'y en a pas, on renvoie undefined pour faire des vérifications ailleurs,
        return undefined
    } else {
        // Si il y en a, on renvoie les favoris.
        return currentFavorites
    }
}

/**
 * toggleFavorite est une fonction qui vérifie si un instrument figure dans les favoris ou non, puis qui ajoute
 * ou retire cet instrument des favoris.
 * @param {Object} instrument 
 */
function toggleFavorite(instrument) {
    // On récupère les favoris,
    let currentFavorites = getFavorites()

    // Puis on vérifie si l'instrument figure ou pas dans les favoris, puis on l'ajoute/retire.
    if (!currentFavorites || !currentFavorites.some( elt => instrument.ID === elt.ID)) {
        // L'instrument n'est pas dans les favoris, donc si on clique sur le coeur, on l'ajoute,
        addFavorite(instrument)
    } else {
        // L'instrument est dans les favoris, donc si on clique sur le coeur, on le retire.
        removeFavorite(instrument)
    }
}

/**
 * addFavorite est la fonction qui permet d'ajouter un instrument dans sa liste de favoris en appuyant sur un bouton, grâce au localstorage. 
 * @param {Object} instrument : L'instrument à rajouter dans les favoris.
 */
function addFavorite(instrument) {
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

    // On récupère le container du coeur et du texte, puis on y ajoute le coeur rempli (car l'instrument 
    // a été ajouté aux favoris) ainsi que le texte,
    let favoriteContainer = document.querySelector(`#fav${instrument.ID}`)
    favoriteContainer.innerHTML = `
        <svg viewBox="0 0 20 20" class="shrink-1 in-favorite">
            <path fill="currentColor" d="M10.02 18.25c-.377 0-.743-.161-1.003-.441l-6.68-7.154C1.396 9.647.877 8.255.912 6.839c.036-1.42.625-2.78 1.616-3.733.9-.87 2.08-1.32 3.349-1.296 1.352.035 2.677.644 3.635 1.67l.509.545.676-.724c.954-1.022 2.253-1.596 3.638-1.548 1.355.039 2.649.678 3.55 1.752 1.727 2.053 1.573 5.273-.348 7.33l-6.513 6.975c-.261.28-.627.44-1.004.44Z"></path>
        </svg>
    `
}

/**
 * removeFavorite est la fonction qui permet de retirer un instrument de sa liste de favoris en appuyant sur un bouton.
 * Même principe que addFavorite, à l'envers.
 * @param {Object} instrument : L'instrument à retirer des favoris.
 */
function removeFavorite(instrument) {
    let currentFavorites = getFavorites()
    // On vérifie si l'instrument est bien dans les favoris, et on sort de la fonction sinon.
    if (!currentFavorites.some( elt => instrument.ID === elt.ID)) {
        console.error('Erreur : Instrument pas dans les favoris')
        return
    }

    if (currentFavorites.length > 0) {
        // On enlève l'instrument du tableau.
        currentFavorites.splice(currentFavorites.findIndex(elt => elt.ID === instrument.ID), 1)
        localStorage.setItem("favorites", JSON.stringify(currentFavorites))
    } else if (currentFavorites.length === 0) {
        alert('Pas de favoris')
    }

    // On récupère le container du coeur et du texte, puis on y ajoute le coeur vide (car l'instrument 
    // a été retiré des favoris) ainsi que le texte.
    let favoriteContainer = document.querySelector(`#fav${instrument.ID}`)
    favoriteContainer.innerHTML = `
        <svg viewBox="0 0 20 20" class="shrink-1 out-favorite">
            <path fill="currentcolor" d="M10.02 18.25c-.377 0-.743-.161-1.003-.441l-6.68-7.154C1.396 9.647.877 8.255.912 6.839c.036-1.42.625-2.78 1.616-3.733.9-.87 2.08-1.32 3.349-1.296 1.352.035 2.677.644 3.635 1.67l.509.545.676-.724c.954-1.022 2.253-1.596 3.638-1.548 1.355.039 2.649.678 3.55 1.752 1.727 2.053 1.573 5.273-.348 7.33l-6.513 6.975c-.261.28-.627.44-1.004.44ZM5.752 3.307c-.821 0-1.594.31-2.183.878-.71.682-1.131 1.663-1.157 2.69-.026 1.028.346 2.032 1.02 2.755l6.588 7.055 6.42-6.875c1.389-1.487 1.522-3.883.297-5.342-.627-.747-1.518-1.19-2.445-1.217a3.326 3.326 0 0 0-2.5 1.072l-1.224 1.31a.75.75 0 0 1-1.096 0L8.415 4.503c-.685-.734-1.625-1.17-2.578-1.194h-.085v-.001Z"></path>
        </svg>
    `
}

/**
 * getBasketPrice est une fonction qui permet d'obtenir le prix total du panier.
 * @returns Prix total de tous les instruments.
 */
function getBasketPrice() {
    // On récupère le panier,
    const currentBasket = getBasket()

    // Si il est vide, alors on arrête la fonction,
    if (!currentBasket || currentBasket.length <= 0) {
        return
    }

    // Sinon, on initialise la variable qui contiendra le prix total,
    let fullPrice = 0
    // On boucle sur chaque élément du panier, sur lesquels on multiplie le prix avec la quantité dans le panier,
    currentBasket.forEach( elt => fullPrice += elt.quantityInBasket * elt.Prix )
    // Et on retourne le tout.
    return fullPrice
}