import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext)

  const isLiked = card.likes.some((i) => i === currentUser._id)

  const elementLikeButton = `elements__like ${
    isLiked && "elements__like_active"
  }`

  const isOwn = (card.owner._id || card.owner) === currentUser._id

  const handleCardClick = () => {
    onCardClick({
      isOpen: true,
      item: card,
    })
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  const handleLikeClick = () => {
    onCardLike(card)
  }

  return (
    <li className="elements__item">
      {isOwn && (
        <button
          className="elements__delete"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="elements__photo"
        onClick={handleCardClick}
        src={card.link}
        alt={card.name}
      />
      <div className="elements__text">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__card">
          <button
            className={elementLikeButton}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <h3 className="elements__like-quantity">{card.likes.length}</h3>
        </div>
      </div>
    </li>
  )
}
export default Card
