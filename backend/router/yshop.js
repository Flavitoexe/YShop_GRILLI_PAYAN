const express = require('express')
const router = express.Router()
const controllers = require('../controllers/yshop')

router.get('/getAllProducts', controllers.getAllProducts)
router.post('/addProduct', controllers.addProduct)
router.put('/updateProduct/:id', controllers.updateProduct)
// router.delete()

module.exports = router