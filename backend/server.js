const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true })
.then(() => console.log('MongoDB connected.'))
.catch(err => console.log(err))

const app = express()

app.use('/api/users', require('./routes/userRoutes'))

app.listen(8000, () => console.log('Server running on port http://localhost:8000'))