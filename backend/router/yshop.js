const express = require('express')
const router = express.Router()
const controllers = require('../controllers/yshop')

router.get('/getAllProducts', controllers.getAllProducts)
router.get('/getProductById/:id', controllers.getProductById)
router.post('/addProduct', controllers.addProduct)
router.put('/updateProduct/:id', controllers.updateProduct)
router.delete('/deleteProduct/:id', controllers.deleteProduct)

module.exports = router