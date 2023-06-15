import { useContext } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Auth from './components/Auth';
import AddPet from './components/AddPet';
import FavoritePets from './components/FavoritePets';
import PetDetails from './components/PetDetails';
import Nav from './components/Nav';

import AuthContext from './store/authContext';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={!authCtx.token ? <Auth /> : <Navigate to="/" />} />
        <Route path="favorites" element={<FavoritePets />} />
        <Route path="pets/:id" element={<PetDetails />} />
        <Route path="addpet" element={<AddPet />} />
      </Routes>
    </div>
  );
}

export default App;
