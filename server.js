import express from 'express'
import connectDB from './config/db.js'

const app = express()

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('API runing'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server at http://localhost:${PORT}`))
