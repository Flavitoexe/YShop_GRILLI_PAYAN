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
 * removeFavorite est la fonction qui permet de retirer un instrument de sa liste de favoris en appuyant sur un bouton.
 * @param {Object} instrument : L'instrument à retirer des favoris.
 */
function removeFavorite(instrument) {
    // On récupère les favoris,
    let currentFavorites = getFavorites()
    // On vérifie si l'instrument est bien dans les favoris, et on sort de la fonction sinon.
    if (!currentFavorites || !currentFavorites.some(elt => elt.ID === instrument.ID)) {
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
}

/**
 * displayFavorites() est la fonction qui permet d'afficher les instruments favoris sur la page des favoris.
 */
function displayFavorites() {
    // On récupère la div contenant les favoris, 
    const div_fav = document.querySelector('.div_fav')
    // On vérifie qu'elle existe bien, sinon on stoppe la fonction,
    if (!div_fav) return;
    // Et si elle existe, on la vide.
    div_fav.innerHTML = ""

    // On récupère les favoris,
    const favorites = getFavorites()

    // On vérifie si il y en a, 
    if (!favorites || favorites.length <= 0) {
        // Si il y en a pas, on aaffiche un message précisant qu'il n'y a pas d'instruments favoris, et on 
        // arrête la fonction.
        const mess_vide = document.createElement('div')
        mess_vide.className = "mess_vide"
        mess_vide.textContent = "Aucun instrument dans vos favoris pour le moment."
        div_fav.append(mess_vide)
        return
    }

    // Si il y en a ,on boucle sur tous les favoris pour les afficher correctment,
    favorites.forEach(product => {
        // On crée la div qui contiendra l'instrument en y attribuant l'ID correspondant,
        const div_prod = document.createElement('div')
        div_prod.className = "div_prod"
        div_prod.id = `${product.ID}`

        // On crée le containeur de l'image en y mettant l'image correspondante,
        const div_img = document.createElement('div')
        div_img.className = "div_img"
        const img = document.createElement('img')
        img.src = product.Images[0]
        img.alt = product.Name
        div_img.appendChild(img)
        // On met une eventListener pour que, quand l'utilisateur survole l'image principale, elle soit remplacée par 
        // la 2ème image de l'instrument.
        img.addEventListener("mouseenter", () => img.src = product.Images[1])
        img.addEventListener("mouseleave", () => img.src = product.Images[0])

        // On crée l'élément qui contiendra les caractéristiques du produit (Nom, prix, boutons),
        const div_carac = document.createElement('div')
        div_carac.className = "div_carac"
        // Ajout du nom,
        const div_nom = document.createElement('div')
        const nom = document.createElement('h3')
        nom.textContent = `${product.Name}`
        // Ajout du prix,
        const prix = document.createElement('div')
        prix.textContent = `${product.Prix} €`
        // Ajout des boutons (+ d'infos, supprimer),
        // const btn = document.createElement('button')
        // btn.className = "btn"
        // btn.type = "button"
        const lien = document.createElement('a')
        lien.title = `Voir plus d'informations sur ${product.Name}`
        lien.href = `http://localhost:8000/${product.ID}`
        lien.textContent = `Voir`
        // lien.appendChild(btn)

        const btn_supp = document.createElement('button')
        btn_supp.className = "btn"
        btn_supp.type = "button"
        btn_supp.textContent = "Supprimer"

        // Ajout des eventListeners pour ces boutons,
        btn_supp.addEventListener("click", () => {
            removeFavorite(product)
            displayFavorites()          
        })

        // Et enfin, on affiche tous ces éléments en les ajoutant au container principal.
        div_fav.append(div_prod)
        div_prod.append(div_img, div_carac)
        
        div_carac.append(div_nom, prix, lien, btn_supp)
        div_nom.append(nom)
    })
}