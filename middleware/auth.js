import jwt from 'jsonwebtoken'
import config from 'config'
import response from './response.js'

export default function middleware(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  if(!token) {
    return response(res, {
      status: 401,
      payload: { msg: 'Unathorized' }
    })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    next()
  } catch(err) {
    return response(res, { 
      status: 401,
      payload: { msg: 'Token is invalid' }
    })
  }
}