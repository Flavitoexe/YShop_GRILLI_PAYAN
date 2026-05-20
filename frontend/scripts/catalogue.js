const urlAPI = "http://localhost:3000/"

/**
 * getAllProducts est la fonction qui fait une requête au serveur backend pour avoir tous les instruments 
 * et qui appelle displayProducts pour afficher directement tous les produits.
 */
function getAllProducts() {
    fetch(urlAPI + "getAllProducts")
        .then(response => response.json())
        .then(data => {
            console.log(data.productsList)
            displayProduct(data.productsList)
        })
        .catch(error => console.error('Error fetching data : ', error))
}

/**
 * displayProducts est la fonction qui affiche tous les instruments disponibles, obtenus grâce à getAllProducts.
 * Même principe que displayFavorites dans scripts/favoris.js.
 * @param {ObjectsArray} products 
 */
function displayProduct(products) {
    const div_cat = document.querySelector('.div_cat')
    div_cat.innerHTML = ""

    const btn_ouvrir_filtre = document.createElement('button')
    btn_ouvrir_filtre.textContent = 'Filtre'
    btn_ouvrir_filtre.id = 'btn_ouvrir_filtre'
    btn_ouvrir_filtre.className = "btn_ouvrir_filtre"
    btn_ouvrir_filtre.type = "button" // Évite les soumissions de formulaires fantômes

    const zone_filtre = document.createElement('div')
    zone_filtre.id = 'zone_filtre'
    zone_filtre.className = "zone_filtre"

    // 2. On les place JUSTE AVANT la liste des produits pour ne pas casser ta grille CSS
    div_cat.before(btn_ouvrir_filtre)
    btn_ouvrir_filtre.after(zone_filtre)

    // 3. L'écouteur du clic (qui va maintenant trouver la bonne fonction)
    btn_ouvrir_filtre.addEventListener('click', function() {
        if (zone_filtre.innerHTML !== "") {
            zone_filtre.innerHTML = ""; 
        } else {
            // Cette fonction s'appelle bien ainsi dans filtre.js désormais !
            const leFormulaire = displayFilter();
            zone_filtre.appendChild(leFormulaire);
        }
    });

    products.forEach(product => {
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
        lien.href = `http://localhost:8000/${product.ID}`
        lien.textContent = `Voir`

        div_cat.append(div_prod)
        div_prod.append(div_img, div_carac)
        div_carac.append(div_nom, prix, btn)
        div_nom.append(nom)
        btn.append(lien)
    });
}