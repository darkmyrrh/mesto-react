import { useRef } from "react";

import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText={isLoading ? "Сохранение..." : "Coхранить"}
    >
      <input
        ref={avatarRef}
        type="url"
        name="avatar"
        className="form__input form__input_el_avatar"
        placeholder="Ссылка на картинку"
        required
        id="avatar-input"
      />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
