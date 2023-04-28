import user from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const userController = {
    setUser: (req,res) => {
        const { username, password, email } = req.body

        new user({
            username: username,
            password: bcrypt.hashSync(password,12),
            email: email,
        }).save()
        .then(user => res.status(200).json({ message: 'New user added successfully!', user: user }))
        .catch(err => res.status(400).json({ message: 'Invalid Request', error: err }))
    },
    
    getUsers: (req,res) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userID = new mongoose.Types.ObjectId(decodedToken.userID)

        user.find({ _id: userID })
        .then(
            user.find()
            .then(users => res.json({users}))
        )
        .catch(err => res.json(err))
    },
    
    updateUser: (req,res) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userID = new mongoose.Types.ObjectId(decodedToken.userID)
        const { username, password } = req.body

        user.find({ _id: userID })
        .then(
            user.findOneAndUpdate(
                { username: username },
                { password: bcrypt.hashSync(password,12) },
                { new: true }
            )
            .then(() => res.status(200).json({ message: 'User password updated successfully!' }))
            .catch(err => res.json({ error: err }))
        )
        .catch(err => res.json(err))
    },
    
    deleteUser: (req,res) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userID = new mongoose.Types.ObjectId(decodedToken.userID)
        
        user.find({ _id: userID })
        .then(
            user.findOneAndDelete({ username: req.body.username })
            .then(() => res.status(200).json({ message: 'User deleted successfully!' }))
            .catch(err => res.json({ error: err }))
        )
        .catch(err => res.json(err))
    },
    
    login: (req,res) => {
        const { username, password } = req.body

        user.findOne({ username: username })
        .then(user => {
            bcrypt.compareSync(password,user.password) ? 
                res.json({
                    authorized: true,
                    message: 'Passwords match.',
                    token: jwt.sign({ userID: user._id }, process.env.JWT_SECRET) })
            : res.json({
                authorized: false, 
                message: 'Passwords do not match.'
            })
        })
        .catch(err => res.json({
            authorized: false,
            message:'User does not exist.',
            error: err
        }))
    }
}

export default userController