const router = require('express').Router()

const controller = require('../controller/user')

router.post('/new', controller.newUser)
router.get('/login', controller.logIn)

module.exports = router