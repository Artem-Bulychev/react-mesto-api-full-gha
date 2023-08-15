import React from "react";

function ImagePopup ({card, onClose}){
    return (
        <section className={`popup popup_type_image ${card.isOpen ? `popup_opened` : ""}`}>
          <div className="popup__image-container">
            <figure className="popup__image-element">
              <img className="popup__image-photo" type="url" src={card.item.link} alt={card.item.name}/>
              <figcaption className="popup__image-main" type="text">{card.item.name}</figcaption>
            </figure>
            <button className="popup__close" type="button" onClick={onClose}></button>
          </div>
        </section>
    )
}

export default ImagePopup;