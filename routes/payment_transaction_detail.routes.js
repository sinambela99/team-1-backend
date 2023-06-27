const express = require('express')
const router = express.Router()
const Controller = require('../controllers/payment_transaction_detail.controller')

router.get('/payment-detail',Controller.getAllPayTransDet)
router.get('/payment-detail/:id',Controller.getPayTransDetById)
router.post('/payment-detail', Controller.createNewPayTransDet)
router.put('/payment-detail/:id', Controller.updatePayTransDet)
router.delete('/payment-detail/:id', Controller.deletePayTransDet)

module.exports = router