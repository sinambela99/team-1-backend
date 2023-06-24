const express = require('express')
const router = express.Router()
const Controller = require('../controllers/stock.controller')

router.get('/stocks',Controller.getAllStocks)
router.get('/stocks/:id',Controller.getStockById)
router.post('/stocks', Controller.createNewProduct)
router.put('/stocks/:id', Controller.updateStock)
router.delete('/stocks/:id', Controller.deleteStock)

module.exports = router