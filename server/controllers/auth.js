require('dotenv').config()
const {SECRET} = process.env
const {User} = require('../models/user')
const {Pets} = require('../models/pets')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const createToken = (username, id) => {
    return jwt.sign (
        {
            username,
            id
        },
        SECRET,
        {
            expiresIn: '2 days'
        }
    )
}

module.exports = {
    register: async (req, res) => {
        try {
            const {username, password} = req.body
            let foundUser = await User.findOne({where: {username}})
            if (foundUser) {
                res.status(400).send('cannot create user')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({username, hashedPass: hash})
                const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                console.log('TOKEN', token)
                const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: newUser.dataValues.username, 
                    userId: newUser.dataValues.id,
                    token, 
                    exp})
            }
        } catch (theseHands) {
            console.log('ERROR IN register')
            console.log(theseHands)
            res.sendStatus(400)
        }
    },

    login: async (req, res) => {
        try {
            const {username, password} = req.body
            let foundUser = await User.findOne({where: {username}})
            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
    
                if (isAuthenticated) {
                    const token = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
                    const exp = Date.now() + 1000 * 60 * 60 * 48
                    res.status(200).send({
                        username: foundUser.dataValues.username,
                        userId: foundUser.dataValues.id,
                        token,
                        exp
                    })
                } else {
                    res.status(400).send('cannot log in')
                }
    
            } else {
                res.status(400).send('cannot log in')
            }
        } catch (theseHands) {
            console.log('ERROR IN register')
            console.log(theseHands)
            res.sendStatus(400)
        }
    },

    addToFavorites: async (req, res) => {
        try {
          const { petId, toggleFavorite } = req.body;
          const userId = req.user.id;
      
          const user = await User.findByPk(userId);

          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          if (!Array.isArray(user.favoritePets)) {
            user.favoritePets = [];
          }
      
          const isPetInFavorites = user.favoritePets.includes(petId);
      
          if (toggleFavorite && !isPetInFavorites) {
            user.favoritePets.push(petId);
          } else if (!toggleFavorite && isPetInFavorites) {
            user.favoritePets = user.favoritePets.filter((id) => id !== petId);
          }
      
          const favoritePetsArray = user.favoritePets.map(String);
      
          await User.update(
            { favoritePets: favoritePetsArray },
            { where: { id: userId } }
          );
      
          res.json({ message: 'Pet favorites updated' });
        } catch (theseHands) {
          console.error('Error updating pet favorites:', theseHands);
          res.status(500).json({ message: 'Error updating pet favorites' });
        }
      },

      getFavoritePets: async (req, res) => {
        try {
          const { id } = req.user; // Assuming req.user contains the authenticated user object
      
          const user = await User.findByPk(id);
        
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        
          const favoritePetIds = user.favoritePets;
        
          // Retrieve the favorite pets based on the pet IDs
          const favoritePets = await Pets.findAll({
            where: {
              id: favoritePetIds
            }
          });
        
          res.status(200).json({ favoritePets });
        } catch (error) {
          console.error('Error retrieving favorite pets', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
       
}