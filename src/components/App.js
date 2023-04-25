import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    function handleEditProfileClick () {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    function handleAddPlaceClick () {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }
    function handleCardClick (card) {
        setSelectedCard(card);
        setIsImagePopupOpen(!isImagePopupOpen)
    }
    function closeAllPopups () {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
    }


  return (
    <div className="App">
        <Header />
        <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onOpenImagePopup={handleCardClick}
        />
        <PopupWithForm 
            name="change-avatar"
            title="Обновить аватар"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups} >
            <input type="url" name="avatar" className="form__input form__input_el_avatar" placeholder="Ссылка на картинку" required id="avatar-input" />
            <span className="form__input-error avatar-input-error"></span>
            <button type="submit" className="form__submit">Сохранить</button>
        </PopupWithForm>
        <PopupWithForm 
            name="edit-profile"
            title="Редактировать профиль"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups} >
            <input type="text" name="user" placeholder="Имя" className="form__input form__input_el_name" minLength="2" maxLength="40" required id="name-input" autoFocus />
            <span className="form__input-error name-input-error"></span>
            <input type="text" name="job" placeholder="Вид деятельности" className="form__input form__input_el_job" minLength="2" maxLength="200" required id="job-input" />
            <span className="form__input-error job-input-error"></span>
            <button type="submit" className="form__submit">Сохранить</button>
        </PopupWithForm>
        <PopupWithForm 
            name="add-place"
            title="Новое место"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups} >
            <input type="text" name="name" className="form__input form__input_el_place" placeholder="Название" minLength="2" maxLength="30" required id="place-input" autoFocus />
            <span className="form__input-error place-input-error"></span>
            <input type="url" name="link" className="form__input form__input_el_link" placeholder="Ссылка на картинку" required id="link-input" />
            <span className="form__input-error link-input-error"></span>
            <button type="submit" className="form__submit">Сохранить</button>
        </PopupWithForm>
        <ImagePopup 
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
        />
        <Footer />
    </div>
  );
}

export default App;
