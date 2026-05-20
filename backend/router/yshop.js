const express = require('express')
const router = express.Router()
const controllers = require('../controllers/yshop')

// Ceci représente l'ensemble de nos routes pour récupérer, ajouter, modifier ou supprimer les données demandées.
router.get('/getAllProducts', controllers.getAllProducts)
router.get('/getProductById/:id', controllers.getProductById)
router.get('/getProductsByCategory/:category', controllers.getProductsByCategory)
router.get('/getProductsByFamily/:family', controllers.getProductsByFamily)
router.post('/addProduct', controllers.addProduct)
router.put('/updateProduct/:id', controllers.updateProduct)
router.delete('/deleteProduct/:id', controllers.deleteProduct)

module.exports = router