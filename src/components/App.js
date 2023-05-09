import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmCardDeletePopup from "./ConfirmCardDeletePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmCardDeletePopupOpen, setIsConfirmCardDeletePopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [renderLoading, setRenderLoading] = useState(false);

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

  function handleConfirmCardDelete(card) {
    setSelectedCard(card);
    setIsConfirmCardDeletePopupOpen(!isConfirmCardDeletePopupOpen);
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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmCardDeletePopupOpen(false);
  }

  function handleUpdateUser(data) {
    setRenderLoading(true);
    api
      .changeUserDetails(data)
      .then((info) => {
        setСurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setRenderLoading(true);
    api
      .changeUserAvatar(avatar)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleAddPlace(data) {
    setRenderLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleCardDelete(card) {
    setRenderLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => {
            return item._id !== card._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
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
          onCardDelete={handleConfirmCardDelete}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={renderLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={renderLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={renderLoading}
        />
        <ConfirmCardDeletePopup
          isOpen={isConfirmCardDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={selectedCard}
          isLoading={renderLoading}
        />

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
