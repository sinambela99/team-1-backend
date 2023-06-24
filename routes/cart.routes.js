const express = require('express')
const router = express.Router()
const Controller = require('../controllers/cart.controller')

router.get('/cart',Controller.getAllCart)
router.get('/cart/:id',Controller.getCartById)
router.post('/cart', Controller.newCart)
router.put('/cart/:id', Controller.updateCart)
router.delete('/cart/:id', Controller.deleteCart)

module.exports = router