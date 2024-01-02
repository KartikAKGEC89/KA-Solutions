const express = require('express')
const {authUser} = require('../controller/userController')

const router = express.Router()

router.post('/', authUser)


module.exports = router