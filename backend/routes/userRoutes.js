const express = require('express')
const router = express.Router()
const { getUsers, setUser, updateUser, deleteUser } = require('../controllers/userController')

router.post('/', setUser)
router.get('/', getUsers)
router.put('/', updateUser)
router.delete('/', deleteUser)

module.exports = router