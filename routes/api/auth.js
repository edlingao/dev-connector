import express from 'express'
import auth from '../../middleware/auth.js'
import User from '../models/User.js'
import response from '../../middleware/response.js'
import checkers from '../../middleware/checkers.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from 'config'
import { validationResult } from "express-validator"


const router = express.Router()

// @route   GET api/Auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    response(res, {
      status: 200,
      payload: {
        message: 'Success',
        info: user
      }
    })
  } catch (err) {
    response(res, {
      status: 500,
      payload: {
        message: 'Server error',
        info: err
      }
    })
  }
})



// @route   POST api/Auth
// @desc    Authenticate user & get tomen
// @access  Public
router.post('/',
  checkers(['email', 'password-login']),
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, {
        status: 400,
        payload: {
          errors: errors.array(),
        }
      })
    }

    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return response(res, {
          status: 400,
          payload: {
            errors: [{ msg: 'Invalid Credentials' }]
          }
        })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return response(res, {
          status: 400,
          payload: {
            errors: [{ msg: 'Invalid Credentials' }]
          }
        })
      }
      

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if(err) throw err

          response(res, {
            status: 200,
            payload: {
              msg: 'Success!',
              info: { token }
            }
          })
        }
      )
    } catch (err) {
      console.error(err)
      response(res, {
        status: 500,
        payload: {
          erros: [{msg: err.toString()}]
        }
      })
    }
  }
)


export default router
