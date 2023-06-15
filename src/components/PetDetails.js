import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./petdetails.module.css";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios
      .get(`/pets/${id}`)
      .then((res) => {
        setPet(res.data);
      })
      .catch((error) => {
        console.error("Error retrieving pet details:", error);
      });
  }, [id]);

  if (!pet) {
    return <p>Loading...</p>;
  }

  const bools = [
    { label: "House Trained", value: pet.houseTrained },
    { label: "Good with Dogs", value: pet.goodWithDogs },
    { label: "Good with Cats", value: pet.goodWithCats },
    { label: "Good with Kids", value: pet.goodWithKids },
    { label: "Special Needs", value: pet.specialNeeds },
  ];

  const trueBools = bools.filter((bool) => bool.value);
  const boolStatements = trueBools.map((bool) => bool.label);

  const adoptLink = (
    <h3>
      <a href={pet.bio} target="_blank" rel="noopener noreferrer">
        Adopt {pet.name} here!
      </a>
    </h3>
  );

  return (
    <section className={styles.details}>

    <div className={styles.petdetailsbox}>
      <img src={pet.imgURL} className={styles.detailsPetImg} />
      <ul className={styles.detailstory}>
        <li>
          {pet.name} is a {pet.age} {pet.gender} {pet.breed} {pet.type}
        </li>
        <li>
          who is a {pet.size} {pet.color} {pet.gender}.
        </li>
        <li>
          They are{" "}
          {boolStatements.length === 1 ? (
              boolStatements[0]
              ) : (
                  <>
              {boolStatements.slice(0, -1).join(", ")} and{" "}
              {boolStatements[boolStatements.length - 1]}
            </>
          )}
          .
        </li>
      <h3 className={styles.detailPetAdopt}>{adoptLink} </h3>
      </ul>
    </div>
          </section>
  );
};

export default PetDetails;
