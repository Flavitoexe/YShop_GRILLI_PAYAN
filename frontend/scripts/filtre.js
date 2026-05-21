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

    // Ensuite, on crée le container de la section famille, que l'on rempli avec les classes et le titre,
    const div_famille = document.createElement('div')
    div_famille.className = "div_filtre_section"

    const titre_famille = document.createElement('h4')
    titre_famille.className = "titre_section_filtre"
    titre_famille.textContent = "Famille"
    div_famille.appendChild(titre_famille)

    // On boucle sur chaque élément du tableau des familles, puis on crée et ajoute la checkbox,
    families.forEach( family => {
        const label_famille = document.createElement('label')
        label_famille.className = "label_famille"

        const check_famille = document.createElement('input')
        check_famille.type = "checkbox"
        check_famille.className = "check_famille"
        check_famille.id = family

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

    types.forEach( type => {
        const label_inst = document.createElement('label')
        label_inst.className = "label_instrument"

        const check_inst = document.createElement('input')
        check_inst.type = "checkbox"
        check_inst.className = "check_instrument"
        check_inst.id = type

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

    brands.forEach( brand => {
        const label_mrq = document.createElement('label')
        label_mrq.className = "label_marque"

        const check_mrq = document.createElement('input')
        check_mrq.type = "checkbox"
        check_mrq.className = "check_marque"
        check_mrq.id = brand

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


async function filterInstruments() {
    // On récupère tous les instruments,
    const data = await getAllInstruments()
    const allInstruments = data.productsList

    // On crée le tableau qui accueillera les instruments filtrés,

    // On récupère toutes les checkboxes des familles,
    const familyCheckboxes = document.querySelectorAll('.check_famille')

    // On crée un tableau pour stocker les familles cochées par l'utilisateur,
    let checkedFamilies = []
    // On boucle sur la liste des checkboxes,
    familyCheckboxes.forEach( elt => {
        // On vérifie si la checkbox est cochée, 
        // Si oui, alors on ajoute le nom de la famille nettoyé dans le tableau des familles cochées.
        if (elt.checked) checkedFamilies.push(elt.id.toLowerCase())
    })

    // Et on répète avec les types et les familles.
    // Types,
    const typeCheckboxes = document.querySelectorAll('.check_instrument')
    let checkedTypes = []
    typeCheckboxes.forEach( elt => { if (elt.checked) checkedTypes.push(elt.id.toLowerCase()) })

    // Et marques.
    const brandCheckboxes = document.querySelectorAll('.check_marque')
    let checkedBrands = []
    brandCheckboxes.forEach( elt => { if (elt.checked) checkedBrands.push(elt.id.toLowerCase()) })

    // Ensuite, on filtre le tableau des instruments dans une variable en appliquant les 3 filtres.
    let filteredArray = allInstruments.filter( instrument => {
        // Dans cette ligne, on vérifie si aucune checkbox a été coché, sinon on regarde si la famille de l'instrument est 
        // inclue dans les filtres de famille. familyMatch stockera donc un booléen.
        const familyMatch = checkedFamilies.length === 0 || checkedFamilies.includes(instrument.Caracs.famille.toLowerCase())
        const typeMatch = checkedTypes.length === 0 || checkedTypes.includes(instrument.Categorie.toLowerCase())
        const brandMatch = checkedBrands.length === 0 || checkedBrands.includes(instrument.Caracs.marque.toLowerCase())
        // Même fonctionnement pour les 2 autres lignes avec le type et la marque.

        // Et enfin, on retourne un booléen. Si le résultat est vrai, alors l'instrument sera gardé, mais si il est faux, 
        // alors ca veut dire qu'il passe pas les filtres, donc il est rejeté. 
        return familyMatch && typeMatch && brandMatch
    })

    // Et enfin, on retourne le tableau filtré.
    return filteredArray
}