require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { SERVER_PORT } = process.env;
const { sequelize } = require('./util/database');
const { register, login, addToFavorites, getFavoritePets } = require('./controllers/auth');
const { addPet, getAllPets, getPetById, deletePet } = require('./controllers/pets');
const { isAuthenticated } = require('./middleware/isAuthenticated');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', register);
app.post('/login', login);

app.put('/user/favoritePets', isAuthenticated, addToFavorites);
app.get('/user/favoritePets', isAuthenticated, getFavoritePets);

app.post('/pets', addPet);
app.get('/pets', getAllPets);
app.get('/pets/:id', getPetById)
app.delete('/pets/:id', deletePet)

// sequelize.sync({ force: true})
sequelize.sync()
  .then(() => {
    app.listen(SERVER_PORT, () => console.log(`Server up and running on port ${SERVER_PORT}`));
  })
  .catch(theseHands => console.log(theseHands));
