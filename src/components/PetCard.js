import React from "react";
import { useNavigate } from "react-router-dom";
import FavButton from "./FavButton";

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pets/${pet.id}`);
  };

  return (
    <div className="pet-card">
      <div className="pet-img-box">
        <img src={pet.imgURL} alt={pet.name} className="pet-picture" onClick={handleClick} />
      </div>
      <FavButton id={pet.id} className="card-favbtn"/>
      <div className="card-overlay">
        <div className="card-header">
          <svg className="card-arc" xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>
          <div className="btn-name">
            <h3 className="card-title">{pet.name}</h3>
            <span className="card-age">{pet.type}</span>
          </div>
          <span className="card-description">
            <p>{pet.age}</p>
            <p>{pet.breed}</p>
            </span>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
