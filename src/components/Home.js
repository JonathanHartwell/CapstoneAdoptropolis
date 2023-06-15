// import { useState, useEffect, useContext } from "react";
// import axios from 'axios'
// import PetCard from "./PetCard";

// const Home = () => {

//     const [pets, setPets] = useState([]);

//     useEffect(() => {
//       axios.get('/pets')
//         .then(res => {
//           if (res.data) {
//             setPets(res.data);
//           } else {
//             console.log('Empty response received.');
//           }
//         })
//         .catch(error => {
//           console.log('Error retrieving pets:', error);
//         });
//     }, []);
// return (
    
// <p>home</p>

// )
// }

// export default Home

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PetCard from "./PetCard";
import AuthContext from "../store/authContext"


const Home = () => {
  const [pets, setPets] = useState([]);
  const authCtx =  useContext(AuthContext)
  const isLoggedIn = !!authCtx.token

  useEffect(() => {
    axios
      .get("/pets")
      .then((response) => {
        setPets(response.data);
      })
      .catch((theseHands) => {
        console.error("Error retrieving pets:", theseHands);
      });
  }, [isLoggedIn]);
  

  return (
    <div>
      <div className="pet-card-container">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default Home;