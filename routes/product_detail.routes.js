const express = require('express')
const router = express.Router()
const Controller = require('../controllers/product_detail.controller')

router.get('/product_detail',Controller.getAllProduct_detail)
router.get('/product_detail/:id',Controller.getProduct_detailById)
router.post('/product_detail', Controller.newProduct_detail)
router.put('/product_detail/:id', Controller.updateProduct_detail)
router.delete('/product_detail/:id', Controller.deleteProduct_detail)

module.exports = router