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
        console.log('id de linstrument et index :', instrument.ID, )
        currentBasket.splice(currentBasket.findIndex( elt => elt.ID === instrument.ID), 1)
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

    const div_total = document.createElement('div')
    div_total.className = "div_total"

    const sous_total = document.createElement('div')
    sous_total.className = "sous_total"
    const mess_total = document.createElement('div')
    mess_total.textContent = "Total de votre panier :"
    mess_total.className = "mess_total"
    const prix_total = document.createElement('div')
    prix_total.textContent = "0 €" // mettre la fonction somme
    prix_total.className = "prix_total"
    const div_btn_total = document.createElement('div')
    div_btn_total.className = "div_btn_total"
    const btn_total = document.createElement('button')
    btn_total.className = "btn_total"
    btn_total.textContent = "Acheter"
    

    const div_ele = document.createElement('div')
    div_ele.className = "div_ele"

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

        btn_supp.addEventListener("click", () => {
            removeFromBasket(product)
            displayBasket()
        })

        const div_quant = document.createElement('div')
        div_quant.className = "div_quant"

        const btn_moins = document.createElement('button')
        btn_moins.className = "btn_moins"
        btn_moins.textContent = product.Quantity > 1 ? "-" : "🗑️"

        const btn_chiffre = document.createElement('span')
        btn_chiffre.className = "btn_chiffre"
        btn_chiffre.textContent = 1
        //btn_chiffre.textContent = product.Quantity 

        const btn_plus = document.createElement('button')
        btn_plus.className = "btn_plus"
        btn_plus.textContent = "+"

        div_panier.append(div_ele, div_total)
        div_total.append(sous_total)
        sous_total.append(mess_total, prix_total, div_btn_total)
        div_btn_total.append(btn_total)
        div_ele.append(div_prod)
        div_prod.append(div_img, div_carac_1, div_carac_2)

        div_carac_1.append(sous_carac_1_1, sous_carac_1_2)
        sous_carac_1_1.append(div_nom, btn)
        sous_carac_1_2.append(div_supp);

        div_supp.append(btn_supp)
        div_carac_2.append(sous_carac_2_1, sous_carac_2_2);
        sous_carac_2_1.append(prix);
        sous_carac_2_2.append(div_quant);
        div_quant.append(btn_moins, btn_chiffre, btn_plus)

        div_nom.append(nom)
        btn.append(lien)

    })
}
