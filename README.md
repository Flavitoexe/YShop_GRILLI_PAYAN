# Music'Shop

Music'Shop est le nom de notre boutique d'instruments de musique fictive, réalisée dans le cadre du projet final *YShop* du module *Challenge 1 JS*.

## Fonctionnalités

* **Nouveautés** : Dès votre arrivée sur la page principale, vous remarquerez un carousel interactif présentant des instruments qui viennent de sortir, en théorie. En pratique, ce sont 5 instruments choissi au hasard dans la liste de tous les instruments.

* **Catalogue** : Vous avez également un bouton *Produits* qui se situe dans l'en-tête de la page. Il vous redirigera vers une page qui liste tous les instruments disponibles.

* **Catégories** : Vous pouvez également filtrer votre recherche par catégories (Cordes, cuivres ou percussions) grâce aux trois boutons situés vers le bas de la page, dans la section *Catégories*.

* **Détails** : Lorsque vous cliquez sur le nom d'un instrument (Dans le carousel ou dans les catalogues), vous serez redirigés vers une page sur laquelle vous aurez plusieurs informations sur le produit, ainsi que la possibilitée de le mettre dans les favoris et/ou dans le panier.

* **Favoris et Panier** : Dans l'en-tête du site, vous aurez également 2 icônes cliquables qui voous redirigeront vers les produits que vous aurez mis en favoris ou dans le panier. </br> *Note pour le panier : Les quantités affichées sur la page des détails seront mises à jour une fois l'achat effectué dans le panier.*

* **Recherche et Filtres** : Vous pouvez également rechercher un instrument via la *barre de recherche* située dans l'en-tête de la page, mais vous pouvez aussi les filtrer par marques, familles, types...

</br>

## Installation et Lancement

</br>

**Prérequis** : Avoir [Git](https://git-scm.com/), un éditeur de code ([VSCode](https://code.visualstudio.com/) par exemple) et [Node.js](https://nodejs.org/fr).

</br>

1. Cloner le dépôt

Ouvrez un terminal dans le dossier où vous voulez stocker le code, </br>
Copier cette commande et exécutez là :

```bash
git clone https://github.com/Flavitoexe/YShop_GRILLI_PAYAN.git
```

</br>

2. Installation des dépendances

Une fois le dépôt cloné, ouvrez le dossier dans votre éditeur de code et ouvrez un terminal (Ctrl + ù sur *VSCode*). Vous devriez avoir quelque chose comme ça :

```text
 *Emplacement du dossier*\Module - Proj1 Challenge JS\YShop_GRILLI_PAYAN>
```

Dès que vous êtes ici, tapez la commande :

```bash
npm run install-all
```

Celle-ci téléchargera toutes les dépendances requises au bon fonctionnement du site.

</br>

3. Lancer et accéder au site

Enfin, tapez cette commande :

```bash
npm run yshop
```

Et dans votre navigateur, allez sur :

```text
http://localhost:8000
```

Et voilà ! Vous êtes sur le site !

</br>

4. Stopper les serveurs

Si vous voulez arréter le site vous devez couper les serveurs, pour cela : </br> Retournez dans votre terminal, là où vous avez tapé la commande :

```bash
npm run yshop
```

Et appuyez simplement sur *Ctrl + C*, puis sur *Entrée*. </br> Les serveurs seront coupés, et le site ne sera plus accessible.

</br>

## Structure du Projet

```text
└── YShop_GRILLI_PAYAN\
    ├── backend\
    │   ├── app.js
    │   ├── controllers\
    │   │   └── yshop.js
    │   ├── data.json
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── router\
    │   │   └── yshop.js
    │   └── utils\
    │       └── utils.js
    ├── frontend\
    │   ├── app.js
    │   ├── css\
    │   │   ├── autres fichiers css...
    │   │   └── basket.css
    │   ├── img\
    │   │   ├── autres catégories d'instruments avec leurs photos...\
    │   │   ├── banjos\
    │   │   │   └── photos de banjos...
    │   │   └── misc\
    │   │       ├── logo.png
    │   │       └── shortcut_icon.png
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── router\
    │   │   └── yshop.js
    │   ├── scripts\
    │   │   ├── autres fichiers js...
    │   │   └── basket.js
    │   └── views\
    │       ├── autres fichiers ejs...
    │       ├── basket.ejs
    │       └── components\
    │           ├── head.ejs
    │           └── header.ejs
    ├── package-lock.json
    ├── package.json
    └── README.md
```

</br>

## Auteurs

*GRILLI Flavio* et *PAYAN Lisa*, dans le cadre d'un projet scolaire.
