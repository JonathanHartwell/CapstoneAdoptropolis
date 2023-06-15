import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./addpet.module.css";

import AuthContext from "../store/authContext";

const AddPet = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [type, setType] = useState("Cat");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState("Baby");
  const [size, setSize] = useState("Small");
  const [color, setColor] = useState("");
  const [houseTrained, setHouseTrained] = useState(false);
  const [goodWithDogs, setGoodWithDogs] = useState(false);
  const [goodWithCats, setGoodWithCats] = useState(false);
  const [goodWithKids, setGoodWithKids] = useState(false);
  const [specialNeeds, setSpecialNeeds] = useState(false);
  const [bio, setBio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "/pets",
        {
          name,
          imgURL,
          type,
          breed,
          gender,
          age,
          size,
          color,
          houseTrained,
          goodWithDogs,
          goodWithCats,
          goodWithKids,
          specialNeeds,
          bio,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((theseHands) => console.log(theseHands));
  };

  return (
    <main className={styles.formBox}>
      <form className={styles.addPetForm} onSubmit={handleSubmit}>
        <div className={styles.formInputSection}>
          <div className={styles.addPetForm1}>
            <div className={styles.petInput1}>
              {/* petname */}
              <span className="inputSpan">
                <input
                  type="text"
                  placeholder="Pet Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="inputText"
                />
              </span>

              {/* img url */}
              <span className="inputSpan">
                <input
                  type="text"
                  placeholder="Picture URL"
                  value={imgURL}
                  onChange={(e) => setImgURL(e.target.value)}
                  className="inputText"
                />
              </span>

              {/* breed  */}
              <span className="inputSpan">
                <input
                  type="text"
                  placeholder="Breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="inputText"
                />
              </span>

              {/* color  */}
              <span className="inputSpan">
                <input
                  type="text"
                  placeholder="Color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="inputText"
                />
              </span>
            </div>

            <div className={styles.select1}>
              {/* type */}
              <div className={styles.selectOption}>
                <label className={styles.selectLabel}>Pet Type:</label>
                <div className={styles.selectBox}>
                  <select
                    className={styles.select}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Cat">Cat</option>
                    <option value="Dog">Dog</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* gender  */}
              <div className={styles.selectOption}>
                <label className={styles.selectLabel}>Gender:</label>
                <div className={styles.selectBox}>
                  <select
                    className={styles.select}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.select2}>
              {/* age */}
              <div className={styles.selectOption}>
                <label className={styles.selectLabel}>Age:</label>
                <div className={styles.selectBox}>
                  <select
                    className={styles.select}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  >
                    <option value="Baby">Baby</option>
                    <option value="Young">Young</option>
                    <option value="Adult">Adult</option>
                    <option value="Elder">Elder</option>
                  </select>
                </div>
              </div>

              {/* size  */}
              <div className={styles.selectOption}>
                <label className={styles.selectLabel}>Size:</label>
                <div className={styles.selectBox}>
                  <select
                    className={styles.select}
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Size
                    </option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.addPetForm2}>
            {/* bools  */}

            <label className="pet-select-label">Select All that Apply:</label>

              <label className={styles.optionbox}>
                House trained?
                <label id="house-trained" className={styles.checkContainer}>
                  <input
                    type="checkbox"
                    checked={houseTrained}
                    onChange={(e) => setHouseTrained(e.target.checked)}
                  />
                  <div className={styles.checkmark}></div>
                </label>
              </label>

            <label className={styles.optionbox}>
              Good with dogs?
              <label id="good-with-dogs" className={styles.checkContainer}>
                <input
                  type="checkbox"
                  checked={goodWithDogs}
                  onChange={(e) => setGoodWithDogs(e.target.checked)}
                />
                <div className={styles.checkmark}></div>
              </label>
            </label>

            <label className={styles.optionbox}>
              Good with cats?
              <label id="house-trained" className={styles.checkContainer}>
                <input
                  type="checkbox"
                  checked={goodWithCats}
                  onChange={(e) => setGoodWithCats(e.target.checked)}
                />
                <div className={styles.checkmark}></div>
              </label>
            </label>

            <label className={styles.optionbox}>
              Good with kids?
              <label id="house-trained" className={styles.checkContainer}>
                <input
                  type="checkbox"
                  checked={goodWithKids}
                  onChange={(e) => setGoodWithKids(e.target.checked)}
                />
                <div className={styles.checkmark}></div>
              </label>
            </label>

            <label className={styles.optionbox}>
              Special needs?
              <label id="special-needs" className={styles.checkContainer}>
                <input
                  type="checkbox"
                  checked={specialNeeds}
                  onChange={(e) => setSpecialNeeds(e.target.checked)}
                />
                <div className={styles.checkmark}></div>
              </label>
            </label>

            {/* bio  */}

            <label className={styles.bioLabel}>
              Adoption Link
              <span className="inputSpan">
                <input
                  type="text"
                  placeholder="Paste Link Here"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="inputText"
                />
              </span>
            </label>
          </div>
        </div>
        <button className={styles.formBtn}>Submit</button>
      </form>
    </main>
  );
};

export default AddPet;
