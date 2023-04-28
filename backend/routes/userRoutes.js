import express from 'express'
import userController from '../controllers/userController.js'
const router = express.Router()

router.post('/', userController.setUser)
router.get('/', userController.getUsers)
router.put('/', userController.updateUser)
router.delete('/', userController.deleteUser)
router.post('/login',userController.login)

export default router