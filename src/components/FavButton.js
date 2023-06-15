import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const FavButton = ({ id }) => {
  const [isActive, setIsActive] = useState(false);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = !!authCtx.token;

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        if (!isLoggedIn) {
          setIsActive(false); // Clear active state when logged out
          return;
        }

        const token = localStorage.getItem("token");
        const response = await axios.get("/user/favoritePets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favoritePets = response.data.favoritePets.map((pet) => pet.id);
        setIsActive(favoritePets.includes(id));
      } catch (error) {
        console.error("Error retrieving user favorites", error);
      }
    };

    fetchUserFavorites();
  }, [id, isLoggedIn]); // Trigger the effect when id or isLoggedIn changes

  const handleButtonClick = () => {
    const token = localStorage.getItem("token");
    const toggleFavorite = !isActive;

    axios
      .put(
        "/user/favoritePets",
        { petId: id, toggleFavorite },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("Pet favorites updated", res.data);
        setIsActive(toggleFavorite);
      })
      .catch((error) => {
        console.error("Error updating pet favorites", error);
      });
  };

  return (
    <div
      className={`fav-btn-wrapper ${isActive ? "is-active" : ""}`}
      onClick={handleButtonClick}
    >
      <div className="favorite-btn">
        <i className={`i material-icons not-liked ${isActive ? "bouncy" : ""}`}>
          favorite_border
        </i>
        <i className={`i material-icons is-liked ${isActive ? "bouncy" : ""}`}>
          favorite
        </i>
        <span className="like-overlay"></span>
      </div>
    </div>
  );
};

export default FavButton;
