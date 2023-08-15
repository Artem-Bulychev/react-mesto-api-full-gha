import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";



export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__photo">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фотография профиля"
            />
            <button
              className="profile__photo-btn"
              type="button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__text">
            <div className="profile__text-main">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__rectangle"
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
        {props.cards.map(card => (<Card key={card._id} card={card} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike}/>))}
        </ul>
      </section>
    </main>
  );
}
