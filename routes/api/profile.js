import express from 'express'
const router = express.Router()

// @route   GET api/Profile
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
  res.send('Profile route')
})


export default router
