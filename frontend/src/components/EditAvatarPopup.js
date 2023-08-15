
import React from "react";
import PopupWithForm from "./PopupWithForm";



function EditAvatarPopup(props) {
  const iconRef = React.useRef();


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({avatar: iconRef.current.value});
  }

  React.useEffect(() => {
    iconRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnText={props.isLoading? 'Сохранение...' : 'Сохранить'}
    >
      <div className="popup__field">
        <input
          ref={iconRef}
          id="avatar-link-input"
          type="url"
          name="avatar"
          placeholder="Введите URL"
          className="popup__item popup__item_type_avatar"
          required=""
        />
        <span className="avatar-link-input-error popup__item-error">
          Необходимо ввести ссылку на фото
        </span>
      </div>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
