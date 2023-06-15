import { NavLink } from "react-router-dom";
import styles from './header.module.css'
import { useContext } from "react";

import AuthContext from "../store/authContext";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src='https://drive.google.com/uc?export=download&id=1-w-SHW1WKuFcVmMoaiWfpjFp9rJ65iTT' className={styles.logo} />
      <h1 className={styles.pageTitle}>Adoptropolis</h1>
    </header>
  );
};

export default Header;
