import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser,props.isOpen]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({ name, about: description, });
  }

  return (
    <PopupWithForm
      name="name"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnText={props.isLoading? 'Сохранение...' : 'Сохранить'}
    >
      <div className="popup__field">
        <input
          id="profile-name-input"
          type="text"
          value={name || ''}
          onChange={handleName}
          name="name"
          placeholder="Имя"
          className="popup__item popup__item_type_profile"
          minLength="2"
          maxLength="40"
          required=""
        />
        <span className="profile-name-input-error popup__item-error">
        Вы пропустили это поле
        </span>
      </div>
      <div className="popup__field">
        <input
          id="job-name-input"
          type="text"
          value={description || ''}
          onChange={handleDescription}
          name="about"
          placeholder="Вид деятельности"
          className="popup__item popup__item_type_job"
          minLength="2"
          maxLength="200"
          required=""
        />
        <span className="job-name-input-error popup__item-error">
            Вы пропустили это поле
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;