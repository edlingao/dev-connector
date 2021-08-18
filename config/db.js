import mongoose from 'mongoose'
import config from 'config'

const db = config.get('mongoURI')


const connectDB = async () => {
  try {
    await mongoose.connect(db, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Mongo DB connected...')
  } catch(error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
