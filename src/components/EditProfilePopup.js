import { useState, useEffect, useContext } from "react";

import PopupWithForm from "./PopupWithForm.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText={isLoading ? "Сохранение..." : "Coхранить"}
    >
      <input
        type="text"
        name="name"
        placeholder="Имя"
        className="form__input form__input_el_name"
        minLength="2"
        maxLength="40"
        required
        id="name-input"
        onChange={handleNameChange}
        value={name || ""}
        autoFocus
      />
      <span className="form__input-error name-input-error"></span>
      <input
        type="text"
        name="about"
        placeholder="Вид деятельности"
        className="form__input form__input_el_job"
        minLength="2"
        maxLength="200"
        required
        id="job-input"
        onChange={handleDescriptionChange}
        value={description || ""}
      />
      <span className="form__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
