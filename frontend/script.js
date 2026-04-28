// addFavorite est la fonction qui permet d'ajouter un instrument dans sa liste de favoris en appuyant sur un bouton, grâce au localstorage. 
function addFavorite(instrument) {
    console.log('Entrée dans addFavorite : ')

    // On transforme le tableau du localstorage en un tableau JSON pour pouvoir le manipuler en JavaScript.
    let currentFavorites = JSON.parse(localStorage.getItem("favorites"))
    console.log('currentFavorites : ', currentFavorites)

    // On vérifie si il y a quelque chose dans le tableau
    if (currentFavorites) {
        console.log('Ya quelque chose')
        // Si il y a quelque chose, on met le nouvel instrument dans le tableau,
        currentFavorites.push(instrument)
        // Puis on le reconvertit en string pour pouvoir le mettre dans le localstorage.
        localStorage.setItem("favorites", JSON.stringify(currentFavorites))
    } else {
        console.log('Y a rien')
        // Si il y a rien, on initialise le tableau en y ajoutant l'instrument,
        currentFavorites = []
        currentFavorites.push(instrument)

        // Puis on le met dans le localstorage
        localStorage.setItem("favorites", JSON.stringify(currentFavorites))
    }
        console.log('currentFavorites après avoir push : ', currentFavorites)

}

// removeFavorite est la fonction qui permet de retirer un instrument de sa liste de favoris en appuyant sur un bouton.
function removeFavorite(instrument) {
    console.log('Entrée dans removeFavorite : ')
    let currentFavorites = JSON.parse(localStorage.getItem("favorites"))
    console.log('currentFavorites : ', currentFavorites)

    if (currentFavorites.length > 0) {
        console.log('Y a quelque chose')
        // On enlève l'instrument du tableau.
        currentFavorites.splice(currentFavorites.indexOf(instrument), 1)
        localStorage.setItem("favorites", JSON.stringify(currentFavorites))
    } else if (currentFavorites.length === 0) {
        console.log('y a rien')
        alert('Pas de favoris')
    }
    console.log('currentFavorites après avoir splice : ', currentFavorites)

}