import express from 'express'

const app = express()

app.get('/', (req, res) => res.send('API runing'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server at http://localhost:${PORT}`))
