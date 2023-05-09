import { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
    resetValues();
  }

  function resetValues() {
    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText={isLoading ? "Сохранение..." : "Coхранить"}
    >
      <input
        type="text"
        name="name"
        className="form__input form__input_el_place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        id="place-input"
        autoFocus
        value={name}
        onChange={handleNameChange}
      />
      <span className="form__input-error place-input-error"></span>
      <input
        type="url"
        name="link"
        className="form__input form__input_el_link"
        placeholder="Ссылка на картинку"
        required
        id="link-input"
        value={link}
        onChange={handleLinkChange}
      />
      <span className="form__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
