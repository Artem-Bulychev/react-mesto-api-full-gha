
// компонент модального окна,который информирует пользователя об успешной регистрации.
function InfoTooltip({isOpen, onClose, result}) {
  return (
    <section className={`popup popup_type_result ${isOpen ? `popup_opened` : ""}`}>
      <div className={`popup__form-container`}>
          <div className={`popup__result ${
          result ? "popup__result_type_true" : "popup__result_type_false"}`}></div>
          <p className="popup__result-text">
        {result
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте еще раз"}</p>
        <button className="popup__close" type="button" onClick={onClose}/>
      </div>
    </section>
  );
}

export default InfoTooltip;