const {Pets} = require('../models/pets')
const {User} = require('../models/user')

module.exports = {

    addPet: async (req, res) => {
        try {
            const {name, imgURL, type, breed, gender, age, size, color, houseTrained, goodWithDogs, goodWithCats, goodWithKids, specialNeeds, bio} = req.body
            await Pets.create({name, imgURL, type, breed, gender, age, size, color, houseTrained, goodWithDogs, goodWithCats, goodWithKids, specialNeeds, bio})
            res.sendStatus(200)
        } catch (theseHands) {
            console.log('Error in addPet')
            console.log(theseHands)
            res.sendStatus(400)
        }
    },

    getAllPets: async (req, res) => {
        try {
          const pets = await Pets.findAll();
          res.status(200).send(pets);
        } catch (error) {
          console.error('Error in getAllPets');
          console.error(error);
          res.sendStatus(500);
        }
      },

      deletePet: async (req, res) => {
        const { id } = req.params;
    
        try {
          const pet = await Pets.findByPk(id);
    
          if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
          }
    
          await pet.destroy();
    
          return res.status(204).end();
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      },

      getPetById: async (req, res) => {
        try {
          const { id } = req.params;
          const pet = await Pets.findByPk(id);
      
          if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
          }
      
          res.status(200).json(pet);
        } catch (error) {
          console.error('Error in getPetById');
          console.error(error);
          res.sendStatus(500);
        }
      }
    
}