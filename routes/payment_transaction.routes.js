const express = require('express')
const router = express.Router()
const Controller = require('../controllers/payment_transaction.controller')

router.get('/payment',Controller.getAllPayTrans)
router.get('/payment/:id',Controller.getPayTransById)
router.post('/payment', Controller.createNewPayTrans)
router.put('/payment/:id', Controller.updatePayTrans)
router.delete('/payment/:id', Controller.deletePayTrans)

module.exports = router