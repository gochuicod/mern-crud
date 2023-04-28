import express from 'express'
import mongoose from 'mongoose'
import body_parser from 'body-parser'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true })
.then(() => console.log('MongoDB connected.'))
.catch(err => console.log(err))

const app = express()

app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))
app.use('/api/users', userRoutes)

app.listen(8000, () => console.log('Server running on port http://localhost:8000'))