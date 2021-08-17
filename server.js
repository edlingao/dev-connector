import express from 'express'
import connectDB from './config/db.js'
import { Auth, Post, Profile, User,} from './routes/api/index.js'

const app = express()
const PORT = process.env.PORT || 5000

// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API runing'))

// Define routes
app.use('/api/users', User)
app.use('/api/profiles', Profile)
app.use('/api/posts', Post)
app.use('/api/auth', Auth)

app.listen(PORT, () => console.log(`server at http://localhost:${PORT}`))
