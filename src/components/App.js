import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setСurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .getUserDetails(currentUser)
      .then((data) => {
        setСurrentUser(data);
      })
      .catch((err) => {
        alert(err);
      });
    api
      .getInitialCards(cards)
      .then((card) => {
        setCards(card);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  function handleCardDelete(card) {
    const isOwner = cards.filter((card) => card._id === currentUser._id)
    api.deleteCard(card._id, isOwner)
      .then()
      .catch((err) => {
        alert(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main
          cards={cards}
          setCards={setCards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onOpenImagePopup={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="url"
            name="avatar"
            className="form__input form__input_el_avatar"
            placeholder="Ссылка на картинку"
            required
            id="avatar-input"
          />
          <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="edit-profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            name="user"
            placeholder="Имя"
            className="form__input form__input_el_name"
            minLength="2"
            maxLength="40"
            required
            id="name-input"
            autoFocus
          />
          <span className="form__input-error name-input-error"></span>
          <input
            type="text"
            name="job"
            placeholder="Вид деятельности"
            className="form__input form__input_el_job"
            minLength="2"
            maxLength="200"
            required
            id="job-input"
          />
          <span className="form__input-error job-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="add-place"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
          />
          <span className="form__input-error place-input-error"></span>
          <input
            type="url"
            name="link"
            className="form__input form__input_el_link"
            placeholder="Ссылка на картинку"
            required
            id="link-input"
          />
          <span className="form__input-error link-input-error"></span>
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
