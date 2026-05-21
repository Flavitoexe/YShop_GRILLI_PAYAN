/**
 * getAllInstrument est la fonction qui fait une requête au backend pour avoir tous les instruments.
 * @returns : Tous les instruments dans le fichier backend/data.json.
 */
async function getAllInstruments() {
    try {
        // On fait une requête fetch à l'API,
        const response = await fetch('http://localhost:3000/getAllProducts')
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
 * displayTri est une fonction qui permet d'afficher le formulaire pour trier les instruments.
 * Même principe que displayFilters dans filtre.js.
 * @returns l'élément crée contenant le formulaire de tri.
 */
function displayTri() {
    const form_tri = document.createElement('form')
    form_tri.className = "form_tri"
    form_tri.action = "/tri-results" // Mets ici le nom de ta route de redirection pour le tri
    form_tri.method = "GET"

    const div_tri = document.createElement('div')
    div_tri.className = "div_filtre_section"

    const titre_tri = document.createElement('h4')
    titre_tri.className = "titre_section_filtre"
    titre_tri.textContent = "Tri des produits"

    // Menu déroulant
    const select_tri = document.createElement('select')
    select_tri.name = "tri"
    select_tri.id = "tri-select"
    select_tri.className = "select_tri_style"
    // L'option par défaut 
    const option_defaut = document.createElement('option')
    option_defaut.value = ""
    option_defaut.textContent = "Choisir une option"
    option_defaut.disabled = true
    option_defaut.selected = true
    select_tri.appendChild(option_defaut)

    //  Prix croissant
    const option_croissant = document.createElement('option')
    option_croissant.value = "croissant"
    option_croissant.textContent = "Prix croissant"
    select_tri.appendChild(option_croissant)

    // Prix décroissant
    const option_decroissant = document.createElement('option')
    option_decroissant.value = "decroissant"
    option_decroissant.textContent = "Prix décroissant"
    select_tri.appendChild(option_decroissant)

    // Alphabétique
    const option_alpha = document.createElement('option')
    option_alpha.value = "alpha"
    option_alpha.textContent = "Alphabétique"
    select_tri.appendChild(option_alpha)

    // BOUTON SUBMIT
    const btn_submit = document.createElement('button')
    btn_submit.type = "submit"
    btn_submit.className = "btn_submit_filtre"
    btn_submit.textContent = "Appliquer"

    // ASSEMBLAGE
    div_tri.appendChild(titre_tri)
    div_tri.appendChild(select_tri) 
    div_tri.appendChild(btn_submit)

    form_tri.appendChild(div_tri)

    return form_tri
}

/**
 * sortInstruments est une fonction qui permet de trier les instruments dans l'ordre croissant ou décroissant des pris, 
 * ou dans l'ordre croissant alphabétique.
 * @returns Le tableau d'instruments trié.
 */
async function sortInstruments() {
    // On récupère les instruments,
    const data = await getAllInstruments()
    let allInstruments = data.productsList || data || []
    // On récupère l'élément qui contient la valeur du formulaire,
    const urlParams = new URLSearchParams(window.location.search);
    const sortingValue = urlParams.get('tri');   
    // Puis on vérifie quel tri a été demandé par l'utilisateur, et on trie en fonction.
    if (sortingValue === 'croissant') allInstruments.sort( (a, b) => a.Prix - b.Prix )
    if (sortingValue === 'decroissant') allInstruments.sort( (a, b)  => b.Prix - a.Prix )
    if (sortingValue === 'alpha') allInstruments.sort( (a, b) => {
        let nameA = a.Name.toLowerCase()
        let nameB = b.Name.toLowerCase()

        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
    })

    // Enfin, on renvoie le tableau trié.
    console.log(allInstruments)
    return allInstruments
}
 // on affiche les produits
function displayResultFilter(products) {
    const div_cat = document.querySelector('.div_cat');
    if (!div_cat) return;
    
    div_cat.innerHTML = "";

    if (!products || products.length <= 0) {
        const mess_vide = document.createElement('div');
        mess_vide.className = "mess_vide";
        mess_vide.style.textAlign = "center";
        mess_vide.style.fontWeight = "bold";
        mess_vide.style.marginTop = "40px";
        mess_vide.style.width = "100%";
        mess_vide.style.fontSize = "1.3rem";
        mess_vide.style.color = "#333";
        mess_vide.textContent = "Aucun instrument ne correspond à votre recherche.";
        div_cat.append(mess_vide); 
        return;
    }

    products.forEach(product => {
        const div_prod = document.createElement('div');
        div_prod.className = "div_prod";
        div_prod.id = `${product.ID}`;

        const div_img = document.createElement('div');
        div_img.className = "div_img";
        const img = document.createElement('img');
        img.src = product.Images[0];
        img.alt = product.Name;
        div_img.appendChild(img);
        
        if (product.Images[1]) {
            img.addEventListener("mouseenter", () => img.src = product.Images[1]);
            img.addEventListener("mouseleave", () => img.src = product.Images[0]);
        }

        const div_carac = document.createElement('div');
        div_carac.className = "div_carac";
        
        const div_nom = document.createElement('div');
        const nom = document.createElement('h3');
        nom.textContent = `${product.Name}`;
        
        const prix = document.createElement('div');
        prix.className = "prix_prod"; 
        prix.textContent = `${product.Prix} €`;
        
        const btn = document.createElement('button');
        btn.className = "btn";
        btn.type = "button";
        
        const lien = document.createElement('a');
        lien.href = `http://localhost:8000/${product.ID}`;
        lien.textContent = `Voir`;
        btn.append(lien);

        div_nom.append(nom);
        div_carac.append(div_nom, prix, btn);
        div_prod.append(div_img, div_carac);
        div_cat.append(div_prod);
    });
}

// la page de tri s'ouvre
document.addEventListener('DOMContentLoaded', async () => {
    // Récupère et trie les instruments
    const instrumentsTries = await sortInstruments();
    
    // Affiche le résultat
    displayResultFilter(instrumentsTries);
});

