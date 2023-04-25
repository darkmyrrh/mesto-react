function Card ({card, onCardClick}) {

  function handleClick () {
    onCardClick(card)
  }

  return (
    <article className="element">
       <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
       <h2 className="element__title">{card.name}</h2>
       <button type="button" aria-label="Нравится" className="element__like-button"></button>
       <p className="element__likes">{card.likes.length}</p>
       <button type="button" aria-label="Удалить" className="element__delete-button"></button>
    </article>
  )
}

export default Card;