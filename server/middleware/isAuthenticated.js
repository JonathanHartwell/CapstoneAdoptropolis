require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
const { SECRET } = process.env

module.exports = {
  isAuthenticated: async (req, res, next) => {
    const headerToken = req.get('Authorization')

    if (!headerToken) {
      console.log('Error in auth middleware')
      return res.sendStatus(401)
    }

    let token

    try {
      token = jwt.verify(headerToken.split(' ')[1], SECRET)
    } catch (err) {
      console.log('Error in token verification', err)
      return res.status(500).send('Token verification failed')
    }

    if (!token) {
      return res.status(401).send('Not authenticated.')
    }

    try {
      const user = await User.findByPk(token.id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      req.user = user // Set the user object on the request
      next()
    } catch (error) {
      console.error('Error retrieving authenticated user:', error)
      res.status(500).json({ message: 'Error retrieving authenticated user' })
    }
  }
}
