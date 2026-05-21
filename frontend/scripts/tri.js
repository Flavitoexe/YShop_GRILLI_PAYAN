function displayTri(filteredArray) {
    const form_tri = document.createElement('form')
    form_tri.className = "form_tri"

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
    // L'option par défaut (
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
