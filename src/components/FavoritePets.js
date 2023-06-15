import axios from "axios";
import PetCard from "./PetCard";
import React, { useState, useEffect } from 'react'

const FavoritePets = () => {
const [pets, setFavoritePets] = useState([])

useEffect(() => {
    const token = localStorage.getItem("token")
    axios
      .get("/user/favoritePets", {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        console.log(response.data.favoritePets)
        setFavoritePets(response.data.favoritePets);
      })
      .catch((theseHands) => {
        console.error("Error retrieving pets:", theseHands);
      });
  }, []);

return(
    <div className="pet-card-container">
        {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
        ))}
    </div>
)
}

export default FavoritePets