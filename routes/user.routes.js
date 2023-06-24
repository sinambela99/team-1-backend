const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user.controller')

router.get('/users',Controller.getAllUsers)
router.get('/users/:id',Controller.getUserById)
router.post('/users/register', Controller.register)
router.post('/users/login', Controller.login)
router.put('/users/:id', Controller.updateUser)
router.delete('/users/:id', Controller.deleteUser)

module.exports = router