import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";


function Main({onEditAvatar, onEditProfile, onAddPlace, onOpenImagePopup}) {

    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect (() => {
        api.getUserDetails(userName, userDescription, userAvatar)
        .then((data) => {
          setUserAvatar(data.avatar);
          setUserName(data.name);
          setUserDescription(data.about);
        })
    }, [])

    React.useEffect(() => {
        api.getInitialCards(cards)
            .then((card) => {
            setCards(card);
        })
    }, [])

    
    return (
        <main className="main">
            <section className="profile">
                <button type="button" aria-label="Изменить" className="profile__edit-button" onClick={onEditAvatar}>
                    <img src={`${userAvatar}`} alt="Фото пользователя" className="profile__avatar" />
                    <div className="profile__edit-image"></div>
                </button>
                <div className="profile-info">
                    <h1 className="profile-info__name">{`${userName}`}</h1>
                    <button type="button" aria-label="Редактировать" className="profile-info__edit-button root__button" onClick={onEditProfile}></button>
                    <p className="profile-info__description">{`${userDescription}`}</p>
                </div> 
                <button type="button" aria-label="Добавить" className="profile__add-button root__button" onClick={onAddPlace}></button>
            </section>
            <section className="photo-grid">
                <ul className="elements">
                {cards.map((card) => (<div key={card._id}>
                    <Card 
                    card={card}
                    onCardClick={onOpenImagePopup}
                    />
                    </div>)
                    )
                }
                </ul>
            </section>
        </main>
    )
}

export default Main;