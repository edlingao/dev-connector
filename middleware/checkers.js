import { check } from "express-validator"

function returnChecker(param) {
  let checker = {}
  switch(param) {
    case 'name':
      checker = check("name", "Name is required").not().isEmpty()
      break
    case 'email':
      checker = check("email", "Please include a valid email").isEmail()
      break
    case 'password-register':
      checker = check(
        "password",
        "Please enter a password with 6 or more characteres"
      ).isLength({ min: 6 })
      break
    case 'password-login':
      checker = check("password", "Password is required").exists()
      break
  }
  return checker
}

export default (params = [
  'name',
  'email',
  'password-register',
]) => {
  const checker = [
  ]
  params.forEach((param) => {
    checker.push(returnChecker(param))
  })
  return checker
} 
