import React, { useState } from "react";
import { Link } from "react-router-dom";


function Register({changeRegister}){
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange =(e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
}

const handleSubmit = (e) => {
  e.preventDefault();
  changeRegister(formValue.email, formValue.password)
};

return (
  <div className="login">
    <p className="login__welcome">
      Регистрация 
    </p>
    <form onSubmit={handleSubmit} className="login__form">
      <div className="login__input">
      <input className="login__auth" required id="email" name="email" type="email" value={formValue.email || ""} onChange={handleChange} minLength="2" maxLength="30" placeholder="email"/>
      <input className="login__auth" required id="password" name="password" type="password" value={formValue.password || ""} onChange={handleChange} minLength="2" maxLength="30" placeholder="password"/>
      </div>
        <button type="submit" className="login__save">Войти</button>
    </form>
    <div className="login__signup">
      <p className="login__signup-text">Уже зарегистрированы?</p>
      <Link to="/signin" className="login__signup-link">Войти</Link>
    </div>
  </div>
);
}

export default Register; 