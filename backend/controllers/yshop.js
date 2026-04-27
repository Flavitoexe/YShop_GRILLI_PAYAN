const utils = require('../utils/utils')
const productsFile = './data.json'


// getAllProducts est la fonction backend qui lit tous les produits dans le fichier data.json, et qui renvoie tout au format JSON.
const getAllProducts = (req, res) => {
    console.log('Entrée dans getAllProducts : ')
    const productsList = utils.strToObject(productsFile)

    res.status(200).json({
        message: 'Products successfully found.',
        productsList
    })
}

// addProduct est la fonction backend qui permet d'ajouter un produit dans le fichier data.json.
const addProduct = (req, res) => {
    console.log('Entrée dans addProduct :')
    const currentProducts = utils.readInFile(productsFile)

    // On parse le contenu du fichier pour créer un tableau d'objets JSON, ce qui permet de le manipuler en JavaScript.
    let products = JSON.parse(currentProducts)
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
    } else {
        res.status(200).json({
            message: 'Product added successfully.'
        })
    }
}

// updateProduct est la fonction backend qui permet modifie un produit dans le fichier data.json.
const updateProduct = (req, res) => {
    console.log('Entrée dans updateProduct :')
    // On récupère et vérifie l'id du produit à modifier dans les paramètres de l'url (voir router .../:id)
    const idToUpdate = parseInt(req.params.id)
    if (idToUpdate === -1 || idToUpdate === undefined) {
        res.status(500).json({
            message: 'Error with id (inexistant or undefined)'
        })
    }

    // On cherche, dans le fichier data.json, le produit avec l'id correspondant,
    const currentProducts = utils.strToObject(productsFile)
    let product = currentProducts.find( prod => prod.id === idToUpdate )
    console.log('product : ', product)  
    if (product === undefined) {
        res.status(404).json({
            message: 'Product not found'
        })
        return
    }
    
    // On récupère les nouvelles données et on modifie le produit,
    const newVariables = req.body
    console.log('request.body :', newVariables)
    const keys = Object.keys(newVariables)
    console.log('newVaribales keys : ', keys)
    for (let i = 0; i < keys.length; i++) {
    }


}

// deletetask est la fonction backend
const deleteProduct = (req, res) => {
    console.log('Entrée dans deleteTask :')
    
}

module.exports = {getAllProducts, addProduct, updateProduct}