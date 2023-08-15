import React from "react";
import PopupWithForm from "./PopupWithForm";



function AddPlacePopup(props) {
  const [elementName, setElementName] = React.useState("");
  const [elementLink, setElementLink] = React.useState("");


  React.useEffect(() => {
    if (props.isOpen) {
      setElementName("");
      setElementLink("");
    }
  }, [props.isOpen]);

  function handleElementName(e) {
    setElementName(e.target.value);
  }

  function handleElementLink(e) {
    setElementLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(
      {
        name: elementName,
        link: elementLink,
      });
  }

  return (
    <PopupWithForm
      name="name"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnText={props.isLoading? 'Сохранение...' : 'Создать'}
    >
      <div className="popup__field">
        <input
          id="card-name-input"
          onChange={handleElementName}
          value={elementName}
          type="text"
          name="name"
          placeholder="Название"
          className="popup__item popup__item_type_card"
          minLength="2"
          maxLength="30"
          required=""
        />
        <span className="card-name-input-error popup__item-error">
        Вы пропустили это поле
        </span>
      </div>
      <div className="popup__field">
        <input
          id="link-name-input"
          onChange={handleElementLink}
          value={elementLink}
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__item popup__item_type_link"
          required=""
        />
        <span className="link-name-input-error popup__item-error">
        Вы пропустили это поле
        </span>
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;