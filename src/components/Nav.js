import React, { useContext } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import styles from './nav.module.css';
import AuthContext from '../store/authContext';

const Nav = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = !!authCtx.token;

  const logoutHandler = () => {
    authCtx.logout();
    return <Navigate to='/auth' replace={true} />
  };

  return (
    <nav className={styles.navbar}>
      {isLoggedIn ? (
        <NavLink className={styles.navlink} to="/" onClick={logoutHandler}>
          Logout
        </NavLink>
      ) : (
        <NavLink className={styles.navlink} to="/auth">
          Login
        </NavLink>
      )}
      <NavLink className={styles.navlink} to="/">
        Home
      </NavLink>
      <NavLink className={styles.navlink} to="/favorites">
        Favorites
      </NavLink>
      <NavLink className={styles.navlink} to="/addpet">
        Add Pet
      </NavLink>
    </nav>
  );
};

export default Nav;
