const user = require('../models/userModel')

const setUser = (req,res) => {
    new user({
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
    }).save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({ message: 'Invalid Request', error: err }))
}

const getUsers = (req,res) => {
    user.find()
    .then(users => res.json(users))
    .catch(err => res.json({ error: err }))
}

const updateUser = (req,res) => {
    user.findOneAndUpdate(
        { username: req.query.username },
        { password: req.query.password },
        { new: true }
    )
    .then(() => res.status(200).json({ message: 'User password updated successfully!' }))
    .catch(err => res.json({ error: err }))
}

const deleteUser = (req,res) => {
    user.findOneAndDelete({ username: req.query.username })
    .then(() => res.status(200).json({ message: 'User deleted successfully!' }))
    .catch(err => res.json({ error: err }))
}

module.exports = {
    getUsers,
    setUser,
    updateUser,
    deleteUser
}