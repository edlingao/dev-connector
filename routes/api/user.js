import express from "express"
import { check, validationResult } from "express-validator"
import User from "../models/User.js"
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'

const router = express.Router()

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characteres"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const { name, email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] })
      }
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })
      let newUser = new User({
        name,
        email,
        password,
        avatar
      })
      const salt = await bcrypt.genSalt(10)
      newUser.password = await bcrypt.hash(password, salt)
      await newUser.save()

      const payload = {
        user: {
          id: newUser.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if(err) throw err
          res.json({ token })
        }
      )

    } catch (err) {
      console.error(err)
      res.status(500).send("Server error")
    }
  }
)

export default router
