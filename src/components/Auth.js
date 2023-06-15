import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import styles from "./auth.module.css";

const Auth = () => {
  const [register, setRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("none");

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    setDisplay("none");

    const body = {
      username,
      password,
    };

    axios
      .post(register ? `/register` : `/login`, body)
      .then((res) => {
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
        console.log("AFTER AUTH", res.data);
      })
      .catch((theseHands) => {
        setMessage(theseHands.response.data);
        setDisplay("block");
        setPassword("");
        setUsername("");
      });
  };

  console.log("submitHandler called");

  return (
    <main className={styles.authpg}>

      <section className={styles.authcontainer}>

      <form className={styles.authform} onSubmit={submitHandler}>
        <div className={styles.authinputs}>
          <span className="inputSpan">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="inputText"
              />
          </span>
          <span className="inputSpan">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputText"
              />
          </span>
        </div>
        <button className={styles.authbtn}>
          {register ? "Register" : "Login"}
        </button>
      </form>
      <p style={{ display: display }} className="auth-msg">
        {message}
      </p>
      <button
        className={styles.authbtn}
        onClick={() => setRegister(!register)}
        >
        Need to {register ? "Login" : "Sign Up"}?
      </button>
        </section>
    </main>
  );
};

export default Auth;
