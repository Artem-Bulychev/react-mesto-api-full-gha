import React from "react";
import logoType from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";


export default function Header({userData, signOut}) {
  return (
    <header className="header">
      <img className="header__logo" src={logoType}  alt="Логотип места"/>
      <Routes>
        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__link">
              Вход
            </Link>
          }/>
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          }/>
        <Route
          path="/cards"
          element={
            <div className="header__nav">
              <p className="header__email">{userData}</p>
              <Link to="/signin" className="header__link" onClick={signOut}>
                Выйти
              </Link>
            </div>
          }/>
      </Routes>
    </header>
  );
}