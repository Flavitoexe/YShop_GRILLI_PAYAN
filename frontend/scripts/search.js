{
    const urlAPIRecherche = "http://localhost:3000/";

    const formulaireRecherche = document.querySelector('.search-bar');
    
    if (formulaireRecherche) {
        formulaireRecherche.addEventListener('submit', (event) => {
            if (window.location.pathname === '/search-results') {
                event.preventDefault();
                
                // On met à jour l'URL du navigateur proprement sans recharger
                const barre = document.getElementById('search-query');
                const nouvelleURL = new URL(window.location.href);
                nouvelleURL.searchParams.set('search-query', barre.value.trim());
                window.history.pushState({}, '', nouvelleURL);

                // On lance la recherche et l'affichage
                executerLaRecherche();
            }
            // Si on est sur l'accueil, on laisse le formulaire faire sa redirection HTML native vers /search-results !
        });
    }

    // Au chargement de la page de résultats, on récupère le mot-clé et on affiche
    document.addEventListener("DOMContentLoaded", () => {
        if (window.location.pathname === '/search-results') {
            const URLActuelle = new URL(window.location.href);
            const rechercheUrl = URLActuelle.searchParams.get('search-query');
            const barreRecherche = document.getElementById('search-query');

            if (rechercheUrl !== null && barreRecherche) {
                barreRecherche.value = rechercheUrl;
                executerLaRecherche();
            }
        }
    });

    async function executerLaRecherche() {
        const barre = document.getElementById('search-query');
        if (!barre) return;

        const query = barre.value.toLowerCase().trim();

        if (query.length < 1) {
            displayResultSearch([]);
            return;
        }

        try {
            const response = await fetch(urlAPIRecherche + "getAllProducts");
            const data = await response.json();
            
            const filteredArr = data.productsList.filter(elt => 
                (elt.Name && elt.Name.toLowerCase().includes(query)) || 
                (elt.Category && elt.Category.toLowerCase().includes(query))
            );

            displayResultSearch(filteredArr);
        } catch (error) {
            console.error('Erreur recherche :', error);
        }
    }

    function displayResultSearch(products) {
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
            
            img.addEventListener("mouseenter", () => img.src = product.Images[1]);
            img.addEventListener("mouseleave", () => img.src = product.Images[0]);

            const div_carac = document.createElement('div');
            div_carac.className = "div_carac";
            const div_nom = document.createElement('div');
            const nom = document.createElement('h3');
            nom.textContent = `${product.Name}`;
            const prix = document.createElement('div');
            prix.textContent = `${product.Prix} €`;
            const btn = document.createElement('button');
            btn.className = "btn";
            btn.type = "button";
            const lien = document.createElement('a');
            lien.href = `http://localhost:8000/${product.ID}`;
            lien.textContent = `Voir`;

            div_cat.append(div_prod);
            div_prod.append(div_img, div_carac);
            div_carac.append(div_nom, prix, btn);
            div_nom.append(nom);
            btn.append(lien);
        });
    }
}