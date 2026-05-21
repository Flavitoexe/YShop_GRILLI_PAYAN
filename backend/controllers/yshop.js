const utils = require('../utils/utils')
const productsFile = './backend/data.json'


/**
 * getAllProducts est la fonction backend qui lit tous les produits dans le fichier data.json, et qui renvoie tout au format JSON.
 * @param {*} req : Requête reçue par le backend;
 * @param {*} res : Réponse renvoyée par le backend;
 * @returns : Tous les produits contenus dans le fichier 'data.json'.
 */
const getAllProducts = (req, res) => {
    console.log('Entrée dans getAllProducts : ')
    const productsList = utils.strToObject(productsFile)

    res.status(200).json({
        message: 'Products successfully found.',
        productsList
    })
}


/**
 * getProductById est la fonction backend qui permet d'obtenir un produit grâce à son id.
 * @param {*} req : Requête reçue par le backend;
 * @param {*} res : Réponse renvoyée par le backend;
 * @returns : Le produit correspondant à l'id passé en paramètre.
 */
const getProductById = (req, res) => {
    console.log('Entrée dans getProductById : ')
    // On récupère l'id du produit à chercher dans l'url.
    const idToGet = parseInt(req.params.id)
    if (idToGet === -1 || idToGet === undefined) {
        res.status(500).json({
            message: 'Error with product id (inexistant or undefined).'
        })
        return
    }
    // On transforme le contenu du fichier récupéré (string) pour créer un tableau d'objets JSON, ce qui permet de le manipuler en JavaScript,
    const currentProducts = utils.strToObject(productsFile)
    // On cherche l'instrument en fonction de son id,
    const product = currentProducts.find( product => product.ID === idToGet)

    // Enfin, on vérifie si l'instrument existe et on gestionne l'erreur en fonction.
    if (!product) {
        res.status(404).json({
            message: 'Product not found.'
        })
        return
    } else {
        res.status(200).json({
            message: 'Product successfully found.',
            product
        })
    }
}

/**
 * getProductsByName est la fonction backend qui permet d'obtenir un produit grâce à son nom.
 * @param {*} req : Requête reçue par le backend;
 * @param {*} res : Réponse renvoyée par le backend;
 * @returns : Les produit correspondants au nom passé en paramètre.
 */

const getProductsByName = (req, res) => {
    try {
        console.log('Entrée dans getProductsByName pour le nom :', req.params.name);
        const nameToGet = req.params.name ? decodeURIComponent(req.params.name) : null;
        
        if (!nameToGet) {
            return res.status(400).json({
                message: 'Error: Product name is missing or undefined.'
            });
        }
        if (!productsFile) {
            return res.status(500).json({ message: 'Database file is missing.' });
        }

        const currentProducts = utils.strToObject(productsFile);
        const products = currentProducts.filter(product => product.Name === nameToGet);

        if (products.length === 0) {
            return res.status(404).json({
                message: 'No products found with this name.',
                products: [] 
            });
        } 
        
        return res.status(200).json({
            message: 'Products successfully found.',
            products
        });

    } catch (error) {
        console.error("Crash évité dans getProductsByName :", error);
        return res.status(500).json({
            message: 'Internal server error inside getProductsByName.',
            error: error.message
        });
    }
}

/**
 * getProductsbyCategory est la fonction backend qui permet d'obtenir tous les produits d'une catégorie.
 * @param {*} req : Requête reçue par le backend;
 * @param {*} res : Réponse renvoyée par le backend;
 * @returns : Les produits correspondant à la catégorie passée en paramètre.
 */
const getProductsByCategory = (req, res) => {
    console.log('Entrée dans getproductsByCategory :')
    // On récupère la catégorie dans l'url
    const category = req.params.category
    if (category === undefined) {
        res.status(500).json({
            message: "Error with category (undefined)."
        })
    }

    const instrumentsList = utils.strToObject(productsFile)
    const productsList = instrumentsList.filter( elt => elt.Categorie === category )

    if (!productsList) {
        res.status(404).json({
            message: "Products not found."
        })
    } else {
        res.status(200).json({
            message: "Products found.",
            productsList
        })
    }
}

/**
 * getProductsByFamily est la fonction backend qui permet d'obtenir tous les produits en fonction de leur famille.
 * @@param {*} req : Requête reçue par le backend;
 * @param {*} res : Réponse renvoyée par le backend;
 * @returns : Les produits correspondant à la famille passée en paramètre.
 */
const getProductsByFamily = (req, res) => {
    console.log('Entrée dans getproductsByFamily :')
    // On récupère la famille dans l'url
    const family = req.params.family
    if (family === undefined) {
        res.status(500).json({
            message: "Error with category (undefined)."
        })
    }

    const instrumentsList = utils.strToObject(productsFile)
    const productsList = instrumentsList.filter( elt => elt.Caracs.famille === family )

    if (!productsList) {
        res.status(404).json({
            message: "Products not found."
        })
    } else {
        res.status(200).json({
            message: "Products found.",
            productsList
        })
    }
}


/**
 * addProduct est la fonction backend qui permet d'ajouter un produit dans le fichier data.json.
 * @param {*} req : Requête reçue par le backend;
 * @param {*} res : Réponse renvoyée par le backend;
 * @returns : Le statut de l'opération (500 si l'ajout a échoué, 200 si il a réussi...).
 */
const addProduct = (req, res) => {
    console.log('Entrée dans addProduct :')

    let products = utils.strToObject(productsFile)
    // On crée un id unique à chaque produit en fonction de la date,
    req.body.id = Date.now()
    // On push le nouveau produit dans le tableau crée juste avant,
    products.push(req.body)
    // On écrit le nouveau tableau dans le fichier, et on gestionne l'erreur.
    const error = utils.writeInFile(productsFile, products)
    if (error) {
        res.status(500).json({
            message: 'Error writing new product in file.'
        })
        return
    } else {
        res.status(200).json({
            message: 'Product added successfully.',
            product 
        })
    }
}


/**
 * updateProduct est la fonction backend qui permet modifie un produit dans le fichier data.json.
 * @param {*} req : Requête reçue par le backend;
 * @param {*} res : Réponse renvoyée par le backend;
 * @returns : Le statut de l'opération (500 si la modification a échoué, 200 si elle a réussi...).
 */
const updateProduct = (req, res) => {
    console.log('Entrée dans updateProduct :')

    // On récupère et vérifie l'id du produit à modifier dans les paramètres de l'url (voir router .../:id),
    const idToUpdate = parseInt(req.params.id)
    if (idToUpdate === -1 || idToUpdate === undefined) {
        res.status(500).json({
            message: 'Error with product id (inexistant or undefined).'
        })
        return
    }

    // On vérifie si il y a bien quelque chose à modifier.
    if (!req.body) {
        res.status(400).json({
            message: 'No new values received.'
        })
        return
    }

    // On cherche, dans le fichier data.json, le produit avec l'id correspondant,
    const currentProducts = utils.strToObject(productsFile)
    let product = currentProducts.find( product => product.ID === idToUpdate )
    if (product === undefined) {
        res.status(404).json({
            message: 'Product not found'
        })
        return
    }
    
    // On récupère les nouvelles données et on modifie le produit,
    const newValues = req.body
    if (newValues.id) { product.id = newValues.id }   // A voir si on garde
    if (newValues.Name) { product.Name = newValues.Name }
    if (newValues.Description) { product.Description = newValues.Description }
    if (newValues.Quantity) { product.Quantity = newValues.Quantity }
    if (newValues.Prix) { product.Prix = newValues.Prix }
    if (newValues.Devise) { product.Devise = newValues.Devise }
    if (newValues.Images) { product.Images = newValues.Images }
    if (newValues.Caracs) { product.Caracs = newValues.Caracs }

    // On réécrit dans le fichier data.json avec les nouvelles données.
    const error = utils.writeInFile(productsFile, currentProducts)
    if (error) {
        res.status(500).json({
            message: 'Error writing in file.'
        })
        return
    } else {
        res.status(200).json({
            message: 'Product updated successfully.',
            product
        })
    }
}


/**
 * deleteProduct est la fonction backend qui permet de supprimer un produit.
 * @param {*} req : Requête reçue par le backend;
 * @param {*} res : Réponse renvoyée par le backend;
 * @returns Le statut de l'opération (500 si la suppression a échoué, 200 si elle a réussi...).
 */
const deleteProduct = (req, res) => {
    console.log('Entrée dans deleteTask :')
    const idToDelete = parseInt(req.params.id)
    if (idToDelete === -1 || idToDelete === undefined) {
        res.status(500).json({
            message: 'Error with product id (inexistant or undefined).'
        })
        return
    }

    let currentProducts = utils.strToObject(productsFile)
    const product = currentProducts.find( product => product.id === idToDelete )
    console.log('product : ', product)
    if (!product) {
        res.status(404).json({
            message: 'Product not found.'
        })
        return
    }

    // On supprime le produit du fichier.
    currentProducts.splice(currentProducts.indexOf(product), 1)

    const error = utils.writeInFile(productsFile, currentProducts)
    if (error) {
        res.status(500).json({
            message: 'Error writing in file.'
        })
        return
    } else {
        res.status(200).json({
            message: 'Product removed successfully.',
            product
        })
    }
}

module.exports = {getAllProducts, getProductById, getProductsByName,getProductsByCategory, getProductsByFamily, addProduct, updateProduct, deleteProduct}