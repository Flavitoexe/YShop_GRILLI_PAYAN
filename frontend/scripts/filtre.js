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
 * displayFiltre est une fonction qui permet de créer le menu qui affiche les filtres quand on clique sur le bouton Filtres.
 * @returns l'élément crée contenant tous les filtres.
 */
function displayFilters() {
    // On crée des tableaux qui stockeront les familles, types et marques d'instruments,
    const families = ['Cordes', 'Vent', 'Percussions']
    const types = ['Guitares', 'Basses', 'Violons', 'Contrebasses', 'Mandolines', 'Harpes', 'Banjos', 'Saxophones', 'Clarinettes', 'Trompettes', 'Batteries', 'Djembes', 'Maracas']
    const brands = ['Afroton', 'Andrea Varazzani', 'CHEWYZ', 'Coco Papaya', 'Cort', 'Djoliba', 'Eko', 'F.A Uebel', 'Fender', 'Gear4Music', 'Gewa', 'Gold Tone', 'Harley Benton', 'Ibanez', 'Lag', 'Lamine', 'LANGLIE', 'Master Bucur', 'MEINL', 'Muzikkon', 'Ortega', 'Rockabily', 'Selmer', 'Shiver', 'Stagg', 'Takamine', 'Taylor', 'Thomann', 'Uzman', 'Yamaha', 'ZMTV', 'Pearl', 'Tama', 'Mapex', 'Alesis', 'Roland']

    // On crée le container du formulaire,
    const form_filtre = document.createElement('form')
    form_filtre.className = "form_filtre"

    //redirection de route
    form_filtre.action = "/filter-results"
    form_filtre.method = "GET"

    // Ensuite, on crée le container de la section famille, que l'on rempli avec les classes et le titre,
    const div_famille = document.createElement('div')
    div_famille.className = "div_filtre_section"

    const titre_famille = document.createElement('h4')
    titre_famille.className = "titre_section_filtre"
    titre_famille.textContent = "Famille"
    div_famille.appendChild(titre_famille)

    // On boucle sur chaque élément du tableau des familles, puis on crée et ajoute la checkbox,
    families.forEach(family => {
        const label_famille = document.createElement('label')
        label_famille.className = "label_famille"

        const check_famille = document.createElement('input')
        check_famille.type = "checkbox"
        check_famille.className = "check_famille"
        check_famille.id = family
        check_famille.name = "famille"
        check_famille.value = family.toLowerCase()

        const texte_famille = document.createElement('span')
        texte_famille.className = "texte_famille"
        texte_famille.textContent = family

        label_famille.appendChild(check_famille)
        label_famille.appendChild(texte_famille)

        div_famille.appendChild(label_famille)
    })

    // On répète la même opération avec les types,
    const div_instrument = document.createElement('div')
    div_instrument.className = "div_filtre_section"

    const titre_instrument = document.createElement('h4')
    titre_instrument.className = "titre_section_filtre"
    titre_instrument.textContent = "Instrument"
    div_instrument.appendChild(titre_instrument)

    types.forEach(type => {
        const label_inst = document.createElement('label')
        label_inst.className = "label_instrument"

        const check_inst = document.createElement('input')
        check_inst.type = "checkbox"
        check_inst.className = "check_instrument"
        check_inst.id = type
        check_inst.name = "type"
        check_inst.value = type.toLowerCase()

        const texte_inst = document.createElement('span')
        texte_inst.className = "texte_instrument"
        texte_inst.textContent = type

        label_inst.appendChild(check_inst)
        label_inst.appendChild(texte_inst)

        div_instrument.appendChild(label_inst)
    })

    // Et enfin avec les marques.
    const div_marque = document.createElement('div')
    div_marque.className = "div_filtre_section"

    const titre_marque = document.createElement('h4')
    titre_marque.className = "titre_section_filtre"
    titre_marque.textContent = "Marque"
    div_marque.appendChild(titre_marque)

    brands.forEach(brand => {
        const label_mrq = document.createElement('label')
        label_mrq.className = "label_marque"

        const check_mrq = document.createElement('input')
        check_mrq.type = "checkbox"
        check_mrq.className = "check_marque"
        check_mrq.id = brand
        check_mrq.name = "marque"
        check_mrq.value = brand.toLowerCase()

        const texte_mrq = document.createElement('span')
        texte_mrq.className = "texte_marque"
        texte_mrq.textContent = brand

        label_mrq.appendChild(check_mrq)
        label_mrq.appendChild(texte_mrq)

        div_marque.appendChild(label_mrq)
    })

    // Ensuite, on crée le bouton pour appliquer les changements,
    const btn_submit = document.createElement('button')
    btn_submit.type = "submit"
    btn_submit.className = "btn_submit_filtre"
    btn_submit.textContent = "Appliquer"

    // On ajoute tout dans form_filtre,
    form_filtre.appendChild(div_famille)
    form_filtre.appendChild(div_instrument)
    form_filtre.appendChild(div_marque)
    form_filtre.appendChild(btn_submit)

    // Et enfin, on retourne le tout.
    return form_filtre
}

/**
 * filterInstruments est une fonction qui permet de filtrer les instruments en fonction des filtres cochés par 
 * l'utilisateur dans le menu affiché par displayFilters.
 * @returns tableau des instruments filtrés.
 */
async function filterInstruments() {
    // On récupère tous les instruments,
    const data = await getAllInstruments()
    const allInstruments = data.productsList || data || []

    // On sort les paramètres de requêtes cachés dans l'URL pour les utiliser apres
    const urlParams = new URLSearchParams(window.location.search);

    // On récupère toutes les valeurs associées à la clé 'famille' dans l'URL sous forme de tableau
    let checkedFamilies = urlParams.getAll('famille');

    // On récupère toutes les valeurs associées à la clé 'type' dans l'URL sous forme de tableau
    let checkedTypes = urlParams.getAll('type');

    // On récupère toutes les valeurs associées à la clé 'marque' dans l'URL sous forme de tableau 
    let checkedBrands = urlParams.getAll('marque');

    // On filtre le tableau global de tous les instruments reçus pour ne garder que ceux qui correspondent aux critères
    let filteredArray = allInstruments.filter(instrument => {
        // On fait nos vérification
        const familyMatch = checkedFamilies.length === 0 || checkedFamilies.includes(instrument.Caracs.famille.toLowerCase())
        const typeMatch = checkedTypes.length === 0 || checkedTypes.includes(instrument.Categorie.toLowerCase())
        const brandMatch = checkedBrands.length === 0 || checkedBrands.includes(instrument.Caracs.marque.toLowerCase())

        // Et enfin, on retourne un booléen. Si le résultat est vrai, alors l'instrument sera gardé, mais si il est faux, 
       // alors ca veut dire qu'il passe pas les filtres, donc il est rejeté. 
        return familyMatch && typeMatch && brandMatch
    })

    // On renvoie le tableau final contenant uniquement les instruments validés par le filtre
    return filteredArray;


    // // On crée le tableau qui accueillera les instruments filtrés,

    // // On récupère toutes les checkboxes des familles,
    // const familyCheckboxes = document.querySelectorAll('.check_famille')

    // // On crée un tableau pour stocker les familles cochées par l'utilisateur,
    // let checkedFamilies = []
    // // On boucle sur la liste des checkboxes,
    // familyCheckboxes.forEach( elt => {
    //     // On vérifie si la checkbox est cochée, 
    //     // Si oui, alors on ajoute le nom de la famille nettoyé dans le tableau des familles cochées.
    //     if (elt.checked) checkedFamilies.push(elt.id.toLowerCase())
    // })

    // // Et on répète avec les types et les familles.
    // // Types,
    // const typeCheckboxes = document.querySelectorAll('.check_instrument')
    // let checkedTypes = []
    // typeCheckboxes.forEach( elt => { if (elt.checked) checkedTypes.push(elt.id.toLowerCase()) })

    // // Et marques.
    // const brandCheckboxes = document.querySelectorAll('.check_marque')
    // let checkedBrands = []
    // brandCheckboxes.forEach( elt => { if (elt.checked) checkedBrands.push(elt.id.toLowerCase()) })

    // // Ensuite, on filtre le tableau des instruments dans une variable en appliquant les 3 filtres.
    // let filteredArray = allInstruments.filter( instrument => {
    //     // Dans cette ligne, on vérifie si aucune checkbox a été coché, sinon on regarde si la famille de l'instrument est 
    //     // inclue dans les filtres de famille. familyMatch stockera donc un booléen.
    //     const familyMatch = checkedFamilies.length === 0 || checkedFamilies.includes(instrument.Caracs.famille.toLowerCase())
    //     const typeMatch = checkedTypes.length === 0 || checkedTypes.includes(instrument.Categorie.toLowerCase())
    //     const brandMatch = checkedBrands.length === 0 || checkedBrands.includes(instrument.Caracs.marque.toLowerCase())
    //     // Même fonctionnement pour les 2 autres lignes avec le type et la marque.

    //     // Et enfin, on retourne un booléen. Si le résultat est vrai, alors l'instrument sera gardé, mais si il est faux, 
    //     // alors ca veut dire qu'il passe pas les filtres, donc il est rejeté. 
    //     return familyMatch && typeMatch && brandMatch
    // })

}

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

        // Effet de survol sur l'image s'il y a une deuxième image disponible
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

        // Assemblage des éléments
        div_nom.append(nom);
        div_carac.append(div_nom, prix, btn);
        div_prod.append(div_img, div_carac);
        div_cat.append(div_prod);
    });
}

// On attend que la page de résultats soit chargée
document.addEventListener('DOMContentLoaded', async () => {

    // Récupère la sidebar et y injecte le menu des filtres s'il est présent
    const sidebar = document.querySelector('.filters-sidebar');
    if (sidebar) {
        sidebar.appendChild(displayFilters());
    }

    // Récupère la liste des instruments filtrés grâce à l'URL
    const instrumentsFiltres = await filterInstruments();

    // affiche les produits filtrés dans la page
    displayResultFilter(instrumentsFiltres);
});