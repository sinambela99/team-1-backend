const express = require('express')
const router = express.Router()
const Controller = require('../controllers/product.controller')

router.get('/product',Controller.getAllProduct)
router.post('/product', Controller.newProduct)
router.get('/product/:id',Controller.getProductById)
router.put('/product/:id', Controller.updateProduct)
router.delete('/product/:id', Controller.deleteProduct)

module.exports = router